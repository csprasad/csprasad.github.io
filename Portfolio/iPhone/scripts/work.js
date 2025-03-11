document.addEventListener("DOMContentLoaded", () => {
    console.log("JavaScript loaded and DOM ready!");

    const mapContainer = document.querySelector(".page.app-page");
    const popup = document.getElementById("popup");
    const popupOverlay = document.getElementById("popup-overlay");
    const closePopup = document.querySelector(".close-popup");

    if (!mapContainer || !popup || !popupOverlay || !closePopup) {
        console.error("One or more elements are missing! Check your HTML.");
        return;
    }

    // Work experience data
    // Work experience data
const workExperiences = [
    {
        company: "Purplesense Digital Solutions",
        role: "iOS Developer",
        duration: "Aug 2018 - Aug 2019",
        responsibilities: [
            "Developed and maintained iOS applications using Swift and Objective-C.",
            "Integrated third-party APIs and SDKs to enhance app functionality.",
            "Optimized app performance by implementing efficient memory management techniques.",
            "Collaborated with UI/UX designers to create seamless user experiences.",
            "Implemented security measures to safeguard user data and ensure compliance.",
            "Resolved bugs and conducted debugging sessions to improve app stability.",
            "Contributed to Agile development cycles and participated in daily stand-ups."
        ],
        projects: [
            "Built a mobile application for digital marketing analytics.",
            "Developed a real-time chat feature within the iOS app."
        ],
        position: { top: "90%", left: "55%" }
    },
    {
        company: "Medinin Labs",
        role: "iOS Developer Intern",
        duration: "Jun 2019 - Dec 2019",
        responsibilities: [
            "Assisted in developing RESTful APIs for mobile applications.",
            "Debugged and optimized existing iOS applications to improve performance.",
            "Implemented new UI components using SwiftUI for a modern interface.",
            "Collaborated with backend developers to integrate APIs into iOS apps.",
            "Researched and implemented best practices for mobile app security.",
            "Wrote unit tests to enhance app reliability and minimize crashes."
        ],
        projects: [
            "Redesigned the user onboarding experience for better engagement.",
            "Developed an internal tool for healthcare professionals to track patient data."
        ],
        position: { top: "60%", left: "30%" }
    },
    {
        company: "Offshore India",
        role: "Software Developer Intern",
        duration: "Jun 2019 - Dec 2019",
        responsibilities: [
            "Developed scalable web applications using React and Node.js.",
            "Assisted in designing database schemas for optimized query performance.",
            "Built reusable React components to streamline frontend development.",
            "Integrated REST APIs into web applications and handled authentication mechanisms.",
            "Performed code reviews and collaborated with team members for best practices.",
            "Worked on debugging and performance optimization of JavaScript applications."
        ],
        projects: [
            "Developed a customer management dashboard with real-time analytics.",
            "Implemented a notification system for an internal task management platform."
        ],
        position: { top: "42%", left: "72%" }
    }
];


    // Create and add markers
    workExperiences.forEach((job, index) => {
        console.log("Adding marker for:", job.company); // Debugging log

        const marker = document.createElement("div");
        marker.classList.add("map-marker");
        marker.style.top = job.position.top;
        marker.style.left = job.position.left;
        marker.dataset.index = index;

        // 🛠️ **Fix: Add missing inner elements**
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
});
