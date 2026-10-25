# TODO

Ideas and improvements for the blog, roughly in order of importance.

## Big decision(User: For now we stick to github pages, maybe we switch some point in the future)
- [ ] **Substack vs GitHub Pages.** The most important feature for non-technical readers is probably email: they won't check the site, but they will read an email.
  - Substack: email, comments and discovery built in, no code. Less control, Substack branding, parts of the interface in English.
  - Middle ground: keep this site and add an RSS feed + a newsletter service like Buttondown (free for small lists) that emails new posts automatically.

## Website / code
- [ ] **Image for link previews** (`og:image`). Shared links already show title + text, but a picture makes them stand out much more. One default image for the whole blog is enough to start.
- [ ] **RSS feed** (`feed.xml`). Needed for the newsletter middle ground above.
- [ ] **Glossary page ("Ordlista")**. I the user will write this but the Claude can write the code for linking to it when I use a big word
- [ ] **Local preview.** An `npm run dev` command that rebuilds and serves the site locally, so you don't need to push to see changes.
- [ ] **Simple analytics** (e.g. GoatCounter, free and privacy-friendly) to see if anyone is reading.
- [ ] **Shared stylesheet.** The CSS is duplicated in both templates. Move it to `assets/style.css` and copy `assets/` in the build (it is currently empty and not copied).
- [ ] **Small cleanup:** `package.json` points to `src/index.js`, which doesn't exist.
- [ ] **CLAUDE.md:** add a short "how the site works" section (build, frontmatter fields, deploy on push).

## Frontmatter reference
Fields a post can have:

```
---
title: Required
date: 2026-10-24          # required
description: Optional. Text shown in link previews and on the front page. Defaults to the start of the first paragraph.
slug: optional-url-name   # optional. Defaults to the filename, e.g. AI_företag.md -> /posts/ai-foretag/
---
```
