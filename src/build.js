
const fs = require("node:fs/promises");
const path = require("node:path");
const matter = require("gray-matter");
const { marked } = require("marked");

const POSTS_DIR = path.join(__dirname, "../posts");
const TEMPLATES_DIR = path.join(__dirname, "../templates");
const OUTPUT_DIR = path.join(__dirname, "../dist");

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

        // Use the filename as the URL slug.
        const slug = path.basename(file, ".md");

        posts.push({
            title: data.title,
            date: date.toISOString().slice(0, 10),
            slug,
            content: marked.parse(content)
        });
    }

    // Sort newest first.
    posts.sort((a, b) => b.date.localeCompare(a.date));

    // Recreate the generated output directory.
    await fs.rm(OUTPUT_DIR, { recursive: true, force: true });
    await fs.mkdir(OUTPUT_DIR, { recursive: true });

    // Generate an individual HTML page for every post.
    for (const post of posts) {
        const html = postTemplate
            .replaceAll("{{title}}", escapeHtml(post.title))
            .replaceAll("{{date}}", escapeHtml(post.date))
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
    const postListHtml = posts.map(post => `
        <article class="post">
            <h3>
                <a href="posts/${encodeURIComponent(post.slug)}/">
                    ${escapeHtml(post.title)}
                </a>
            </h3>
            <p class="date">${escapeHtml(post.date)}</p>
        </article>
    `).join("\n");

    const indexHtml = indexTemplate.replace(
        "{{posts}}",
        postListHtml || "<p>No posts yet.</p>"
    );

    await fs.writeFile(
        path.join(OUTPUT_DIR, "index.html"),
        indexHtml,
        "utf8"
    );

    console.log(`Built ${posts.length} posts successfully.`);
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

build().catch(error => {
    console.error("Build failed:", error);
    process.exitCode = 1;
});
