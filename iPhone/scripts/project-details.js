document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get("id"); // Keep it as a string
  const osType = urlParams.get("os"); // Get OS type from URL

  console.log("Project ID from URL:", projectId);
  console.log("OS Type from URL:", osType);

  if (!projectId || !osType) {
      console.error("Missing project ID or OS type in URL.");
      document.querySelector(".app-container").innerHTML = `<p>Invalid request.</p>`;
      return;
  }

  try {
      const response = await fetch("../data/portfolio.json");
      const data = await response.json();

      console.log("🔹 Full Project Data:", data);
      
      if (!data || !data.apps) {
          throw new Error("Invalid project data format.");
      }

      // Get the correct app list based on OS type
      const apps = data.apps[`${osType}_apps`];

      if (!apps || !Array.isArray(apps)) {
          throw new Error(`Invalid OS type: ${osType}`);
      }

      console.log("List of Apps for OS:", osType, apps);

      // Find the project by ID (convert both to strings for consistency)
      const project = apps.find(app => String(app.app_id) === String(projectId));

      console.log("Found Project:", project);

      if (!project) {
          throw new Error("Project not found.");
      }

      // Update the UI
      document.getElementById("app-icon").src = project.icon;
      document.getElementById("app-name").textContent = project.name;
      document.getElementById("app-category").textContent = project.category;
    //   document.getElementById("app-rating").textContent = `Rating: ${project.rating}/5`;
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

  } catch (error) {
      console.error("❌ Error:", error);
      document.querySelector(".app-container").innerHTML = `<p>Project not found.</p>`;
  }
});
