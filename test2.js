const fs = require('fs');

const tripsHtml = fs.readFileSync("/Users/szymonator1625/Programming/climbing_soc_website/adventures/tripsandtours/index.html", "utf-8");

const regex = /<span class="adventure-date">(.*?)<\/span>[\s\S]*?<h3><a[^>]*>(.*?)<\/a><\/h3>/g;
let match;
const parsedCards = [];

while ((match = regex.exec(tripsHtml)) !== null) {
  const dateText = match[1].trim();
  const title = match[2].trim();
  
  const cleanDateText = dateText.replace(/(\d+)(st|nd|rd|th)/, '$1');
  let parsed = new Date(cleanDateText);
  if (isNaN(parsed.getTime())) parsed = new Date(0);
  
  parsedCards.push({ title, dateObj: parsed });
}

parsedCards.sort((a, b) => b.dateObj - a.dateObj);
console.log("Top 2 trips:");
parsedCards.slice(0, 2).forEach(c => console.log(c.title, c.dateObj));
