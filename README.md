# Warwick University Climbing Club Website

This is the repository for the Warwick University Climbing Club (WUCC) website. The website is built using custom HTML5, vanilla CSS3, and modern vanilla JavaScript, optimized for fast performance, strong SEO, and high accessibility.

The site is live in production at: **[wucc.containers.uwcs.co.uk](https://wucc.containers.uwcs.co.uk)**

---

## Technical Architecture

For future maintainers, the codebase has been modernized to eliminate legacy weight and dependency libraries. The architecture relies on vanilla elements for maximum loading speeds and search engine optimization.

### 1. Styles & Frameworks
*   **Bootstrap v4.2.1 (CSS only)**: Integrated for grid layout, spacing, and flex utility classes. Heavy JavaScript components have been replaced by custom vanilla elements.
*   **FontAwesome v6.4.2 (via CDN)**: Configured with version 4 shims for backward compatibility. Used for all vector iconography site-wide.
*   **Custom Global & Page Styles**: Maintained inside `css/main_layout.css`, `css/global.css`, and specific styling sheets (`css/page_decorations.css`, `css/hero.css`).

### 2. Modern Vanilla JS Components (No jQuery / Popper.js)
All interactive elements use lightweight Vanilla JavaScript:
*   **Navigation & Header Control** ([`js/navigation.js`](/js/navigation.js)): Sticky header toggling on scroll, path-segment matching active highlights, click-outside closures for mobile dropdown menus, and global action overrides (like custom toast modals for the WhatsApp link).
*   **Collapsible Step Accordions** ([`js/collapse.js`](/js/collapse.js)): Custom transitions for instructions blocks.
*   **LCP Banner Slideshow** ([`js/hero.js`](/js/hero.js)): Progressive hero images with fetch priorities.
*   **Recent Activity Card** ([`js/recent_activity.js`](/js/recent_activity.js)): Dynamically fetches and parses the latest Adventures or Competitions page, crops text cleanly on word boundaries with trailing `...`, and renders a skeleton loading card until dynamic images are verified.
*   **Responsive Media Lightbox** ([`js/lightbox.js`](/js/lightbox.js)): Native dynamic image zoom with keyboard esc/arrow support, automatically preserving alternate text (alt attributes) for visual accessibility.

### 3. SEO & Nginx Hardening
*   **Robots.txt & Sitemap.xml**: Configured with automatic indexing pathways mapping all 42 crawlable site sections under dynamic priorities.
*   **Nginx Configuration** ([`nginx.conf`](/nginx.conf)): Hardened against server signature disclosure (`server_tokens off;`), forced to prevent overlay2 file corruption (`sendfile off;`), and configured to serve HTTP headers securely (`X-Frame-Options: SAMEORIGIN` and `X-Content-Type-Options: nosniff`).

---

## Development and Deployment

The website runs inside a containerized Docker environment utilizing Nginx.

### Local Development Run
1.  Ensure you have **Docker** and **Docker Compose** installed.
2.  Start the container build and daemon:
    ```bash
    docker compose up -d --build
    ```
3.  Access the website locally at: **`http://localhost:8080`**

### Deployment
To push changes to the live site at `wucc.containers.uwcs.co.uk`, rebuild the production containers on the host environment:
```bash
docker compose up --build -d
```
