// Fetch the content of scraped_table.html
fetch('scraped_table.html')
  .then(response => response.text())
  .then(tableHTML => {
    // Insert the scraped table HTML into the 'tableContainer' div
    const tableContainer = document.getElementById('tableContainer');
    tableContainer.innerHTML = tableHTML;
  })
  .catch(error => console.error('An error occurred:', error));
