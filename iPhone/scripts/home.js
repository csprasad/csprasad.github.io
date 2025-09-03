document.addEventListener("DOMContentLoaded", async () => {
  try {
    const data = await getPortfolio();
    const base = data.BASE_URL;

    if (!data.profile) throw new Error("Profile data is missing!");

    const profile = data.profile;

    // Update profile picture
    const profileImage = document.querySelector(".widget-content img");
    if (profileImage && profile.profile_picture) {
      profileImage.src = base + profile.profile_picture;
    }

    // .home-screen 
    const homeScreen = document.querySelector(".home-screen");
    console.log(homeScreen); // Should not be null
    if (homeScreen && profile.background_mock) {
        homeScreen.style.backgroundImage = `url('${base}${profile.background_mock}')`;
        homeScreen.style.backgroundSize = "cover";
        homeScreen.style.backgroundPosition = "center";
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
  } catch (error) {
    console.error("Error loading profile data:", error);
  }
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