// Fetch the content of scraped_table2.html (for the second table)
fetch('scraped_table2.html')
  .then(response => response.text())
  .then(table2HTML => {
    // Insert the scraped table HTML into the 'tideContainer' div
    const tideContainer = document.getElementById('tideContainer');
    tideContainer.innerHTML = table2HTML;
  })
  .catch(error => console.error('An error occurred for table2:', error));
