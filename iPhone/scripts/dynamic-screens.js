function loadScreen(screen) {
  const container = document.getElementById("screen-content");

  switch(screen) {
    case 'home':
      container.innerHTML = `
        <div class="page home-screen">
          <h1 class="text-center mt-4">Home Screen</h1>
          <p class="text-center">Welcome to my portfolio!</p>
        </div>`;
      break;

    case 'work':
      container.innerHTML = `
        <div class="page work-screen">
          <h1 class="text-center mt-4">Work Screen</h1>
          <p class="text-center">Company map + details</p>
        </div>`;
      break;

    case 'projects':
      container.innerHTML = `
        <div class="page projects-screen">
          <h1 class="text-center mt-4">Projects Screen</h1>
          <p class="text-center">List of apps</p>
        </div>`;
      break;

    case 'contact':
      container.innerHTML = `
        <div class="page contact-screen">
          <h1 class="text-center mt-4">Contact Screen</h1>
          <p class="text-center">Email & socials</p>
        </div>`;
      break;
  }
}
