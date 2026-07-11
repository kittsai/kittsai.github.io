# UI Redesign Design Spec

## Overview

Redesign the Kit Docs UI to adopt a cleaner, more modern aesthetic inspired by the Bonjourr documentation site. The project will continue using Astro Starlight with custom CSS variables and configuration to achieve the new visual style.

## Goals

1. Implement dual theme support (light/dark) with light mode as default
2. Create a minimalist Hero section for the homepage
3. Optimize sidebar styling with better typography and spacing
4. Improve content area typography for better readability
5. Maintain full compatibility with Starlight updates

## Approach

Starlight theme variable override approach:
- Use CSS custom properties to override Starlight's default theme
- Modify `astro.config.mjs` for theme configuration
- Create custom CSS file for visual overrides
- Update `index.mdx` for new homepage layout

## Design Sections

### 1. Color Scheme & Typography

**Light Theme (Default)**:
- Background: `#ffffff` (pure white) / `#f8fafc` (light gray cards)
- Text: `#0f172a` (dark gray-black) / `#64748b` (secondary text)
- Accent: `#3b82f6` (blue) for links and buttons
- Border: `#e2e8f0` (light gray)

**Dark Theme**:
- Background: `#0f172a` (deep blue-black) / `#1e293b` (card background)
- Text: `#f8fafc` (near-white) / `#94a3b8` (secondary text)
- Accent: `#60a5fa` (bright blue)
- Border: `#334155`

**Typography**:
- Body: `Inter` or system font stack
- Code: `JetBrains Mono` / `Fira Code`

### 2. Sidebar Styling

**Structure**:
- Width: 240px (reduced from default 250px)
- Group titles: `text-transform: uppercase` + `letter-spacing` for hierarchy
- Indentation: 16px for secondary menus

**Interactions**:
- Hover state: background `#f1f5f9` (light) / `#1e293b` (dark)
- Current page: 2px blue left border + background highlight
- Collapse animation: `max-height` + `transition` for smooth expand

**Typography**:
- Group titles: `12px`, `font-weight: 600`, `color: #64748b`
- Menu items: `14px`, `font-weight: 400`
- Active item: `font-weight: 500`, `color: #3b82f6`

### 3. Content Area Typography

**Width**:
- Max width: `800px`
- Padding: `48px` (desktop) / `24px` (mobile)

**Headings**:
- H1: `32px`, `font-weight: 700`, `border-bottom: 1px solid #e2e8f0`
- H2: `24px`, `font-weight: 600`, `margin-top: 48px`
- H3: `20px`, `font-weight: 600`, `margin-top: 32px`

**Body**:
- Line height: `1.75`
- Paragraph spacing: `24px`
- Code blocks: `border-radius: 8px`, background `#f1f5f9` (light) / `#1e293b` (dark)

**Other Elements**:
- Blockquotes: 3px blue left border, background `#eff6ff`
- Tables: striped background, hover row highlight
- Images: `border-radius: 8px`, optional shadow

### 4. Homepage & Components

**Minimalist Hero**:
- Layout: centered alignment, generous whitespace
- Title: `48px`, `font-weight: 700`
- Description: `18px`, `color: #64748b`, `max-width: 600px`
- CTA buttons: primary (blue fill) + secondary (border style)
- Remove current CardGrid, use simple text navigation

**Card Styles** (for knowledge category navigation):
- Border-radius: `12px`
- Border: `1px solid #e2e8f0`
- Hover: slight lift + deeper shadow
- Padding: `24px`

**Badges & Tags**:
- Border-radius: `9999px` (full round)
- Font: `12px`, `font-weight: 500`
- Colors: blue series as primary

## File Changes

1. `astro.config.mjs` - Add custom CSS reference, theme configuration
2. `src/styles/custom.css` - New file with CSS variable overrides
3. `src/content/docs/index.mdx` - Rewrite homepage with minimalist Hero

## Testing

1. Verify light/dark theme toggle works correctly
2. Check all pages render with new styles
3. Test mobile responsiveness
4. Verify sidebar navigation works as expected
5. Check homepage layout on different screen sizes

## Success Criteria

- [ ] Dual theme support with light mode default
- [ ] Minimalist Hero on homepage
- [ ] Optimized sidebar with better typography
- [ ] Improved content area readability
- [ ] Full Starlight compatibility maintained
