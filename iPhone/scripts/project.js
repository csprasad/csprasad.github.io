document.addEventListener("DOMContentLoaded", async () => {
  const projectContainer = document.querySelector(".list-section");

  try {
    const response = await fetch("../data/data.json");
    const data = await response.json();
    const { macOS_apps, iOS_apps } = data.apps;

    const groupedApps = {
      macOS: macOS_apps,
      iOS: iOS_apps
    };

    // Clear existing content
    projectContainer.innerHTML = "";

    // Generate OS Categories (MacOS, iOS)
    Object.keys(groupedApps).forEach(osType => {
      if (!groupedApps[osType] || groupedApps[osType].length === 0) return;

      const osSection = document.createElement("div");
      osSection.classList.add("os-section");

      // OS Heading
      osSection.innerHTML = `<h2>${osType} Apps</h2>`;

      // App List
      const appList = document.createElement("div");
      appList.classList.add("app-list");

      groupedApps[osType].forEach(app => {
        const appItem = document.createElement("div");
        appItem.classList.add("list-item");

        appItem.innerHTML = `
          <img src="${app.icon}" alt="${app.name}" class="list-icon">
          <div class="list-info">
            <span class="list-name">${app.name}</span>
            <span class="list-type">${app.category}</span>
          </div>
          <button class="list-button" onclick="viewProject('${app.platform}', '${app.app_id}')">Open</button>
        `;

        appList.appendChild(appItem);
      });

      osSection.appendChild(appList);
      projectContainer.appendChild(osSection);
    });

  } catch (error) {
    console.error("Error loading projects:", error);
  }
});

// Navigate to project details
function viewProject(os, projectId) {
  window.location.href = `project-details.html?os=${os}&id=${projectId}`;
}
