document.addEventListener("DOMContentLoaded", async () => {
  const projectContainer = document.querySelector(".list-section");
  
  const fromLanding = document.referrer.includes("landing.html") || window.location.pathname.includes("landing.html");

  try {
    const response = await fetch("../data/portfolio.json");
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
        const iconPath = fromLanding ? `iPhone/${app.icon}` : app.icon;
        const appItem = document.createElement("div");
        appItem.classList.add("list-item");

        appItem.innerHTML = `
          <img src="${iconPath}" alt="${app.name}" class="list-icon">
          <div class="list-info">
            <span class="list-name">${app.name}</span>
            <span class="list-type">${app.category}</span>
          </div>
          <button class="list-button btn" onclick="viewProject('${app.platform}', '${app.app_id}')">GET</button>
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
