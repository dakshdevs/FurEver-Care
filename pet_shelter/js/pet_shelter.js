
  const searchIcon = document.getElementById("searchIcon");
  const searchOverlay = document.getElementById("searchOverlay");
  const closeSearch = document.getElementById("closeSearch");
  const searchInput = document.getElementById("searchInput");
  const searchBtn = document.getElementById("searchBtn");
  const suggestionsBox = document.getElementById("suggestions");

  // ✅ Search keywords + synonyms
  const searchMap = {
    "home": "#homesection",
    "about": "#about",
    "pets": "#petadoption",
    "events": "#events",
    "stories": "#stories",
    "contact": "#contact"
    
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
    // Agar click search-content ya suggestions ke andar hua → ignore
    if (
      e.target.closest(".search-content") || 
      e.target.closest("#suggestions")
    ) {
      return;
    }

    // Agar click search icon pe hua → ignore (open/close ka apna logic chalega)
    if (e.target === searchIcon) {
      return;
    }

    // Baki kahin bhi click hote hi → overlay close
    searchOverlay.style.display = "none";
    searchInput.value = "";
    suggestionsBox.innerHTML = "";
  }
});




function chooseOption(role) {
    const name = document.getElementById('overlayName').value.trim();
    if (!name) {
        alert('Please enter your name first!');
        return;
    }

    // Save name in localStorage (taake baad ke pages par bhi use ho sake)
    localStorage.setItem('username', name);

    // Redirect user to respective page
    if (role === "petOwner") {
        window.location.href = "pet-owner-home.html";
    } 
    else if (role === "veterinarian") {
        window.location.href = "veterinarian.html";
    } 
    else if (role === "animalShelter") {
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








 // Tab Switching
  const tabBtns = document.querySelectorAll(".tab-btn");
  const contents = document.querySelectorAll(".feeding-content");

  tabBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      tabBtns.forEach(b => b.classList.remove("active"));
      contents.forEach(c => c.classList.remove("active"));

      btn.classList.add("active");
      document.getElementById(btn.dataset.tab).classList.add("active");
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