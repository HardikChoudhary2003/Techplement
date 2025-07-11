const express = require('express');
const fetch = require('node-fetch');
const app = express();
const port = 3001;

app.use(express.static('public'));

app.get('/random-quote', async (req, res) => {
    try {
        const response = await fetch('https://api.quotable.io/random');
        const data = await response.json();
        console.log('Fetched random quote:', data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching random quote:', error);
        res.status(500).json({ error: 'Failed to fetch quote' });
    }
});

app.get('/quotes-by-author', async (req, res) => {
    const author = req.query.author;
    if (!author) {
        return res.status(400).json({ error: 'Author query parameter is required' });
    }
    try {
        const response = await fetch(`https://api.quotable.io/quotes?author=${author}`);
        const data = await response.json();
        console.log(`Fetched quotes for author "${author}":`, data);
        res.json(data);
    } catch (error) {
        console.error(`Error fetching quotes for author "${author}":`, error);
        res.status(500).json({ error: 'Failed to fetch quotes' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
