// landing.js
document.addEventListener("DOMContentLoaded", async () => {
    try {
        // Fetch portfolio data
        const data = await getPortfolio();
        const BASE_URL = data.BASE_URL || "";

        // PROFILE SECTION
        const profile = data.profile;

        const profileImg = document.querySelector(".profile-img");
        if (profileImg) profileImg.src = BASE_URL + profile.profile_picture;

        const nameEl = document.querySelector(".name");
        if (nameEl) nameEl.textContent = profile.alias;

        const aliasEl = document.querySelector(".alias");
        if (aliasEl) aliasEl.textContent = `(${profile.name})`;

        const bioEl = document.querySelector(".intro");
        if (bioEl) bioEl.textContent = profile.intro || profile.bio;

        // const jobEl = document.querySelector(".company");
        // if (jobEl) jobEl.textContent = profile.job_role + " – " + profile.location;

        // SOCIAL LINKS
        const socialContainer = document.querySelector(".social-links");
        if (socialContainer && profile.social_links) {
            socialContainer.innerHTML = "";
            Object.entries(profile.social_links).forEach(([key, link]) => {
                if (!link) return;
                const a = document.createElement("a");
                a.href = link;
                a.target = "_blank";
                a.rel = "noopener noreferrer";
                a.textContent = key.toUpperCase();
                socialContainer.appendChild(a);
            });
        }

        // PROJECTS SECTION & POPUP FUNCTIONALITY is fetching from project.js & project-details.js
        

        // OS Display Buttons
        const buttons = document.querySelectorAll(".os-btn");
        const displayFrame = document.getElementById("os-display");

        buttons.forEach(button => {
            button.addEventListener("click", function () {
                const platform = this.getAttribute("data-platform");
                displayFrame.src = `${BASE_URL}${platform}/index.html`;
            });
        });

    } catch (error) {
        console.error("Error loading portfolio data:", error);
    }
});
