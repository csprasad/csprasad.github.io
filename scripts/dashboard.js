document.addEventListener("DOMContentLoaded", function () {
    const buttons = document.querySelectorAll(".os-btn");
    const displayFrame = document.getElementById("os-display");

    buttons.forEach(button => {
        button.addEventListener("click", function () {
            const platform = this.getAttribute("data-platform");
            displayFrame.src = `../${platform}/index.html`;
        });
    });
});


// Animation for name 
