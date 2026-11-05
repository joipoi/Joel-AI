Read the README for an intro to this project

You should never write or edit the actual blog posts in the /posts directory

You can help in three ways for this blog:

1.) Feedback, either on individual blogposts or the blog as a whole
2.) Reserach for future blogposts
3.) Adding code and functionality to the blog website

Focus mainly on what I ask each time, but feel free to give advice or opinions

Don't get bogged down in small details, I am not a professional, there will be lots of small mistakes like bad grammar, I am somewhat okay with this

I just started this blog so nothing is set in stone, things could change, let me know if something is a bad idea

I am happy with using english but my readers might not be, use Swedish if it is something the reader will see

Feel free to edit this Claude.md file however you want

# How the site works
- `npm run build` runs `src/build.js`, which turns `posts/*.md` into HTML in `dist/` using `templates/`, copies `assets/` and writes the RSS feed `feed.xml`. `dist/` is generated and not in git.
- `npm run dev` does the same, serves the site on http://localhost:3000/ and rebuilds on every change (`src/dev.js`).
- All CSS is in `assets/style.css`. Any other files in `assets/` also end up on the site.
- Every push to `main` builds and deploys to GitHub Pages (`.github/workflows/deploy.yml`), so pushing means publishing. The address is set in `SITE_URL` in `src/build.js`.
- Glossary links (`[[Term]]`) are explained in the README.

Frontmatter fields for a post:

```
---
title: Required
date: 2026-10-24          # required
description: Optional. Text shown in link previews, on the front page and in RSS. Defaults to the start of the first paragraph.
slug: optional-url-name   # optional. Defaults to the filename, e.g. AI_företag.md -> /posts/ai-foretag/
about: true               # optional. Pins the post to the top of the front page and leaves it out of the list and RSS. Only one post can have this.
---
```
