document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("searchInput");
  const monthFilter = document.getElementById("monthFilter");
  const photos = document.querySelectorAll(".photo");
  const monthSections = document.querySelectorAll(".month-section");
  const main = document.querySelector("main");

  // Create a new element for the "not found" message
  const notFoundMessage = document.createElement("div");
  notFoundMessage.id = "notFoundMessage";
  notFoundMessage.textContent = "Gambar tidak ditemukan";
  notFoundMessage.style.display = "none";
  main.appendChild(notFoundMessage);

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
        photo.style.display = "flex"; // Show the photo
        foundPhotos = true;
      } else {
        photo.style.display = "none"; // Hide the photo
      }
    });

    // Update the visibility of the month sections based on filtered photos
    updateMonthSectionsVisibility();

    // Show or hide the "not found" message
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

  // Initial display of all photos
  filterPhotos();
});
