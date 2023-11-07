function printPage() {
    window.print();
  }

   // Function to trigger the print dialog
     // Function to trigger the print dialog
  function printPage() {
    // Reference to the table row where you want to update the data
    const rateCell = document.querySelector('.rate');
    const locationCell = document.querySelector('.location');
    const heightCell = document.querySelector('.height');

    // Listen for changes in the Firebase data
    database.ref('/FloodUpdate').on('value', (snapshot) => {
      try {
        const data = snapshot.val();
        if (!data) {
          throw new Error('No data available'); // Custom error message for no data
        }

        const height = data.height;
        const location = data.location;

        // Determine the rate color based on the height value
        let rateColor = '';
        if (height === 0) {
          rateColor = 'green';
        } else if (height >= 1 && height <= 3) {
          rateColor = 'yellow';
        } else if (height > 3) {
          rateColor = 'red';
        }

        // Update the rate cell's background color
        rateCell.style.backgroundColor = rateColor;

        // Update the rate cell's content
        rateCell.textContent = data.rate;

        // Update the location and height cells
        locationCell.textContent = location;
        heightCell.textContent = height;
      } catch (error) {
        // Handle the error gracefully
        console.error('An error occurred:', error.message);
        // You can add additional error handling logic here if needed
      }
    });

    // Trigger the print dialog
    setTimeout(() => {
      window.print();
    }, 1000); // Delay the print to ensure styles are applied
  }

  // Add a click event listener to the "Download" button
  document.getElementById("download").addEventListener("click", printPage);