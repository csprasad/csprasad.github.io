const projects = [
  {
    id: 1,
    name: "Project Alpha",
    category: "Web Development",
    type: "MacOS",
    icon: "alpha-icon.png",
    description: "A modern web application built with React and Node.js.",
    images: ["alpha1.jpg", "alpha2.jpg"],
    link: "https://project-alpha.com",
    rating: 4.5,
    review: "Great project with excellent performance!"
  },
  {
    id: 2,
    name: "Project Beta",
    category: "Mobile App",
    type: "iOS",
    icon: "beta-icon.png",
    description: "A cross-platform mobile app developed with Flutter.",
    images: ["beta1.jpg", "beta2.jpg"],
    link: "https://project-beta.com",
    rating: 4.0,
    review: "User-friendly and intuitive design."
  }
];

// Render the project list
const projectList = document.getElementById('projectList');
projects.forEach(project => {
  const projectCard = document.createElement('div');
  projectCard.className = 'project-card';
  projectCard.innerHTML = `
    <h2>${project.name}</h2>
    <p>${project.category}</p>
    <button onclick="viewProject(${project.id})">View Details</button>
  `;
  projectList.appendChild(projectCard);
});

// Function to navigate to the project details screen
function viewProject(projectId) {
  window.location.href = `project-details.html?id=${projectId}`;
}