# Warwick University Climbing Club Website

This is the repository for the Warwick University Climbing Club website. The website is built using custom HTML5, vanilla CSS3, and vanilla JavaScript, relying on standard open-source libraries for responsiveness and interactivity.

## Technologies and Libraries Used

For future maintainers, the following open-source third-party libraries are integrated into this project. Please retain their license headers and attribution when updating vendor files.

### Core Frameworks & Icons
*   **Bootstrap v4.2.1**
    *   *License*: MIT License
    *   *Attribution*: Copyright (c) 2011-2018 The Bootstrap Authors / Twitter, Inc.
    *   *Usage*: Grid system, utility classes, and standard responsive components.
*   **FontAwesome v4.7.0**
    *   *License*: SIL OFL 1.1 (Fonts) / MIT License (CSS)
    *   *Attribution*: Copyright (c) Dave Gandy
    *   *Usage*: Vector icons.

### JavaScript Libraries & Plugins
*   **jQuery v3.x**
    *   *License*: MIT License
    *   *Attribution*: Copyright JS Foundation and other contributors
    *   *Usage*: DOM utilities and plugin support.
*   **Popper.js**
    *   *License*: MIT License
    *   *Attribution*: Copyright (c) 2016-present Federico Zivolo and contributors
    *   *Usage*: Tooltip and dropdown positioning.
*   **Owl Carousel v2.x**
    *   *License*: MIT License
    *   *Usage*: Responsive carousel slider widgets.
*   **Magnific Popup**
    *   *License*: MIT License
    *   *Attribution*: Copyright (c) 2012-2016 Dmitry Semigradsky
    *   *Usage*: Responsive lightbox popup dialogs.
*   **Isotope**
    *   *License*: MIT License / GPL License
    *   *Attribution*: Copyright (c) Metafizzy
    *   *Usage*: Filterable and responsive gallery layouts.
*   **Jarallax**
    *   *License*: MIT License
    *   *Attribution*: Copyright (c) nK
    *   *Usage*: Parallax background scrolling effects.
*   **Animate.css**
    *   *License*: MIT License
    *   *Attribution*: Copyright (c) 2018 Daniel Eden
    *   *Usage*: Cross-browser CSS animations.
*   **WOW.js**
    *   *License*: MIT License
    *   *Attribution*: Copyright (c) 2015 Thomas Grainger
    *   *Usage*: CSS animation triggers on scroll.
*   **Waypoints**
    *   *License*: MIT License
    *   *Attribution*: Copyright (c) 2011-2014 Caleb Troughton
    *   *Usage*: Scroll event hooks.

## Development and Deployment

The local development environment runs inside a Docker container using Nginx.

### Local Run
1.  Ensure you have Docker and Docker Compose installed.
2.  Start the Nginx development server:
    ```bash
    docker-compose up -d --build
    ```
3.  Access the website locally at: `http://localhost:8080`
