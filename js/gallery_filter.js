document.addEventListener('DOMContentLoaded', () => {
  const filterMenu = document.querySelector('.filter-menu');
  if (!filterMenu) return;

  const buttons = filterMenu.querySelectorAll('button');
  const galleryItems = document.querySelectorAll('.gallery-grid > div, .adventure-grid > div');

  buttons.forEach(btn => {
    btn.addEventListener('click', () => {
      // 1. Update active button state
      buttons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      // 2. Get filter value (e.g., '*', '.boulder', '.lead')
      const filterValue = btn.getAttribute('data-filter');

      // 3. Filter gallery items
      galleryItems.forEach(item => {
        if (filterValue === '*') {
          item.style.display = '';
        } else {
          // Remove leading dot to check class list
          const className = filterValue.substring(1);
          if (item.classList.contains(className)) {
            item.style.display = '';
          } else {
            item.style.display = 'none';
          }
        }
      });
    });
  });
});
