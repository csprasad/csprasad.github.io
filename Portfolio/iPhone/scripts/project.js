// Select elements
const cards = document.querySelectorAll('.glass-card');
const modals = document.querySelectorAll('.modal-overlay');
const closeButtons = document.querySelectorAll('.close-modal');

// Open modal on card click
cards.forEach(card => {
  card.addEventListener('click', () => {
    const modalId = card.getAttribute('data-modal-id');
    const modal = document.getElementById(modalId);
    modal.classList.add('active');
  });
});

// Close modal on close button click
closeButtons.forEach(button => {
  button.addEventListener('click', () => {
    const modal = button.closest('.modal-overlay');
    modal.classList.remove('active');
  });
});

// Close modal on overlay click
modals.forEach(modal => {
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.remove('active');
    }
  });
});