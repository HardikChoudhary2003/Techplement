document.addEventListener('DOMContentLoaded', () => {
    const quoteText = document.getElementById('quote-text');
    const quoteAuthor = document.getElementById('quote-author');
    const newQuoteBtn = document.getElementById('new-quote-btn');
    const searchBtn = document.getElementById('search-btn');
    const authorInput = document.getElementById('author-input');
    const searchResults = document.getElementById('search-results');

    const fetchRandomQuote = async () => {
        try {
            const response = await fetch('/random-quote');
            const data = await response.json();
            quoteText.textContent = `"${data.content}"`;
            quoteAuthor.textContent = `- ${data.author}`;
        } catch (error) {
            quoteText.textContent = 'Failed to fetch quote. Please try again later.';
            quoteAuthor.textContent = '';
        }
    };

    const searchByAuthor = async () => {
        const author = authorInput.value.trim();
        if (!author) return;

        try {
            const response = await fetch(`/quotes-by-author?author=${author}`);
            const data = await response.json();
            searchResults.innerHTML = '';
            if (data.results.length > 0) {
                data.results.forEach(quote => {
                    const quoteDiv = document.createElement('div');
                    quoteDiv.classList.add('quote');
                    quoteDiv.innerHTML = `<p>"${quote.content}"</p><p>- ${quote.author}</p>`;
                    searchResults.appendChild(quoteDiv);
                });
            } else {
                searchResults.innerHTML = '<p>No quotes found for this author.</p>';
            }
        } catch (error) {
            searchResults.innerHTML = '<p>Failed to fetch quotes. Please try again later.</p>';
        }
    };

    newQuoteBtn.addEventListener('click', fetchRandomQuote);
    searchBtn.addEventListener('click', searchByAuthor);

    fetchRandomQuote();
});
