# PROJECT STATE & CONTEXT SUMMARY (CONDENSED SYSTEM PROMPT)

## 1. ENVIRONMENT & STACK CONSTRAINTS
- **Local Dev Server**: Nginx running inside a Docker container on `http://localhost:8080` (volume-mounted to `/Users/szymonator1625/Programming/climbing_soc_old`).
- **Framework & Libraries**: Rebuilt using standard HTML5, CSS3, and modern Vanilla JS where custom logic is needed. Standard open-source libraries (Bootstrap 4, jQuery, Popper, FontAwesome) are loaded dynamically, with source-code attribution and licenses documented in README.md.
- **Brand Colors**:
  - Primary: Team Warwick Red (`#FF5A4B`)
  - Secondary: Warwick Black (`#000000`), Warwick White (`#FFFFFF`)
- **Hover & Interaction Behaviors**:
  - Header navigation links are Warwick Red (`#FF5A4B`) by default, and scale smoothly on hover while turning White (`#FFFFFF`).
  - Dropdowns open via mouse hover on desktop (blocked click toggle for better desktop UX) and remain standard collapse elements on mobile.
  - FAQ collapsible triggers use Warwick Red (`#FF5A4B`) and match the text styling of the joining step blocks.

---

## 2. DOM STRUCTURES
### Global Header & Navigation (Bootstrap 4 Collapse & Dropdown)
```
[header] .site-header.navbar.navbar-expand-lg.navbar-dark.bg-black.sticky-top
  └── [div] .container
        ├── [a] .navbar-brand -> [img] (Header Logo)
        ├── [button] .navbar-toggler -> [span] .navbar-toggler-icon
        └── [div] .collapse.navbar-collapse#siteNavigation
              └── [ul] .navbar-nav.ml-auto
                    ├── [li] .nav-item -> [a] .nav-link
                    └── [li] .nav-item.dropdown
                          ├── [a] .nav-link.dropdown-toggle
                          └── [div] .dropdown-menu
                                └── [a] .dropdown-item
```

### Executive Committee Roster (`/about/exec/`)
```
[div] .exec-grid
  └── [div] .exec-card
        ├── [div] .exec-card-image -> [img] (Exec photo, aspect-ratio preserved, height auto)
        └── [div] .exec-card-info
              ├── [h3] (Name)
              ├── [span] .exec-pronouns (She/Her, He/Him)
              ├── [span] .exec-role (Role, Warwick Red tag)
              └── [p] (Course details, years climbing, and favorite memory)
```

### Photo Galleries (subpage photo grids)
```
[div] .row.align-items-center
  └── [div] .col-12.col-sm-6.col-lg-3.single_gallery_item (filter tags as classes, e.g. "video", "human")
        └── [div] .gallery-card
              ├── [img] (Photo, loading="lazy")
              └── [div] .gallery-overlay
                    └── [a] .gallery-zoom-btn (+)
```

### Global Footer (Bootstrap Grid Layout)
```
[footer] .site-footer.bg-black.py-4
  └── [div] .container
        └── [div] .row.align-items-center.text-center
              ├── [div] .col-md-4 -> [div] .footer-social -> [a] -> [i] (fa-facebook, etc.)
              ├── [div] .col-md-4 -> [p] (Website by Vickie Snow)
              └── [div] .col-md-4 -> [p] -> span#currentYear
```

---

## 3. COMPLETED TASKS
1. **Proprietary Footprint Purge**: Completely removed all Colorlib proprietary files (SCSS source files, classy-nav script and styles, legacy main.js / active.js).
2. **Library Attribution**: Created README.md attributing all open-source libraries (Bootstrap 4, jQuery, Popper, FontAwesome).
3. **HTML DOM Restructuring**: Migrated headers and footers across all 38+ HTML files to clean Bootstrap 4 structures.
4. **Desktop Navigation Hover Dropdowns**: Standardized navigation to open dropdowns on mouse hover for desktop sizes (with click toggles disabled on viewport width >= 992px) while preserving touch responsiveness on mobile.
5. **Page Banner Spacer**: Restored `.page-banner` top margin to `80px` (avoiding image obstructions) while adding a solid black absolute pseudo-element (`::before`) spacer to cover viewport edge gaps during high-velocity scrolling.
6. **FAQ Text Adjustments**: Restyled FAQ accordion triggers in newclimbers/index.html from `h5` to `<p>` tags, matching the size, font, and alignment of the steps sections.
7. **High-Performance Image Compression**: Recursively compressed **586 images** in the `img/` folder to a maximum dimension of 1600px and JPEG quality of 82. Saved **1.28 GB** of storage space, drastically reducing page weights (e.g. compressing 37MB phone camera files to ~200KB).
8. **Double-Loading Fix**: Eliminated duplicate stylesheet background images on `/about/abouttheclub/` image tags, resolving multiple 7MB redundant fetches.
9. **Native Lazy Loading**: Injected native `loading="lazy"` on all `<img>` tags except the header logo to defer loading off-screen gallery items.
10. **Directory Cleanup**: Deleted 20+ unused legacy assets, scripts, stylesheets, and fonts (Magnific Popup, Owl Carousel, Isotope, WOW, ElegantIcons, and the Gulp builder).
11. **Exec Profile Refactoring**: Removed 3-line text clamps and set card heights to dynamic `height: auto` with `min-height` baselines. Allowed image wrappers to scale dynamically (`height: auto`), retaining the original aspect ratio of the photos without cropping.
12. **Stylesheet Refactoring**: Purged unused template blocks (welcome-slides, breadcrumbs, lightbox modal, and legacy footer) from root `style.css`.

---

## 4. FUTURE MAINTENANCE DIRECTIVES
- Keep files compact. Maintain separate JS files for different layouts (e.g., `js/hero.js` for home slider, `js/lightbox.js` for photo viewports).
- Ensure all new image files uploaded are compressed to a max of 1600px width/height and quality 80-85% before committing.
- Do not bundle or concatenate JS scripts; keep them modular to maintain the de-spaghettified state.
