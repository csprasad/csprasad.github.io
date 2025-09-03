// project-details.js
document.addEventListener("DOMContentLoaded", async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get("id");
    const osType = urlParams.get("os");

    // If this file is included on a page without parameters, bail.
    if (!projectId || !osType) return;

    try {
        // Fetch portfolio from backend (cached by dataLoader.js)
        const data = await getPortfolio();
        const base = data.BASE_URL;

        const apps = data.apps[`${osType}_apps`];
        if (!apps) throw new Error(`No apps found for OS: ${osType}`);

        const project = apps.find(app => String(app.app_id) === String(projectId));
        if (!project) throw new Error("Project not found.");

        // Update UI
        document.getElementById("app-icon").src = base + project.icon;
        document.getElementById("app-name").textContent = project.name;
        document.getElementById("app-category").textContent = project.category;
        document.getElementById("description").textContent = project.description;
        document.getElementById("action-button").href = project.app_store_link;

        // Render screenshots
        const screenshotContainer = document.getElementById("screenshot-container");
        screenshotContainer.innerHTML = "";
        project.screenshots.forEach(image => {
            const img = document.createElement("img");
            img.src = base + image; // prepend base URL
            img.alt = "Screenshot";
            img.classList.add("screenshot");
            screenshotContainer.appendChild(img);
        });

        // Hook up the modal (works here and in popup)
        if (typeof window.initScreenshotModal === "function") {
            window.initScreenshotModal(screenshotContainer, project.screenshots.map(img => base + img));
        }

    } catch (error) {
        console.error(error);
        const holder = document.querySelector(".app-container");
        if (holder) holder.innerHTML = `<p>${error.message}</p>`;
    }
});
