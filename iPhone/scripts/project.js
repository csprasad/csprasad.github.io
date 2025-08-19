document.addEventListener("DOMContentLoaded", async () => {
  const projectContainer = document.querySelector(".list-section");
  
  const fromLanding = document.referrer.includes("landing.html") || window.location.pathname.includes("landing.html");
  window.fromLanding = fromLanding;

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
          <button class="list-button btn" onclick="viewProject('${app.platform}', '${app.app_id}')">Details</button>
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
window.viewProject = async function viewProject(os, projectId) {
  if (window.fromLanding) {
    try {
      const response = await fetch("../data/portfolio.json");
      const data = await response.json();
      const apps = data.apps[`${os}_apps`];
      const project = apps.find(app => String(app.app_id) === String(projectId));
      if (!project) throw new Error("Project not found");
      renderProjectPopup(project);
    } catch (err) {
      console.error(err);
    }
  } else {
    window.location.href = `project-details.html?os=${os}&id=${projectId}`;
  }
};

function renderProjectPopup(project) {
  const popup = document.getElementById("project-popup");
  const inner = document.getElementById("popup-inner");

  inner.innerHTML = `
    <div class="app-header">
      <img src="iPhone/${project.icon}" alt="${project.name}" class="app-icon">
      <div class="app-info">
        <span class="app-name">${project.name}</span>
        <span class="app-category">${project.category}</span>
        <div class="Action-button-container">
          <a href="${project.app_store_link}" target="_blank" class="btn">OPEN</a>
        </div>
      </div>
    </div>
    <div id="screenshot-container" class="screenshot-container">
      ${project.screenshots.map(src => `<img src="iPhone/${src}" class="screenshot">`).join("")}
    </div>
    <div class="description-container">
      <p>${project.description}</p>
    </div>
  `;

  popup.classList.remove("hidden");

  document.getElementById("popup-close").onclick = () => popup.classList.add("hidden");
  popup.querySelector(".popup-overlay").onclick = () => popup.classList.add("hidden");

  // 🔗 Bind modal to the popup thumbnails
  const container = inner.querySelector("#screenshot-container");
  window.initScreenshotModal(container);
}
