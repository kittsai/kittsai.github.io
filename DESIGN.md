---
version: beta
colors:
  source: PaperMod theme variables
typography:
  source: PaperMod system font stack
---

# Kittsai

## Direction

Kittsai is a Chinese personal knowledge and writing site built with Hugo and PaperMod. It follows PaperMod's official Home-Info mode and default visual system, with localized navigation and content.

## Layout

- Layout widths, spacing, cards and responsive behavior use PaperMod defaults.
- Navigation: 文章、归档、搜索、标签、笔记.
- Homepage: welcome copy, social links, then a single-column article stream.
- Article cards: title, summary, date, reading time and author.
- Notes: grouped by their real `category` metadata, filterable through horizontal category tabs; undated notes do not display fabricated dates.

## Ownership

PaperMod provides navigation, styling, listings, archive, taxonomies, RSS, table of contents and Fuse.js search. `assets/css/extended/site.css` only styles the custom grouped note index and compact home spacing. Project template overrides live in `layouts/`, while `themes/PaperMod/` stays identical to the upstream theme. Hugo content lives in `content/`; static images live in `static/`.

## Rules

- Keep light as the default and preserve PaperMod's theme switch.
- Preserve existing content URLs and Markdown image paths.
- Prefer PaperMod configuration over CSS overrides.
- Do not add decorative animation, promotional copy or fabricated metadata.
