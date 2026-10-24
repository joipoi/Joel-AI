# TODO

Ideas and improvements for the blog, roughly in order of importance.

## Big decision
- [ ] **Substack vs GitHub Pages.** The most important feature for non-technical readers is probably email: they won't check the site, but they will read an email.
  - Substack: email, comments and discovery built in, no code. Less control, Substack branding, parts of the interface in English.
  - Middle ground: keep this site and add an RSS feed + a newsletter service like Buttondown (free for small lists) that emails new posts automatically.
  - Decide before putting a lot more work into the site.

## Website / code
- [ ] **Image for link previews** (`og:image`). Shared links already show title + text, but a picture makes them stand out much more. One default image for the whole blog is enough to start.
- [ ] **RSS feed** (`feed.xml`). Needed for the newsletter middle ground above.
- [ ] **Glossary page ("Ordlista")**. Explain words like modell, AI-agent, datacenter once and link to it from posts.
- [ ] **Drafts.** Support `draft: true` in frontmatter so unfinished posts can be pushed without being published.
- [ ] **Local preview.** An `npm run dev` command that rebuilds and serves the site locally, so you don't need to push to see changes.
- [ ] **Simple analytics** (e.g. GoatCounter, free and privacy-friendly) to see if anyone is reading.
- [ ] **Shared stylesheet.** The CSS is duplicated in both templates. Move it to `assets/style.css` and copy `assets/` in the build (it is currently empty and not copied).
- [ ] **Small cleanup:** `package.json` points to `src/index.js`, which doesn't exist.
- [ ] **Git:** `.README.md` was renamed to `README.md`. Commit the rename.
- [ ] **CLAUDE.md:** add a short "how the site works" section (build, frontmatter fields, deploy on push).

Not recommended: GitHub-based comments (readers don't have GitHub accounts), frameworks or anything heavy.

## Content
- [ ] **"AI 2027, ett år senare: vad stämde?"** Go through their predictions and score them. Timely and original.
- [ ] **AI 2027 post:** add an ending with your own opinion. It currently stops at "AI tar över planeten".
- [ ] **Add sources** for big claims (Millennium problem, the 722 problems, the Datorspel post has no links).
- [ ] **Explain basic words** (modell, AI-agent...) or link to the glossary once it exists.
- [ ] **Factual typos:** "Dario Amodei och hans system" should be "syster". "10.00 AI agenter" is probably 10 000.
- [ ] **Mention the skeptics** now and then and say why you disagree. That makes you more convincing to people who doubt AI.
- [ ] **Post ideas:** "Hur jag använder AI i vardagen", "Vad betyder AI för mitt jobb?", Sverige och AI.

## Frontmatter reference
Fields a post can have:

```
---
title: Required
date: 2026-10-24          # required
description: Optional. Text shown in link previews and on the front page. Defaults to the start of the first paragraph.
slug: optional-url-name   # optional. Defaults to the filename, e.g. AI_företag.md -> /posts/ai-foretag/
about: true               # optional. Pins the post to the top of the front page and adds an "Om bloggen" link. Only one post.
---
```
