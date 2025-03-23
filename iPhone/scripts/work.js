document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript loaded and DOM ready!");

    fetch("../data/data.json") // Ensure the correct path
        .then(response => response.json())
        .then(data => {
            console.log("Raw JSON response:", data);  // Debugging log

            if (!data.experience || !data.experience.companies) {
                console.error("No experience data found!");
                return;
            }

            const workExperiences = data.experience.companies; // ✅ Corrected reference

            console.log("Work Experiences:", workExperiences); // Debugging log

            const mapContainer = document.querySelector(".page.app-page");
            const popup = document.getElementById("popup");
            const popupOverlay = document.getElementById("popup-overlay");
            const closePopup = document.querySelector(".close-popup");

            if (mapContainer && data.experience.map_bg_image) {
                mapContainer.style.background = `url('${data.experience.map_bg_image}') no-repeat center center`;
                mapContainer.style.backgroundSize = "cover"; // Ensures full coverage
                console.log("Background updated:", data.experience.map_bg_image);
            } else {
                console.warn("Map background image not found in JSON!");
            }

            if (!mapContainer || !popup || !popupOverlay || !closePopup) {
                console.error("One or more elements are missing! Check your HTML.");
                return;
            }

            // Create and add markers
            workExperiences.forEach((job, index) => {
                console.log("Adding marker for:", job.company); // Debugging log

                const marker = document.createElement("div");
                marker.classList.add("map-marker");
                marker.style.top = job.position.top;
                marker.style.left = job.position.left;
                marker.dataset.index = index;

                // 🛠️ Fix: Add missing inner elements
                const markerTitle = document.createElement("div");
                markerTitle.classList.add("marker-title");
                markerTitle.textContent = job.company; // Use company name as title
                marker.appendChild(markerTitle);

                const markerPin = document.createElement("div");
                markerPin.classList.add("marker-pin");
                marker.appendChild(markerPin);

                marker.addEventListener("click", () => {
                    console.log("Marker clicked:", job.company);
                    displayPopup(job);
                });

                mapContainer.appendChild(marker);
            });

            // Function to show popup
            function displayPopup(job) {
                document.getElementById("popup-company").textContent = job.company;
                document.getElementById("popup-role").textContent = job.role;
                document.getElementById("popup-duration").textContent = job.duration;
                document.getElementById("popup-responsibilities").innerHTML = job.responsibilities.map(item => `<li>${item}</li>`).join("");
                document.getElementById("popup-projects").innerHTML = job.projects.map(item => `<li>${item}</li>`).join("");

                popup.style.display = "block";
                popupOverlay.style.display = "block";
            }

            // Close popup
            function closePopupFunction() {
                popup.style.display = "none";
                popupOverlay.style.display = "none";
            }

            closePopup.addEventListener("click", closePopupFunction);
            popupOverlay.addEventListener("click", closePopupFunction);
        })
        .catch(error => console.error("Error loading profile data:", error));
});
