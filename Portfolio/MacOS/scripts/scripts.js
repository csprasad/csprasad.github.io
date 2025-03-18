const icons = document.querySelectorAll(".ico");

const resetIcons = () => {
  icons.forEach((item) => {
    item.style.transform = "scale(1) translateY(0px)";
  });
};

icons.forEach((item, index) => {
  item.addEventListener("mouseover", () => focus(index));
  item.addEventListener("mouseleave", resetIcons);
});

const focus = (index) => {
  resetIcons();
  const transformations = [
    { idx: index - 2, scale: 1.1, translateY: 0 },
    { idx: index - 1, scale: 1.2, translateY: -6 },
    { idx: index, scale: 1.5, translateY: -10 },
    { idx: index + 1, scale: 1.2, translateY: -6 },
    { idx: index + 2, scale: 1.1, translateY: 0 }
  ];

  transformations.forEach(({ idx, scale, translateY }) => {
    if (icons[idx]) {
      console.log(scale);
      icons[
        idx
      ].style.transform = `scale(${scale}) translateY(${translateY}px)`;
    }
  });
};


//Fetch time & date
function updateDateTime() {
    const datetimeElement = document.getElementById("datetime"); // Single div for date and time

    const now = new Date();

    // Format date as "Wed 19 Mar"
    const dateOptions = { weekday: 'short', day: 'numeric', month: 'short' };
    const formattedDate = now.toLocaleDateString('en-US', dateOptions);

    // Format time as "4:06 AM"
    const formattedTime = now.toLocaleTimeString('en-US', { 
        hour: 'numeric', 
        minute: '2-digit',
        hour12: true // Use 12-hour format
    });

    // Combine date and time into one string
    const formattedDateTime = `${formattedDate} ${formattedTime}`;

    // Update the single div
    datetimeElement.textContent = formattedDateTime;
}

// Update immediately when the page loads
updateDateTime();

// Update time every minute
setInterval(updateDateTime, 60000);