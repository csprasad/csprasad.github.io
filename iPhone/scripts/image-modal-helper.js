// scripts/image-modal-helper.js
window.initScreenshotModal = function(containerEl, images) {
  if (!containerEl) return;
  const modal = document.getElementById("image-modal");
  if (!modal) return;

  const modalImg = document.getElementById("modal-img");
  const closeBtn = modal.querySelector(".close");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  const thumbs = Array.from(containerEl.querySelectorAll("img"));
  const sources = (images && images.length) ? images : thumbs.map(img => img.src);

  let currentIndex = 0;

  function openAt(i) {
    currentIndex = i;
    modal.style.display = "flex";
    modalImg.src = sources[currentIndex];
  }
  function showNext() {
    currentIndex = (currentIndex + 1) % sources.length;
    modalImg.src = sources[currentIndex];
  }
  function showPrev() {
    currentIndex = (currentIndex - 1 + sources.length) % sources.length;
    modalImg.src = sources[currentIndex];
  }
  function close() {
    modal.style.display = "none";
  }

  thumbs.forEach((img, i) => {
    img.addEventListener("click", () => openAt(i));
  });

  if (nextBtn) nextBtn.onclick = showNext;
  if (prevBtn) prevBtn.onclick = showPrev;
  if (closeBtn) closeBtn.onclick = close;

  modal.addEventListener("click", (e) => {
    if (e.target === modal) close();
  });
};
