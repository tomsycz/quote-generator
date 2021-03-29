// Get Quotes From API
const quoteContainer = document.getElementById("quote-container");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Show Loading
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
// Hide Loading

function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

// Show New Quote
function newQuote() {
  showLoadingSpinner();
  
  //Pick a random quote from apiQuotes Array
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  // Check if Author field exists
  quote.author
    ? (authorText.textContent = quote.author)
    : (authorText.textContent = "unknown");

  //check quote length to determine styling

  quote.text.length > 90
    ? quoteText.classList.add("long-quote")
    : quoteText.classList.remove("long-quote");

  quoteText.textContent = quote.text;
  removeLoadingSpinner();
}

// GET Quotes from API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    //catch error here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}
// Event Listener
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On load
getQuotes();

// // LOCAL QUOTES
// function newQuote() {
//   //Pick a random quote from apiQuotes Array
//   const quote = localQuotes[Math.floor(Math.random() * localQuotes.length)];
//   console.log(quote);
// }
