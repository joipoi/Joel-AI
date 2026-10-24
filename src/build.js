
const fs = require("node:fs/promises");
const path = require("node:path");
const matter = require("gray-matter");
const { marked } = require("marked");

const POSTS_DIR = path.join(__dirname, "../posts");
const TEMPLATES_DIR = path.join(__dirname, "../templates");
const OUTPUT_DIR = path.join(__dirname, "../dist");

// Public address of the site, used for link previews when sharing.
const SITE_URL = "https://joipoi.github.io/Joel-AI/";
const SITE_NAME = "Joels AI-blogg";
const SITE_DESCRIPTION = "Försöker förklara AI och varför jag bryr mig";

// Max length of the preview text shown when a link is shared.
const DESCRIPTION_LENGTH = 160;

const dateFormatter = new Intl.DateTimeFormat("sv-SE", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC"
});

async function readTemplate(filename) {
    return fs.readFile(
        path.join(TEMPLATES_DIR, filename),
        "utf8"
    );
}

async function build() {
    const postTemplate = await readTemplate("post.html");
    const indexTemplate = await readTemplate("index.html");

    const files = (await fs.readdir(POSTS_DIR))
        .filter(file => file.endsWith(".md"))
        .sort();

    const posts = [];

    for (const file of files) {
        const filePath = path.join(POSTS_DIR, file);
        const source = await fs.readFile(filePath, "utf8");

        // Separate frontmatter from the Markdown body.
        const { data, content } = matter(source);

        if (!data.title || !data.date) {
            throw new Error(
                `${file} must have a title and date in frontmatter`
            );
        }

        const date = new Date(data.date);

        if (Number.isNaN(date.getTime())) {
            throw new Error(`${file} has an invalid date`);
        }

        // Use the frontmatter slug if given, otherwise make one from the filename.
        const slug = slugify(data.slug || path.basename(file, ".md"));

        if (!slug) {
            throw new Error(`${file} produced an empty URL slug`);
        }

        if (posts.some(post => post.slug === slug)) {
            throw new Error(`${file} has the same URL slug as another post: ${slug}`);
        }

        posts.push({
            title: data.title,
            date: date.toISOString().slice(0, 10),
            displayDate: dateFormatter.format(date),
            slug,
            about: data.about === true,
            description: data.description
                ? String(data.description)
                : firstParagraphText(content),
            content: marked.parse(content)
        });
    }

    // Sort newest first.
    posts.sort((a, b) => b.date.localeCompare(a.date));

    // The post marked "about: true" is pinned to the top and linked in the header.
    const aboutPosts = posts.filter(post => post.about);

    if (aboutPosts.length > 1) {
        throw new Error("Only one post can have about: true in frontmatter");
    }

    const aboutPost = aboutPosts[0];

    // Recreate the generated output directory.
    await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Generate an individual HTML page for every post.
    for (const post of posts) {
        const html = postTemplate
            .replaceAll("{{title}}", escapeHtml(post.title))
            .replaceAll("{{siteName}}", escapeHtml(SITE_NAME))
            .replaceAll("{{description}}", escapeHtml(post.description))
            .replaceAll("{{url}}", escapeHtml(postUrl(post)))
            .replaceAll("{{date}}", escapeHtml(post.date))
            .replaceAll("{{displayDate}}", escapeHtml(post.displayDate))
            .replaceAll("{{aboutLink}}", aboutLinkHtml(aboutPost, "../../"))
            .replace("{{content}}", post.content);

        const postOutputDir = path.join(
            OUTPUT_DIR,
            "posts",
            post.slug
        );

        await fs.mkdir(postOutputDir, { recursive: true });

        await fs.writeFile(
            path.join(postOutputDir, "index.html"),
            html,
            "utf8"
        );
    }

    // Generate the homepage listing.
    const postListHtml = posts
        .filter(post => !post.about)
        .map(post => `
        <article class="post">
            <h3>
                <a href="posts/${post.slug}/">
                    ${escapeHtml(post.title)}
                </a>
            </h3>
            <p class="date"><time datetime="${post.date}">${escapeHtml(post.displayDate)}</time></p>
            <p class="description">${escapeHtml(post.description)}</p>
        </article>
    `).join("\n");

    const pinnedHtml = aboutPost ? `
        <section class="pinned">
            <p class="pinned-label">Ny här? Börja här</p>
            <h3>
                <a href="posts/${aboutPost.slug}/">${escapeHtml(aboutPost.title)}</a>
            </h3>
            <p class="description">${escapeHtml(aboutPost.description)}</p>
        </section>
    ` : "";

    const indexHtml = indexTemplate
        .replaceAll("{{siteName}}", escapeHtml(SITE_NAME))
        .replaceAll("{{description}}", escapeHtml(SITE_DESCRIPTION))
        .replaceAll("{{url}}", escapeHtml(SITE_URL))
        .replaceAll("{{aboutLink}}", aboutLinkHtml(aboutPost, ""))
        .replace("{{pinned}}", pinnedHtml)
        .replace("{{posts}}", postListHtml || "<p>Inga inlägg än.</p>");

    await fs.writeFile(
        path.join(OUTPUT_DIR, "index.html"),
        indexHtml,
        "utf8"
    );

    console.log(`Built ${posts.length} posts successfully.`);
}

// Turn a filename like "AI_företag" into a clean URL part like "ai-foretag".
function slugify(value) {
    return String(value)
        .toLowerCase()
        .replace(/[åä]/g, "a")
        .replace(/ö/g, "o")
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");
}

function postUrl(post) {
    return `${SITE_URL}posts/${post.slug}/`;
}

function aboutLinkHtml(aboutPost, rootPath) {
    if (!aboutPost) {
        return "";
    }

    return `<a href="${rootPath}posts/${aboutPost.slug}/">Om bloggen</a>`;
}

// Use the first paragraph of the post as preview text, shortened if needed.
function firstParagraphText(markdown) {
    const paragraph = marked.lexer(markdown)
        .find(token => token.type === "paragraph");

    if (!paragraph) {
        return SITE_DESCRIPTION;
    }

    const text = unescapeHtml(
        marked.parser([paragraph]).replace(/<[^>]*>/g, "")
    ).replace(/\s+/g, " ").trim();

    if (text.length <= DESCRIPTION_LENGTH) {
        return text;
    }

    const cut = text.slice(0, DESCRIPTION_LENGTH);
    return cut.slice(0, cut.lastIndexOf(" ")) + "…";
}

function escapeHtml(value) {
    return String(value).replace(/[&<>"']/g, character => ({
        "&": "&amp;",
        "<": "&lt;",
        ">": "&gt;",
        '"': "&quot;",
        "'": "&#39;"
    })[character]);
}

function unescapeHtml(value) {
    return value
        .replace(/&lt;/g, "<")
        .replace(/&gt;/g, ">")
        .replace(/&quot;/g, '"')
        .replace(/&#39;/g, "'")
        .replace(/&amp;/g, "&");
}

build().catch(error => {
    console.error("Build failed:", error);
    process.exitCode = 1;
});
