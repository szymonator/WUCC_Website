document.addEventListener('DOMContentLoaded', () => {
  const activityCard = document.querySelector('.activity-card');
  if (!activityCard) return;

  const cleanDateText = (text) => {
    // Remove "st", "nd", "rd", "th" day suffixes for standard JS Date parsing
    return text.replace(/(\d+)(st|nd|rd|th)/, '$1');
  };

  const parseDate = (text) => {
    try {
      const clean = cleanDateText(text);
      const parsed = new Date(clean);
      return isNaN(parsed.getTime()) ? new Date(0) : parsed;
    } catch (e) {
      return new Date(0);
    }
  };

  const fetchListing = async (url) => {
    try {
      const response = await fetch(url);
      if (!response.ok) return [];
      const htmlText = await response.text();
      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlText, 'text/html');
      const cards = Array.from(doc.querySelectorAll('.adventure-card'));
      return cards.map(card => {
        const titleEl = card.querySelector('h3 a');
        const dateEl = card.querySelector('.adventure-date');
        const authorEl = card.querySelector('.adventure-author');
        const imgEl = card.querySelector('.adventure-card-image img');

        return {
          title: titleEl ? titleEl.textContent.trim() : '',
          link: titleEl ? titleEl.getAttribute('href') : '',
          dateText: dateEl ? dateEl.textContent.trim() : '',
          authorText: authorEl ? authorEl.textContent.trim() : '',
          imgSrc: imgEl ? imgEl.getAttribute('src') : '',
          dateObj: dateEl ? parseDate(dateEl.textContent.trim()) : new Date(0)
        };
      });
    } catch (err) {
      console.warn(`Failed to fetch recent activity list from ${url}:`, err);
      return [];
    }
  };

  const updateCard = async () => {
    // 1. Fetch both Trips/Tours and Comps listings
    const [trips, comps] = await Promise.all([
      fetchListing('/adventures/tripsandtours/'),
      fetchListing('/adventures/comps/')
    ]);

    const allPosts = [...trips, ...comps];
    if (allPosts.length === 0) return;

    // 2. Sort by date descending
    allPosts.sort((a, b) => b.dateObj - a.dateObj);
    const latestPost = allPosts[0];

    // 3. Fetch the full content page to extract the preview text
    let previewText = '';
    try {
      const response = await fetch(latestPost.link);
      if (response.ok) {
        const htmlText = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(htmlText, 'text/html');
        const paragraphs = Array.from(doc.querySelectorAll('.about-us-content p, .about-us-text p'));
        const bodyParagraph = paragraphs.find(p => {
          const text = p.textContent.trim();
          const html = p.innerHTML;
          // Ignore Date/Author header
          if (p.getAttribute('style') && p.getAttribute('style').includes('#A7A7A7')) return false;
          // Ignore Dates/Location metadata lines
          if (html.includes('<b>Dates:</b>') || html.includes('<b>Location:</b>') || html.includes('<strong>Dates:</strong>')) return false;
          return text.length > 35;
        });
        if (bodyParagraph) {
          previewText = bodyParagraph.textContent.trim();
          // Truncate to a clean word boundary around 280 characters to avoid half-cut words
          if (previewText.length > 280) {
            const cutIndex = previewText.lastIndexOf(' ', 280);
            previewText = previewText.substring(0, cutIndex > 0 ? cutIndex : 280);
          }
          // Always ensure the preview ends with three dots "..."
          if (!previewText.endsWith('...')) {
            // Strip any trailing spaces or punctuation before appending "..."
            previewText = previewText.replace(/[\.\,\!\?\;\:\-\s]+$/, '') + '...';
          }
        }
      }
    } catch (err) {
      console.warn('Failed to fetch post details for preview:', err);
    }

    // 4. Update the card on the DOM
    const titleLink = activityCard.querySelector('.activity-title a');
    const dateEl = activityCard.querySelector('.activity-date');
    const metaEl = activityCard.querySelector('.activity-meta');
    const previewEl = activityCard.querySelector('.activity-preview');
    const readMoreBtn = activityCard.querySelector('.activity-btn');
    const imgEl = activityCard.querySelector('.activity-card-image img.activity-img');
    const placeholderEl = activityCard.querySelector('.activity-card-image .image-placeholder');

    if (titleLink) {
      titleLink.textContent = latestPost.title;
      titleLink.setAttribute('href', latestPost.link);
    }
    if (readMoreBtn) {
      readMoreBtn.setAttribute('href', latestPost.link);
      readMoreBtn.style.visibility = ''; // Show the button
    }
    if (dateEl) {
      dateEl.textContent = latestPost.dateText;
    }
    if (metaEl) {
      metaEl.textContent = latestPost.authorText;
    }
    if (previewEl && previewText) {
      previewEl.textContent = previewText;
    }
    if (imgEl && latestPost.imgSrc) {
      imgEl.setAttribute('src', latestPost.imgSrc);
      imgEl.setAttribute('alt', latestPost.title);
      imgEl.style.display = ''; // Show the image
    }
    if (placeholderEl) {
      placeholderEl.style.display = 'none'; // Hide the loading placeholder
    }
    
    // Remove loading state class from the card wrapper
    activityCard.classList.remove('is-loading');
  };

  updateCard();
});
