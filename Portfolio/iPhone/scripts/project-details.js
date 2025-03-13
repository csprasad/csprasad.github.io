class Project {
  constructor(id, name, category, type, icon, description, images, link, rating, review) {
    this.id = id;
    this.name = name;
    this.category = category;
    this.type = type;
    this.icon = icon;
    this.description = description;
    this.images = images;
    this.link = link;
    this.rating = rating;
    this.review = review;
  }
}

// Fetch the project ID from the URL
const urlParams = new URLSearchParams(window.location.search);
const projectId = parseInt(urlParams.get('id'));

// Example project data (same as in the previous screen)
const projects = [
new Project(
    1,
    "DevLint",
    "Developer Tools",
    "MacOS",
    "assets/images/Projects/DevLint/DevLint.png",
    "DevLint is a lightweight, native macOS application designed to help developers format, lint, and correct Swift syntax effortlessly. The project is currently in development, aiming to provide a minimal yet efficient tool for Swift developers who want a clean, readable, and well-structured codebase.",
    ["assets/images/Projects/Buildworks/Buildworks-01.jpg", 
    "assets/images/Projects/Buildworks/Buildworks-02.jpg",
    "assets/images/Projects/Buildworks/Buildworks-03.jpg",
    "assets/images/Projects/Buildworks/Buildworks-04.jpg",
    "assets/images/Projects/Buildworks/Buildworks-05.jpg", 
    "assets/images/Projects/Buildworks/Buildworks-06.jpg",
    "assets/images/Projects/Buildworks/Buildworks-07.jpg",
    "assets/images/Projects/Buildworks/Buildworks-08.jpg"],
    "https://github.com/csprasad/DevLint",
    4.5,
    "Great project with excellent performance!"
    ),
new Project(
    2,
    "Project Beta",
    "Mobile App",
    "beta-icon.png",
    "A cross-platform mobile app developed with Flutter.",
    ["beta1.jpg", "beta2.jpg"],
    "https://project-beta.com",
    4.0,
    "User-friendly and intuitive design."
    ),
new Project(
    2,
    "Project Beta",
    "Mobile App",
    "beta-icon.png",
    "A cross-platform mobile app developed with Flutter.",
    ["beta1.jpg", "beta2.jpg"],
    "https://project-beta.com",
    4.0,
    "User-friendly and intuitive design."
    ),
new Project(
    2,
    "Project Beta",
    "Mobile App",
    "beta-icon.png",
    "A cross-platform mobile app developed with Flutter.",
    ["beta1.jpg", "beta2.jpg"],
    "https://project-beta.com",
    4.0,
    "User-friendly and intuitive design."
    ),
new Project(
    2,
    "Project Beta",
    "Mobile App",
    "beta-icon.png",
    "A cross-platform mobile app developed with Flutter.",
    ["beta1.jpg", "beta2.jpg"],
    "https://project-beta.com",
    4.0,
    "User-friendly and intuitive design."
    ),
new Project(
    2,
    "Project Beta",
    "Mobile App",
    "beta-icon.png",
    "A cross-platform mobile app developed with Flutter.",
    ["beta1.jpg", "beta2.jpg"],
    "https://project-beta.com",
    4.0,
    "User-friendly and intuitive design."
    ),
new Project(
    2,
    "Project Beta",
    "Mobile App",
    "beta-icon.png",
    "A cross-platform mobile app developed with Flutter.",
    ["beta1.jpg", "beta2.jpg"],
    "https://project-beta.com",
    4.0,
    "User-friendly and intuitive design."
    ),
new Project(
    2,
    "Project Beta",
    "Mobile App",
    "beta-icon.png",
    "A cross-platform mobile app developed with Flutter.",
    ["beta1.jpg", "beta2.jpg"],
    "https://project-beta.com",
    4.0,
    "User-friendly and intuitive design."
    ),
new Project(
    2,
    "Project Beta",
    "Mobile App",
    "beta-icon.png",
    "A cross-platform mobile app developed with Flutter.",
    ["beta1.jpg", "beta2.jpg"],
    "https://project-beta.com",
    4.0,
    "User-friendly and intuitive design."
    )
];


console.log("Project ID from URL:", projectId); // Debug: Check the project ID
console.log("Projects Array:", projects); // Debug: Check the projects array

// Find the project by ID
const project = projects.find(p => p.id === projectId);

console.log("Found Project:", project); // Debug: Check the found project

if (project) {
  // Update the DOM with project details
  document.getElementById('app-icon').src = project.icon;
  document.getElementById('app-name').textContent = project.name;
  document.getElementById('app-category').textContent = project.category;
  document.getElementById('app-rating').textContent = `Rating: ${project.rating}/5`;
  document.getElementById('description').textContent = project.description;
  document.getElementById('action-button').href = project.link;

  // Clear existing screenshots (if any)
  const screenshotContainer = document.getElementById('screenshot-container');
  screenshotContainer.innerHTML = ''; // Clear previous content

  // Render screenshots
  project.images.forEach(image => {
    const img = document.createElement('img');
    img.src = image;
    img.alt = "Screenshot";
    img.classList.add('screenshot'); // Add a class for styling
    screenshotContainer.appendChild(img);
  });
} else {
  // Handle case where project is not found
  document.querySelector('.card-container').innerHTML = `<p>Project not found.</p>`;
}

