// Fetch data from json



  fetch("../dashBoard/data/data.json")
  .then(response => response.text()) // Read as text first
  .then(text => {
    console.log("Raw JSON response:", text); // Debug the response
    return JSON.parse(text); // Convert to JSON
  })
  .then(data => console.log("Parsed data:", data))
  .catch(error => console.error("Error loading profile data:", error));



  document.addEventListener("DOMContentLoaded", function () {
    fetch("../dashBoard/data/data.json") // Adjusted path
        .then(response => {
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            if (!data.profile) throw new Error("Profile data is missing!");

            const profile = data.profile;

            // Update profile picture
            const profileImage = document.querySelector(".widget-content img");
            if (profileImage && profile.profile_picture) {
                profileImage.src = profile.profile_picture;
            }

            // Update name and alias
            const nameElement = document.querySelector(".magic-text");
            if (nameElement) {
                nameElement.textContent = profile.name || "Username";
            }

            // Update intro
            const introElement = document.querySelector(".widget-content p");
            if (introElement) {
                introElement.textContent = profile.intro || "Intro here";
            }
        })
        .catch(error => console.error("Error loading profile data:", error));
});



// Sparkeling Effect 
let index = 0,
    interval = 2000;

const rand = (min, max) => 
  Math.floor(Math.random() * (max - min + 1)) + min;

const animate = star => {
  star.style.setProperty("--star-left", `${rand(-10, 100)}%`);
  star.style.setProperty("--star-top", `${rand(-40, 80)}%`);

  star.style.animation = "none";
  star.offsetHeight;
  star.style.animation = "";
}

for(const star of document.getElementsByClassName("magic-star")) {
  setTimeout(() => {
    animate(star);
    
    setInterval(() => animate(star), 2000);
  }, index++ * (interval / 3))
}