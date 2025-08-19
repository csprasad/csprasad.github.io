// project-details.js
document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id");
  const osType = urlParams.get("os");

  // If this file is included on landing.html, quietly bail.
  if (!projectId || !osType) return;

  try {
    const response = await fetch("../data/portfolio.json");
    const data = await response.json();
    const apps = data.apps[`${osType}_apps`];

    const project = apps.find(app => String(app.app_id) === String(projectId));
    if (!project) throw new Error("Project not found.");

    // Update UI
    document.getElementById("app-icon").src = project.icon;
    document.getElementById("app-name").textContent = project.name;
    document.getElementById("app-category").textContent = project.category;
    document.getElementById("description").textContent = project.description;
    document.getElementById("action-button").href = project.app_store_link;

    // Render screenshots
    const screenshotContainer = document.getElementById("screenshot-container");
    screenshotContainer.innerHTML = "";
    project.screenshots.forEach(image => {
      const img = document.createElement("img");
      img.src = image;
      img.alt = "Screenshot";
      img.classList.add("screenshot");
      screenshotContainer.appendChild(img);
    });

    // Hook up the modal (works here and in popup)
    window.initScreenshotModal(screenshotContainer, project.screenshots);

  } catch (error) {
    console.error(error);
    const holder = document.querySelector(".app-container");
    if (holder) holder.innerHTML = `<p>${error.message}</p>`;
  }
});
