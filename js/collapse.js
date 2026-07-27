/**
 * Vanilla JS replacement for Bootstrap 4's Collapse + Dropdown plugins.
 * Eliminates the jQuery, Popper.js, and Bootstrap JS dependency (~85KB).
 *
 * Handles:
 * - [data-toggle="collapse"] — animated expand/collapse with height transition
 * - [data-toggle="dropdown"] — click-to-toggle dropdown menus (mobile)
 */
document.addEventListener('DOMContentLoaded', () => {

  // ── Collapse Handler ──────────────────────────────────────────

  /**
   * Collapse an element with a smooth height transition.
   * @param {HTMLElement} target - The .collapse element to hide.
   * @param {HTMLElement} trigger - The trigger element (for aria-expanded).
   */
  const collapseElement = (target, trigger) => {
    // Set explicit height so transition has a start value
    target.style.height = target.scrollHeight + 'px';
    target.offsetHeight; // force reflow
    target.classList.remove('collapse', 'show');
    target.classList.add('collapsing');
    target.style.height = '0';
    if (trigger) trigger.setAttribute('aria-expanded', 'false');

    const onEnd = () => {
      target.classList.remove('collapsing');
      target.classList.add('collapse');
      target.style.height = '';
      target.removeEventListener('transitionend', onEnd);
    };
    target.addEventListener('transitionend', onEnd);
    // Fallback in case transitionend doesn't fire
    setTimeout(onEnd, 400);
  };

  /**
   * Expand an element with a smooth height transition.
   * @param {HTMLElement} target - The .collapse element to show.
   * @param {HTMLElement} trigger - The trigger element (for aria-expanded).
   */
  const expandElement = (target, trigger) => {
    target.classList.remove('collapse');
    target.classList.add('collapsing');
    target.style.height = '0';
    target.offsetHeight; // force reflow
    target.style.height = target.scrollHeight + 'px';
    if (trigger) trigger.setAttribute('aria-expanded', 'true');

    const onEnd = () => {
      target.classList.remove('collapsing');
      target.classList.add('collapse', 'show');
      target.style.height = '';
      target.removeEventListener('transitionend', onEnd);
    };
    target.addEventListener('transitionend', onEnd);
    // Fallback in case transitionend doesn't fire
    setTimeout(onEnd, 400);
  };

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-toggle="collapse"]');
    if (!trigger) return;

    e.preventDefault();

    const targetSelector = trigger.dataset.target || trigger.getAttribute('href');
    if (!targetSelector) return;
    const target = document.querySelector(targetSelector);
    if (!target) return;

    // Skip if currently animating
    if (target.classList.contains('collapsing')) return;

    if (target.classList.contains('show')) {
      collapseElement(target, trigger);
    } else {
      expandElement(target, trigger);
    }
  });


  // ── Dropdown Handler (mobile click-based toggling) ────────────

  document.addEventListener('click', (e) => {
    const trigger = e.target.closest('[data-toggle="dropdown"]');

    if (trigger) {
      // Only toggle on mobile — desktop uses CSS :hover (handled in navigation.css)
      if (window.innerWidth < 992) {
        e.preventDefault();
        const menu = trigger.nextElementSibling;
        if (menu && menu.classList.contains('dropdown-menu')) {
          const wasShown = menu.classList.contains('show');
          // Close all other dropdowns first
          document.querySelectorAll('.dropdown-menu.show').forEach(m => m.classList.remove('show'));
          if (!wasShown) {
            menu.classList.add('show');
          }
        }
      }
      return;
    }

    // Click outside closes all open dropdowns
    if (!e.target.closest('.dropdown-menu')) {
      document.querySelectorAll('.dropdown-menu.show').forEach(m => m.classList.remove('show'));
    }
  });

});
