document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('rsvpForm');
  const messageDiv = document.getElementById('rsvp-message');

  // Replace this URL with your Google Apps Script Web App URL
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbyXrP_mbkkbv01jFRcOmXkP46gm7h-Kd8X6QJ-MWGH7Vfhnc7amscMST2OxhaGNd5nrxQ/exec';

  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const submitButton = form.querySelector('button[type="submit"]');
    submitButton.disabled = true;
    submitButton.textContent = 'Sending...';
    messageDiv.textContent = '';

    const formData = new FormData(form);
    const timestamp = new Date().toLocaleString();

    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: timestamp,
          name: formData.get('name'),
          guests: formData.get('guests')
        })
      });

      // Since we're using no-cors, we won't get a proper response
      // We'll assume success if there's no error
      messageDiv.textContent = 'Thank you for your RSVP!';
      messageDiv.style.color = 'white';
      form.reset();
      
    } catch (error) {
      console.error('Error:', error);
      messageDiv.textContent = 'Sorry, there was a problem submitting your RSVP. Please try again or call Annie.';
      messageDiv.style.color = '#FFD7D7';
    } finally {
      submitButton.disabled = false;
      submitButton.textContent = 'Send RSVP';
    }
  });
});

