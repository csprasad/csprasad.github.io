// Function to handle swipe gestures
function handleSwipe(startY, currentY) {
    const deltaY = startY - currentY; // Calculate swipe distance
    if (deltaY > 50) { // If swiped up more than 50px
      window.location.href = 'home.html'; // Redirect to home screen
    }
  }
  
  // Initialize swipe gestures
  function initSwipeGestures() {
    const phoneContainer = document.querySelector('.phone-container');
    const isSwipeEnabled = phoneContainer.getAttribute('data-swipe-enabled') !== 'false';
  
    if (!isSwipeEnabled) return; // Skip if swipe is disabled
  
    let startY = 0;
    let isSwiping = false;
  
    // Touch Events
    phoneContainer.addEventListener('touchstart', (e) => {
      startY = e.touches[0].clientY;
      isSwiping = true;
    });
  
    phoneContainer.addEventListener('touchmove', (e) => {
      if (!isSwiping) return;
      const currentY = e.touches[0].clientY;
      handleSwipe(startY, currentY);
    });
  
    phoneContainer.addEventListener('touchend', () => {
      isSwiping = false;
    });
  
    // Mouse Events for Desktop
    phoneContainer.addEventListener('mousedown', (e) => {
      startY = e.clientY;
      isSwiping = true;
    });
  
    phoneContainer.addEventListener('mousemove', (e) => {
      if (!isSwiping) return;
      const currentY = e.clientY;
      handleSwipe(startY, currentY);
    });
  
    phoneContainer.addEventListener('mouseup', () => {
      isSwiping = false;
    });
  }
  
  // Initialize swipe gestures when the page loads
  document.addEventListener('DOMContentLoaded', initSwipeGestures);


  // Fetch real time & date
  function updateDateTime() {
    const dateElement = document.getElementById("date");
    const timeElement = document.getElementById("time");

    const now = new Date();

    // Format date as "Friday, August 12"
    const options = { weekday: 'long', month: 'long', day: 'numeric' };
    const formattedDate = now.toLocaleDateString('en-US', options);

    // Format time as "17:00"
    const formattedTime = now.toLocaleTimeString('en-US', { 
        hour: '2-digit', 
        minute: '2-digit',
        hour12: false 
    });

    // Update the elements
    dateElement.textContent = formattedDate;
    timeElement.textContent = formattedTime;
}

// Update immediately when the page loads
updateDateTime();

// Update time every minute
setInterval(updateDateTime, 60000);
