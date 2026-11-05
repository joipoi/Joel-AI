// Local preview: "npm run dev" builds the site, serves it on localhost and
// rebuilds whenever a post, template, asset or the build script changes.
// Refresh the browser to see the result.
const fs = require("node:fs");
const http = require("node:http");
const path = require("node:path");
const { spawn } = require("node:child_process");

const ROOT = path.join(__dirname, "..");
const OUTPUT_DIR = path.join(ROOT, "dist");
const WATCHED = ["posts", "templates", "assets", "src"];
const PORT = Number(process.env.PORT) || 3000;

const CONTENT_TYPES = {
    ".html": "text/html; charset=utf-8",
    ".css": "text/css; charset=utf-8",
    ".js": "text/javascript; charset=utf-8",
    ".xml": "application/xml; charset=utf-8",
    ".png": "image/png",
    ".jpg": "image/jpeg",
    ".jpeg": "image/jpeg",
    ".gif": "image/gif",
    ".svg": "image/svg+xml",
    ".webp": "image/webp",
    ".ico": "image/x-icon"
};

let building = false;
let buildAgain = false;

// The build runs as its own process, so a broken post only prints an error
// instead of stopping the preview, and changes to build.js are picked up.
function build() {
    if (building) {
        buildAgain = true;
        return;
    }

    building = true;

    const child = spawn(process.execPath, [path.join(__dirname, "build.js")], {
        stdio: "inherit"
    });

    child.on("close", () => {
        building = false;

        if (buildAgain) {
            buildAgain = false;
            build();
        }
    });
}

function watch() {
    let timer;

    for (const dir of WATCHED) {
        fs.watch(path.join(ROOT, dir), { recursive: true }, () => {
            // Editors often fire several events per save, so wait for a pause.
            clearTimeout(timer);
            timer = setTimeout(build, 100);
        });
    }
}

function send(response, status, body, headers = {}) {
    response.writeHead(status, { "Content-Type": "text/plain; charset=utf-8", ...headers });
    response.end(body);
}

function handleRequest(request, response) {
    let pathname;

    try {
        pathname = decodeURIComponent(new URL(request.url, "http://localhost").pathname);
    } catch {
        return send(response, 400, "Bad request");
    }

    let filePath = path.join(OUTPUT_DIR, pathname);

    if (filePath !== OUTPUT_DIR && !filePath.startsWith(OUTPUT_DIR + path.sep)) {
        return send(response, 403, "Forbidden");
    }

    if (fs.statSync(filePath, { throwIfNoEntry: false })?.isDirectory()) {
        // Relative links only work if folders end in a slash, same as GitHub Pages.
        if (!pathname.endsWith("/")) {
            return send(response, 301, "", { Location: `${pathname}/` });
        }

        filePath = path.join(filePath, "index.html");
    }

    fs.readFile(filePath, (error, data) => {
        if (error) {
            return send(response, 404, "Not found");
        }

        const type = CONTENT_TYPES[path.extname(filePath).toLowerCase()];
        send(response, 200, data, {
            "Content-Type": type || "application/octet-stream",
            "Cache-Control": "no-store"
        });
    });
}

build();
watch();

http.createServer(handleRequest).listen(PORT, "127.0.0.1", () => {
    console.log(`Preview running at http://localhost:${PORT}/ (Ctrl+C to stop)`);
});
