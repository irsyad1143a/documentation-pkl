document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const monthFilter = document.getElementById("monthFilter");
  const photos = document.querySelectorAll(".photo");
  const monthSections = document.querySelectorAll(".month-section");
  const main = document.querySelector("main");
  const popupOverlay = document.querySelector(".popup-overlay");
  const popupImage = document.querySelector(".popup-image");
  const popupCaption = document.querySelector(".popup-caption");
  const backButton = document.querySelector(".back-button");

  // Create a new element for the "not found" message
  const notFoundMessage = document.createElement("div");
  notFoundMessage.id = "notFoundMessage";
  notFoundMessage.textContent = "Gambar tidak ditemukan";
  notFoundMessage.style.display = "none";
  main.appendChild(notFoundMessage);

  // Function to open popup
  function openPopup(imageSrc, caption) {
    popupImage.src = imageSrc;
    popupCaption.textContent = caption;
    popupOverlay.style.display = "flex";
    document.body.style.overflow = "hidden"; // Prevent scrolling
  }

  // Function to close popup
  function closePopup() {
    popupOverlay.style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
  }

  // Add click event listeners to photos
  photos.forEach((photo) => {
    photo.addEventListener("click", () => {
      const img = photo.querySelector("img");
      const caption = photo.querySelector("p").textContent;
      openPopup(img.src, caption);
    });
  });

  // Add click event listener to back button
  backButton.addEventListener("click", closePopup);

  // Close popup when clicking outside the image
  popupOverlay.addEventListener("click", (e) => {
    if (e.target === popupOverlay) {
      closePopup();
    }
  });

  // Close popup with Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePopup();
    }
  });

  // Function to filter photos based on search input and selected month
  function filterPhotos() {
    const searchTerm = searchInput.value.toLowerCase();
    const selectedMonth = monthFilter.querySelector(".active").getAttribute("data-month");
    let foundPhotos = false;

    photos.forEach((photo) => {
      const photoMonth = photo.getAttribute("data-month");
      const photoText = photo.querySelector("p").textContent.toLowerCase();

      const matchesMonth = selectedMonth === "all" || photoMonth === selectedMonth;
      const matchesSearch = photoText.includes(searchTerm);

      if (matchesMonth && matchesSearch) {
        photo.style.display = "flex";
        foundPhotos = true;
      } else {
        photo.style.display = "none";
      }
    });

    updateMonthSectionsVisibility();
    notFoundMessage.style.display = foundPhotos ? "none" : "block";
  }

  // Function to update the visibility of month sections
  function updateMonthSectionsVisibility() {
    monthSections.forEach((section) => {
      const visiblePhotos = section.querySelectorAll('.photo[style="display: flex;"]');
      section.style.display = visiblePhotos.length > 0 ? "block" : "none";
    });
  }

  // Event listener for month filter clicks
  monthFilter.addEventListener("click", function (event) {
    if (event.target.tagName === "LI") {
      monthFilter.querySelectorAll("li").forEach((li) => li.classList.remove("active"));
      event.target.classList.add("active");
      filterPhotos();
    }
  });

  // Event listener for search input
  searchInput.addEventListener("input", filterPhotos);

  // Prevent context menu on images
  document.addEventListener("contextmenu", (e) => {
    if (e.target.tagName === "IMG") {
      e.preventDefault();
    }
  });

  // Initial display of all photos
  filterPhotos();
});
