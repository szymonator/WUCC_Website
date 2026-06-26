# PROJECT STATE & CONTEXT SUMMARY (CONDENSED SYSTEM PROMPT)

## 1. ENVIRONMENT & STACK CONSTRAINTS
- **Local Dev Server**: Nginx running inside Docker container on `http://localhost:8080` (volume-mounted to `/Users/szymonator1625/Programming/climbing_soc_old`).
- **Framework Rules**: 100% custom HTML5 / Vanilla CSS3 / Vanilla JS. No licenses/libraries allowed.
- **Brand Colors**:
  - Primary: Team Warwick Red (`#FF5A4B`)
  - Secondary: Warwick Black (`#000000`), Warwick White (`#FFFFFF`)
- **Contrast Guidelines**:
  - If background is Team Warwick Red (`#FF5A4B`), overlay text MUST be solid black (`#000000`).
  - Do NOT use red text on dark backgrounds for main body text. Keep navigation hover states and active buttons high contrast.

---

## 2. DOM STRUCTURES
### Global Header & Navigation
```
[header] .site-header
  └── [div] .header-container
        ├── [a] .header-logo -> [img] (Logo)
        ├── [button] .mobile-nav-toggle -> 3x .hamburger-bar
        └── [nav] .site-navigation#siteNavigation
              ├── [button] .mobile-nav-close (x)
              └── [ul] .nav-list
                    ├── [li] .nav-item -> [a] .nav-link
                    └── [li] .nav-item.has-dropdown
                          ├── [a] .nav-link.dropdown-toggle
                          └── [ul] .nav-dropdown -> [li] -> [a]
```

### Executive Committee Roster (`/about/exec/`)
```
[div] .exec-grid
  └── [div] .exec-card
        ├── [div] .exec-card-image -> [img] (Exec photo)
        └── [div] .exec-card-info
              ├── [h3] (Name)
              ├── [span] .exec-pronouns (e.g. He/Him)
              ├── [span] .exec-role (e.g. President)
              └── [p] (Course, Favourite climb, Memory, years climbing)
```

### Adventure Logs (`adventures/comps/` and `adventures/tripsandtours/`)
```
[div] .adventure-grid
  └── [div] .adventure-card
        ├── [div] .adventure-card-image -> [img] (Preview)
        └── [div] .adventure-card-info
              ├── [div] .adventure-meta -> .adventure-date + .adventure-author
              └── [h3] -> [a] (Article Link)
```

### Photo Galleries (subpage photo grids)
```
[div] .row.align-items-center
  └── [div] .col-12.col-sm-6.col-lg-3.single_gallery_item (filter tags as classes, e.g. "video", "human")
        └── [div] .gallery-card
              ├── [img] (Photo)
              └── [div] .gallery-overlay
                    └── [a] .gallery-zoom-btn (+)
```

### Global Footer
```
[footer] .site-footer
  └── [div] .container
        └── [div] .footer-container
              ├── [div] .footer-social -> [a] -> (Social Icon SVG)
              ├── [div] .footer-author -> [p] (Website by Vickie Snow)
              └── [div] .footer-copywrite -> [p] -> span#currentYear
```

---

## 3. COMPLETED TASKS
1. **Decoupled from ColorLib Template**: Replaced dynamic template assets with custom local CSS (`main_layout.css`, `navigation.css`, `hero.css`, `page_decorations.css`) and modular vanilla JS (`navigation.js`, `hero.js`, `lightbox.js`, `gallery_filter.js`).
2. **Subpage Header & Offset Fix**: Offset all subpage banners downwards (`margin-top: 80px`) so they align properly below the fixed black navigation header.
3. **Preloader Spinner Fix**: Resolved load race conditions by fading preloader immediately if `document.readyState === 'complete'`.
4. **Layout Updates**: Rebuilt Exec list and Adventure logs into 2-column uniform height cards (with text-clamp) collapsing to 1-column on mobile.
5. **Continuous Photo Galleries**: Styled `.gallery-grid` / `.gallery-card` to display as continuous patchwork mosaic grids with `2px` spacing, removing all legacy borders and shadows.
6. **Dark Box overrides**: Styled `.highlight-box-dark` and `.a-collapsible` accordion wrappers in `style.css` to use solid black backgrounds and Warwick Red text.
7. **Sticky Footer**: Pinned footer to bottom of viewport using viewport flexbox layout.
8. **Licence Scanning**: Coded `find_licensed_files.py` to identify all files containing third-party copyright/license information.

---

## 4. PENDING OBJECTIVES & COPYRIGHT PURGE MIGRATION
- **Goal**: Entirely purge all licensed / third-party files containing copyright/licensing notices.
- **Identified Files to Remove**:
  - `css/bootstrap.min.css` & `js/bootstrap.min.js` (Twitter MIT)
  - `css/font-awesome.min.css` & FontAwesome files in `fonts/` (FontAwesome SIL OFL/MIT)
  - `css/owl.carousel.min.css` & `js/owl.carousel.min.js` (MIT)
  - `js/alime.bundle.js` (Contains concatenated third-party files)
  - `js/jquery.min.js` (MIT)
  - `js/jquery.magnific-popup.min.js` (MIT)
  - `js/isotope.pkgd.min.js` (GPL/Proprietary)
  - All other vendor scripts in `js/` (popper, wow, waypoints, imagesloaded, scrollup, countdown, counterup).
  - The root `licence` file (referencing CC BY 3.0 template credit).
- **Migration & Rebuild Steps**:
  1. **Replace FontAwesome icons**: Remove imports and replace the active icon elements with inline/custom SVGs:
     - Socials: Facebook, Instagram, YouTube (in all footer instances).
     - Accordion: Plus (`+`) and Minus (`-`) icons on the `/newclimbers/index.html` page.
  2. **Grid / Spacing Mapping**: Implement a custom lightweight CSS grid (defining `.row`, `.col-12`, `.col-sm-*`, `.col-md-*`, `.col-lg-*`, flex alignment utilities, and bootstrap spacing helpers like `.mb-30`) inside `css/main_layout.css` to allow deleting `css/bootstrap.min.css` without breaking the grid architecture on subpages.
  3. **Purge Remote CDN Links**: Remove the cdnjs FontAwesome stylesheet link from `index.html`.
  4. **Delete Third-Party Files**: Clean up the workspace by running `git rm` or `rm` on the 20 identified legacy vendor files.
