document.addEventListener("DOMContentLoaded", async () => {
    try {
        const data = await getPortfolio();
        const BASE_URL = data.BASE_URL || ""; // use backend base URL

        if (!data.experience || !data.experience.companies) {
            console.error("No experience data found!");
            return;
        }

        const workExperiences = data.experience.companies;

        const mapContainer = document.querySelector(".page.app-page");
        const popup = document.getElementById("popup");
        const popupOverlay = document.getElementById("popup-overlay");
        const closePopup = document.querySelector(".close-popup");

        if (!mapContainer || !popup || !popupOverlay || !closePopup) {
            console.error("Missing required elements");
            return;
        }

        // Map background image
        if (data.experience.map_bg_image) {
            mapContainer.style.backgroundImage = `url('${BASE_URL}${data.experience.map_bg_image}')`;
            mapContainer.style.backgroundRepeat = "no-repeat";
            mapContainer.style.backgroundPosition = "center center";
            mapContainer.style.backgroundSize = "cover";
        }

        // Add markers
        workExperiences.forEach((job, index) => {
            const marker = document.createElement("div");
            marker.classList.add("map-marker");
            marker.style.top = job.position.top;
            marker.style.left = job.position.left;
            marker.dataset.index = index;

            const markerTitle = document.createElement("div");
            markerTitle.classList.add("marker-title");
            markerTitle.textContent = job.company;
            marker.appendChild(markerTitle);

            const markerPin = document.createElement("div");
            markerPin.classList.add("marker-pin");
            marker.appendChild(markerPin);

            marker.addEventListener("click", () => displayPopup(job));

            mapContainer.appendChild(marker);
        });

        function displayPopup(job) {
            document.getElementById("popup-company").textContent = job.company;
            document.getElementById("popup-role").textContent = job.role;
            document.getElementById("popup-duration").textContent = job.duration;
            document.getElementById("popup-responsibilities").innerHTML = job.responsibilities.map(i => `<li>${i}</li>`).join("");
            document.getElementById("popup-projects").innerHTML = job.projects.map(i => `<li>${i}</li>`).join("");

            popup.style.display = "block";
            popupOverlay.style.display = "block";
        }

        function closePopupFunction() {
            popup.style.display = "none";
            popupOverlay.style.display = "none";
        }

        closePopup.addEventListener("click", closePopupFunction);
        popupOverlay.addEventListener("click", closePopupFunction);

    } catch (err) {
        console.error("Error loading portfolio data:", err);
    }
});
