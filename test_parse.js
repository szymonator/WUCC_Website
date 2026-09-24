const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

const tripsHtml = fs.readFileSync("/Users/szymonator1625/Programming/climbing_soc_website/adventures/tripsandtours/index.html", "utf-8");
const doc = new JSDOM(tripsHtml).window.document;

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

const cards = Array.from(doc.querySelectorAll('.adventure-card'));
const parsedCards = cards.map(card => {
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

parsedCards.sort((a, b) => b.dateObj - a.dateObj);
console.log("Top 2 trips:", parsedCards.slice(0, 2).map(c => c.title + " - " + c.dateObj));
