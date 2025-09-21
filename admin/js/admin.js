
  const searchIcon = document.getElementById("searchIcon");
  const searchOverlay = document.getElementById("searchOverlay");
  const closeSearch = document.getElementById("closeSearch");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const suggestionsBox = document.getElementById("suggestions");

  const searchMap = {
    "home": "#home",
    "pet profile": "#owner-profile",
    "dog profile": "#owner-profile",
    "cat profile": "#owner-profile",
    "feeding guide": "#owner-feeding",
    "grooming": "#owner-grooming",
    "health tips": "#owner-health",
    "medicine": "#owner-health",
    "training": "#owner-training",
    "products": "#owner-products",
    "emergency": "#owner-emergency",
    "feedback": "#owner-feedback",
    "contact": "#owner-contact",
    "about": "#owner-about",
    "vet": "#vet-profile",
    "doctor": "#vet-profile",
    "veterinarian": "#vet-profile",
    "slots": "#vet-slots",
    "case studies": "#vet-cases",
    "adopt": "#shelter-adopt",
    "adopt dog": "#shelter-adopt",
    "adopt cat": "#shelter-adopt",
    "stories": "#shelter-stories",
    "events": "#shelter-events",
    "shelter contact": "#shelter-contact"
  };

  // Open overlay
  searchIcon.addEventListener("click", () => {
    searchOverlay.style.display = "flex";
    searchInput.focus();
  });

  // Close overlay
  closeSearch.addEventListener("click", () => {
    searchOverlay.style.display = "none";
    searchInput.value = "";
    suggestionsBox.innerHTML = "";
  });

  // Generate suggestions while typing
  searchInput.addEventListener("input", () => {
    let query = searchInput.value.toLowerCase().trim();
    suggestionsBox.innerHTML = "";

    if (query.length === 0) return;

    for (let key in searchMap) {
      if (key.includes(query)) {
        let li = document.createElement("li");
        li.textContent = key;
        li.onclick = () => {
          window.location.hash = searchMap[key];
          searchOverlay.style.display = "none";
          searchInput.value = "";
          suggestionsBox.innerHTML = "";
        };
        suggestionsBox.appendChild(li);
      }
    }
  });

  // Direct search button / Enter
  function handleSearch() {
    let query = searchInput.value.toLowerCase().trim();
    let found = false;

    for (let key in searchMap) {
      if (query.includes(key)) {  // partial match
        window.location.hash = searchMap[key];
        found = true;
        break;
      }
    }

    if (!found) {
      alert("No results found. Try again!");
    }

    searchOverlay.style.display = "none";
    searchInput.value = "";
    suggestionsBox.innerHTML = "";
  }

  searchBtn.addEventListener("click", handleSearch);
  searchInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") handleSearch();
  });



  // for search bar closing 



// Close overlay if user clicks ANYWHERE except inside search-content or suggestions
document.addEventListener("click", (e) => {
  if (searchOverlay.style.display === "flex") {
    
    if (
      e.target.closest(".search-content") || 
      e.target.closest("#suggestions")
    ) {
      return;
    }

    if (e.target === searchIcon) {
      return;
    }

    searchOverlay.style.display = "none";
    searchInput.value = "";
    suggestionsBox.innerHTML = "";
  }
});







const modalOverlay = document.getElementById("fcModalOverlay");

// Show modal with fade-in on every page load (with delay)
window.addEventListener("load", () => {
  setTimeout(() => {
    modalOverlay.style.display = "flex"; // ensure visible
    requestAnimationFrame(() => {
      modalOverlay.classList.add("show");
    });
  }, 1500); // 🔥 1 second delay (1000ms)
});

// Close modal with fade-out animation
function fcCloseModal() {
  if (modalOverlay.classList.contains("closing")) return; // avoid double click

  modalOverlay.classList.add("closing");

  modalOverlay.addEventListener("animationend", function handler(e) {
    if (e.animationName === "fadeOut") {
      modalOverlay.style.display = "none";
      modalOverlay.classList.remove("show", "closing");
      modalOverlay.removeEventListener("animationend", handler);
    }
  });
}

// Redirect logic after choosing role
function fcGoToPage(role) {
  const name = document.getElementById("fcUserName").value.trim();
  if (!name) {
    alert("Please enter your name first!");
    return;
  }

  // naam sirf session ke liye (reload pe clear ho jayega)
  sessionStorage.setItem("username", name);

  if (role === "owner") {
    window.location.href = "pet-owner-home.html";
  } 
  else if (role === "vet") {
    window.location.href = "veterinarian.html";
  } 
  else if (role === "shelter") {
    window.location.href = "animal-shelter.html";
  } 
  else {
    alert("Invalid selection!");
  }
}













// navbar  toggler button 

const navToggler = document.getElementById('navToggler');
const menu = document.querySelector('.menu');

navToggler.addEventListener('click', (e) => {
  e.stopPropagation();
  menu.classList.toggle('show');
});

// Close menu on outside click
document.addEventListener('click', (e) => {
  if (
    menu.classList.contains('show') &&
    !menu.contains(e.target) &&
    e.target !== navToggler
  ) {
    menu.classList.remove('show');
  }
});

// Handle link clicks
menu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', (e) => {
    const parentLi = link.parentElement;
    const hasDropdown = parentLi.querySelector('.dropdown');

    if (hasDropdown) {
      // Agar is link ke andar dropdown hai toh menu close mat karo
      e.preventDefault(); 
      // optional: yaha tum dropdown toggle karne ka code likh sakte ho
    } else {
      // Normal link → menu band kar do
      menu.classList.remove('show');
    }
  });
});









window.addEventListener('load', () => {
  const overlay = document.getElementById('pageOverlay');

  // fade out overlay
  overlay.style.opacity = 0;

  // remove overlay after transition
  setTimeout(() => {
    overlay.style.display = 'none';
  }, 1000); // 1s matches CSS transition
});





// Animations   

// Overlay fade-out + home page animation
window.addEventListener('load', () => {
  const overlay = document.getElementById('pageOverlay');
  overlay.style.opacity = 0;

  setTimeout(() => overlay.style.display = 'none', 1000);

  // Animate elements already in viewport (home page)
  const animElems = document.querySelectorAll('.animate');
  animElems.forEach(el => {
    const rect = el.getBoundingClientRect();
    if(rect.top < window.innerHeight) { // visible on load
      el.classList.add('active');
    }
  });
});















//  Loader 


const overlay = document.getElementById('loadingOverlay');

// Page reload hone par dikhana
window.addEventListener('beforeunload', () => {
  overlay.classList.add('show');
});

// Page load hone par chhupana
window.addEventListener('load', () => {
  overlay.classList.remove('show');
});

// Agar internet chala jaye
window.addEventListener('offline', () => {
  overlay.querySelector('p').textContent = "No Internet Connection...";
  overlay.classList.add('show');
});

// Dubara internet aa jaye
window.addEventListener('online', () => {
  overlay.querySelector('p').textContent = "Loading...";
  setTimeout(() => overlay.classList.remove('show'), 500);
});