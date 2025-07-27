document.addEventListener('DOMContentLoaded', () => {
  const apiUrl = 'https://gpoidntrk3.execute-api.us-east-1.amazonaws.com'; // Replace with your actual API URL

  fetch(apiUrl)
    .then(response => response.json())
    .then(data => {
      const items = data.Items || [];

      if (items.length === 0) {
        document.getElementById('chart-container').innerHTML = '<p style="text-align:center;">No sentiment data available at this time.</p>';
        return;
      }

      const labels = items.map(item => {
        const label = item.sentiment.toLowerCase();
        return label.charAt(0).toUpperCase() + label.slice(1); // Capitalize first letter
      });

      const counts = items.map(item => item.count);

      const ctx = document.getElementById('sentimentChart').getContext('2d');
      new Chart(ctx, {
        type: 'bar',
        data: {
          labels: labels,
          datasets: [{
            label: 'Sentiment Count',
            data: counts,
            backgroundColor: [
              '#4caf50', // Positive
              '#f44336', // Negative
              '#2196f3', // Neutral
              '#ff9800'  // Mixed
            ],
            borderWidth: 1
          }]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: false
            },
            title: {
              display: true,
              text: 'AI Sentiment on Reddit',
              font: {
                size: 18
              }
            }
          },
          scales: {
            y: {
              beginAtZero: true,
              ticks: {
                precision: 0
              },
              title: {
                display: true,
                text: 'Post Count'
              }
            },
            x: {
              title: {
                display: true,
                text: 'Sentiment'
              }
            }
          }
        }
      });
    })
    .catch(error => {
      console.error('Error fetching sentiment data:', error);
      document.getElementById('chart-container').innerHTML = '<p style="text-align:center; color: red;">Failed to load data.</p>';
    });
});
