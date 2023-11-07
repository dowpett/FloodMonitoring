const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');
const https = require('https');
const path = require('path');

const app = express();
const port = 3000;
const scrapeInterval = 5 * 60 * 60 * 1000; // 5 hours in milliseconds; // 5 hours in milliseconds

const url = 'https://www.pagasa.dost.gov.ph/flood';

const url2 = 'https://www.tideschart.com/Philippines/Ilocos/Province-of-Pangasinan/Dagupan-City';

async function scrapeWebsiteAndSave() {
  try {
    const response = await axios.get(url, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    const $ = cheerio.load(response.data);

    // Find the <table class="table dam-table"> element
    const tableElement = $('table.table.dam-table');

    if (tableElement.length) {
      // Get the HTML content of the table
      const tableHTML = $.html(tableElement);

      // Write the scraped table HTML to the 'scraped_table.html' file
      const outputFile = path.join(__dirname, '..', 'public', 'scraped_table.html');
      fs.writeFileSync(outputFile, tableHTML);
      
      console.log('Scraping and saving completed.');
    } else {
      console.error('Failed to find the target table on the page.');
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

async function scrapeWebsiteAndSave2() {
  try {
    const response = await axios.get(url2, {
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36',
      },
      httpsAgent: new https.Agent({ rejectUnauthorized: false }),
    });
    const $ = cheerio.load(response.data);

    // Find the table with class "table table-hover tidechart mb-4"
    const tableElement = $('table.table.table-hover.tidechart.mb-4');

    if (tableElement.length) {
      // Get the HTML content of the table
      const tableHTML = $.html(tableElement);

      // Write the scraped table HTML to the 'scraped_table2.html' file
      const outputFile = path.join(__dirname, '..', 'public', 'scraped_table2.html');
      fs.writeFileSync(outputFile, tableHTML);
      
      console.log('Scraping and saving for url2 completed.');
    } else {
      console.error('Failed to find the target table on url2 page.');
    }
  } catch (error) {
    console.error('An error occurred for url2:', error);
  }
}

// Call the function to start scraping immediately
scrapeWebsiteAndSave();
scrapeWebsiteAndSave2();

// Schedule scraping every 5 hours
setInterval(scrapeWebsiteAndSave, scrapeInterval);

// Serve static files from the 'public' directory
app.use(express.static('../public'));

// Define a route handler for the root URL ("/") to serve "index.html"
app.get('/', (req, res) => {
  // Read the content of the scraped_table.html file
  const scrapedTableHTML = fs.readFileSync(path.join(__dirname, '..', 'public', 'scraped_table.html'), 'utf8');

  // Send the HTML content as the response
  res.send(scrapedTableHTML);
});

// Start the Express server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
