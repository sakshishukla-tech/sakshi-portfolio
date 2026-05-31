/* ==========================================
   Sakshi Shukla Premium Freelancer Portfolio
   Core JavaScript Engine & UI Interactions
   ========================================== */

document.addEventListener("DOMContentLoaded", () => {

  // Initialize all modular scripts
  initFilterSystem();
  initPopupGallery();
  initScrollReveal();
  initImageFallbackEngine();
  initStitchSimulator();
  initDesktopSimulator();

});

/* ==========================================
   1. FILTER SYSTEM
   ========================================== */
function initFilterSystem() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const assetCards = document.querySelectorAll(".asset-card");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Manage active state of filter buttons
      filterBtns.forEach((button) => {
        button.classList.remove("active");
      });
      btn.classList.add("active");

      const filterValue = btn.dataset.filter;

      // Filter cards by category class
      assetCards.forEach((card) => {
        if (filterValue === "all" || card.classList.contains(filterValue)) {
          card.classList.remove("hide");
        } else {
          card.classList.add("hide");
        }
      });
    });
  });
}

/* ==========================================
   2. DYNAMIC POPUP GALLERY
   ========================================== */
function initPopupGallery() {
  const assetCards = document.querySelectorAll(".asset-card");
  const popupGallery = document.querySelector(".popup-gallery");
  const popupImg = document.querySelector(".popup-img");
  const closeBtn = document.querySelector(".close-btn");
  const prevBtn = document.querySelector(".prev-btn");
  const nextBtn = document.querySelector(".next-btn");

  let currentIndex = 0;

  // Helper to show the image associated with a card
  function showImage(card) {
    if (!card) return;
    const img = card.querySelector("img");
    if (img) {
      popupImg.src = img.src;
      popupImg.alt = img.alt || "Creative Asset";
    }
  }

  // Open Popup when Card Container is clicked (fixes z-index overlay bug)
  assetCards.forEach((card) => {
    card.addEventListener("click", () => {
      // Find all currently visible (non-filtered) cards
      const visibleCards = Array.from(assetCards).filter(c => !c.classList.contains("hide"));
      currentIndex = visibleCards.indexOf(card);

      if (currentIndex !== -1) {
        showImage(visibleCards[currentIndex]);
        popupGallery.classList.add("active");
      }
    });
  });

  // Cycle to NEXT image (filtered navigation)
  function navigateNext() {
    const visibleCards = Array.from(assetCards).filter(c => !c.classList.contains("hide"));
    if (visibleCards.length === 0) return;

    currentIndex = (currentIndex + 1) % visibleCards.length;
    showImage(visibleCards[currentIndex]);
  }

  // Cycle to PREVIOUS image (filtered navigation)
  function navigatePrev() {
    const visibleCards = Array.from(assetCards).filter(c => !c.classList.contains("hide"));
    if (visibleCards.length === 0) return;

    currentIndex = (currentIndex - 1 + visibleCards.length) % visibleCards.length;
    showImage(visibleCards[currentIndex]);
  }

  // Click Event Listeners
  nextBtn.addEventListener("click", navigateNext);
  prevBtn.addEventListener("click", navigatePrev);

  // Close Popup Actions
  closeBtn.addEventListener("click", () => {
    popupGallery.classList.remove("active");
  });

  // Close when clicking outside on the background overlay
  popupGallery.addEventListener("click", (e) => {
    if (e.target === popupGallery) {
      popupGallery.classList.remove("active");
    }
  });

  // Keyboard navigation & escape close support
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      popupGallery.classList.remove("active");
    }

    // Arrow keys only cycle when gallery modal is open
    if (popupGallery.classList.contains("active")) {
      if (e.key === "ArrowRight") {
        navigateNext();
      } else if (e.key === "ArrowLeft") {
        navigatePrev();
      }
    }
  });
}

/* ==========================================
   3. SCROLL REVEAL ANIMATIONS
   ========================================== */
function initScrollReveal() {
  const revealElements = document.querySelectorAll(".reveal");

  function revealOnScroll() {
    const triggerBottom = window.innerHeight * 0.85;

    revealElements.forEach((el) => {
      const boxTop = el.getBoundingClientRect().top;
      if (boxTop < triggerBottom) {
        el.classList.add("show");
      }
    });
  }

  // Run on scroll
  window.addEventListener("scroll", revealOnScroll);

  // Run initially once to reveal items in viewport
  revealOnScroll();
}

/* ==========================================
   4. AUTOMATED PREMIUM SVG FALLBACK ENGINE
   ========================================== */
function initImageFallbackEngine() {
  const allImages = document.querySelectorAll("img");

  function triggerSvgFallback(img) {
    // Avoid recursion loops
    if (img.dataset.fallbackTriggered) return;
    img.dataset.fallbackTriggered = "true";

    const altText = img.alt || "Creative Asset Showcase";

    // Detect card category by querying CSS classes of the parent
    const card = img.closest(".asset-card");
    let category = "default";
    if (card) {
      if (card.classList.contains("branding")) category = "branding";
      else if (card.classList.contains("social")) category = "social";
      else if (card.classList.contains("mockup")) category = "mockup";
      else if (card.classList.contains("print")) category = "print";
    }

    // Set gorgeous metallic color palettes & design icons per category
    const configs = {
      branding: {
        colors: ["#c084fc", "#6366f1"], // Violet -> Indigo
        theme: "BRAND IDENTITY",
        icon: `<polygon points="200,130 250,215 150,215" fill="none" stroke="white" stroke-width="2.5" stroke-linejoin="round" opacity="0.85"/>
               <circle cx="200" cy="175" r="20" fill="none" stroke="white" stroke-width="2" opacity="0.6"/>
               <circle cx="200" cy="175" r="6" fill="white" opacity="0.9"/>`
      },
      social: {
        colors: ["#38bdf8", "#0369a1"], // Cyan -> Sapphire
        theme: "SOCIAL MEDIA DESIGN",
        icon: `<circle cx="200" cy="170" r="32" fill="none" stroke="white" stroke-width="2.5" opacity="0.8"/>
               <circle cx="200" cy="170" r="18" fill="none" stroke="white" stroke-width="1.5" opacity="0.5"/>
               <line x1="200" y1="135" x2="200" y2="205" stroke="white" stroke-width="2" opacity="0.7"/>
               <line x1="165" y1="170" x2="235" y2="170" stroke="white" stroke-width="2" opacity="0.7"/>`
      },
      mockup: {
        colors: ["#fbbf24", "#b45309"], // Gold -> Warm Bronze
        theme: "BRAND MOCKUP SERIES",
        icon: `<polygon points="200,130 245,155 245,205 200,230 155,205 155,155" fill="none" stroke="white" stroke-width="2.5" stroke-linejoin="round" opacity="0.85"/>
               <line x1="200" y1="130" x2="200" y2="230" stroke="white" stroke-width="2" opacity="0.7"/>
               <line x1="200" y1="180" x2="245" y2="155" stroke="white" stroke-width="2" opacity="0.7"/>
               <line x1="200" y1="180" x2="155" y2="155" stroke="white" stroke-width="2" opacity="0.7"/>`
      },
      print: {
        colors: ["#34d399", "#047857"], // Emerald -> Forest Green
        theme: "PRINT COLLATERAL",
        icon: `<rect x="165" y="145" width="55" height="65" rx="4" fill="none" stroke="white" stroke-width="2.5" transform="rotate(-10 200 170)" opacity="0.85"/>
               <rect x="180" y="135" width="55" height="65" rx="4" fill="none" stroke="white" stroke-width="1.5" transform="rotate(10 200 170)" opacity="0.6"/>
               <line x1="180" y1="175" x2="220" y2="175" stroke="white" stroke-width="1.5" transform="rotate(-10 200 170)" opacity="0.7"/>
               <line x1="180" y1="190" x2="210" y2="190" stroke="white" stroke-width="1.5" transform="rotate(-10 200 170)" opacity="0.7"/>`
      },
      default: {
        colors: ["#a855f7", "#ec4899"], // Purple -> Pink
        theme: "PREMIUM STUDIO ASSET",
        icon: `<polygon points="200,130 212,165 247,165 218,187 229,222 200,200 171,222 182,187 153,165 188,165" fill="none" stroke="white" stroke-width="2.5" stroke-linejoin="round" opacity="0.85"/>`
      }
    };

    const config = configs[category];

    // Format title
    let displayTitle = altText.trim();
    if (displayTitle.length > 32) {
      displayTitle = displayTitle.slice(0, 29) + "...";
    }

    // Build the high-resolution vector SVG template
    const svg = `
      <svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600" style="background:#090d16;">
        <defs>
          <radialGradient id="centerGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" style="stop-color:${config.colors[0]};stop-opacity:0.25" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:0" />
          </radialGradient>
          <linearGradient id="borderGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#ffffff;stop-opacity:0.18" />
            <stop offset="50%" style="stop-color:#ffffff;stop-opacity:0.02" />
            <stop offset="100%" style="stop-color:${config.colors[0]};stop-opacity:0.25" />
          </linearGradient>
        </defs>

        <!-- Dynamic Dark Luxe Background & Ambient Center Glow -->
        <rect width="100%" height="100%" fill="#070a13" />
        <rect width="100%" height="100%" fill="url(#centerGlow)" />

        <!-- Luxury Geometric Grid Pattern Overlay -->
        <path d="M 0,30 L 600,30 M 0,60 L 600,60 M 0,90 L 600,90 M 0,120 L 600,120 M 0,150 L 600,150 M 0,180 L 600,180 M 0,210 L 600,210 M 0,240 L 600,240 M 0,270 L 600,270 M 0,300 L 600,300 M 0,330 L 600,330 M 0,360 L 600,360 M 0,390 L 600,390 M 0,420 L 600,420 M 0,450 L 600,450 M 0,480 L 600,480 M 0,510 L 600,510 M 0,540 L 600,540 M 0,570 L 600,570" fill="none" stroke="rgba(255,255,255,0.015)" stroke-width="1" />
        <path d="M 30,0 L 30,600 M 60,0 L 60,600 M 90,0 L 90,600 M 120,0 L 120,600 M 150,0 L 150,600 M 180,0 L 180,600 M 210,0 L 210,600 M 240,0 L 240,600 M 270,0 L 270,600 M 300,0 L 300,600 M 330,0 L 330,600 M 360,0 L 360,600 M 390,0 L 390,600 M 420,0 L 420,600 M 450,0 L 450,600 M 480,0 L 480,600 M 510,0 L 510,600 M 540,0 L 540,600 M 570,0 L 570,600" fill="none" stroke="rgba(255,255,255,0.015)" stroke-width="1" />

        <!-- Fine Dual-Frame Inset Border -->
        <rect x="25" y="25" width="550" height="550" rx="20" fill="none" stroke="url(#borderGrad)" stroke-width="1.5" />
        <rect x="35" y="35" width="530" height="530" rx="16" fill="none" stroke="rgba(255,255,255,0.02)" stroke-width="0.75" />

        <!-- Creative Wireframe Orbits -->
        <circle cx="300" cy="240" r="75" fill="none" stroke="${config.colors[0]}" stroke-width="0.5" stroke-dasharray="4 8" opacity="0.3" />
        <circle cx="300" cy="240" r="90" fill="none" stroke="${config.colors[1]}" stroke-width="0.5" stroke-dasharray="16 4" opacity="0.2" />

        <!-- Dynamic Visual Icon -->
        <g transform="translate(100, 70)">
          ${config.icon}
        </g>

        <!-- Category Capsule Badge -->
        <rect x="180" y="390" width="240" height="28" rx="14" fill="rgba(255,255,255,0.03)" stroke="rgba(255,255,255,0.06)" stroke-width="1" />
        <text x="300" y="408" font-family="'Poppins', 'Inter', sans-serif" font-weight="600" font-size="10" fill="${config.colors[0]}" text-anchor="middle" letter-spacing="3">
          ${config.theme}
        </text>

        <!-- High-Contrast Showcase Title -->
        <text x="300" y="465" font-family="'Poppins', 'Inter', sans-serif" font-weight="700" font-size="20" fill="#ffffff" text-anchor="middle" letter-spacing="1">
          ${displayTitle.toUpperCase()}
        </text>

        <!-- Studio Signature Subtitle -->
        <text x="300" y="500" font-family="'Poppins', 'Inter', sans-serif" font-weight="400" font-size="11" fill="rgba(255,255,255,0.35)" text-anchor="middle" letter-spacing="4">
          SS CREATIVE STUDIO
        </text>
        
        <!-- Elegant Bottom Accent -->
        <line x1="260" y1="535" x2="340" y2="535" stroke="rgba(255,255,255,0.08)" stroke-width="1" />
        <circle cx="300" cy="535" r="3" fill="${config.colors[0]}" />
      </svg>
    `;

    // Safe Base64 encoding
    try {
      const svgBase64 = btoa(unescape(encodeURIComponent(svg)));
      img.src = `data:image/svg+xml;base64,${svgBase64}`;
    } catch (err) {
      console.error("Fallback generator failed for image:", img, err);
    }
  }

  // Intercept loading failures using capturing phase on window for robust coverage
  window.addEventListener("error", (e) => {
    if (e.target && e.target.tagName === "IMG") {
      triggerSvgFallback(e.target);
    }
  }, true);

  // Proactively check for any images that failed before script initialized
  allImages.forEach((img) => {
    if (img.complete && img.naturalWidth === 0) {
      triggerSvgFallback(img);
    }
  });
}

/* ==========================================
   5. GOOGLE STITCH SMARTPHONE SIMULATOR ENGINE
   ========================================== */
function initStitchSimulator() {
  const toggleBtns = document.querySelectorAll(".sim-toggle-btn");
  const screenMockup = document.querySelector(".screen-mockup");
  const screenSimulator = document.querySelector(".screen-simulator");
  const stageSplash = document.querySelector(".stage-splash");
  const stageDashboard = document.querySelector(".stage-dashboard");
  const progressBar = document.getElementById("sim-progress-bar");
  const progressPercent = document.getElementById("sim-progress-percent");
  const heartsContainer = document.querySelector(".splash-hearts-container");
  const restartBtn = document.getElementById("sim-restart");
  const cartCountEl = document.getElementById("sim-cart-count");
  const cartBadge = document.querySelector(".sim-cart-badge");
  const toastEl = document.getElementById("sim-toast");
  const productCards = document.querySelectorAll(".sim-product-card");
  const catPills = document.querySelectorAll(".cat-pill");

  let loaderInterval = null;
  let heartInterval = null;
  let currentProgress = 0;
  let virtualCart = 0;
  let hasLoadedOnce = false;

  // Toggle modes (Static Mockup vs Live Simulator)
  toggleBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      toggleBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const selectedMode = btn.dataset.mode;

      if (selectedMode === "mockup") {
        screenMockup.classList.add("active");
        screenSimulator.classList.remove("active");
        stopSimulator();
      } else {
        screenMockup.classList.remove("active");
        screenSimulator.classList.add("active");
        startSimulator();
      }
    });
  });

  // Start the simulated loading process
  function startSimulator() {
    stopSimulator(); // reset clean slate

    stageSplash.classList.add("active");
    stageDashboard.classList.remove("active");
    currentProgress = 0;
    progressBar.style.width = "0%";
    progressPercent.textContent = "0%";

    // Start Spawning Floating Hearts Particles
    startSpawningHearts();

    // Loader interval (loads from 0% to 100% in 2.8 seconds)
    loaderInterval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 8) + 3;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(loaderInterval);
        setTimeout(transitionToDashboard, 600); // smooth transition delay
      }
      progressBar.style.width = `${currentProgress}%`;
      progressPercent.textContent = `${currentProgress}%`;
    }, 100);
  }

  // Stop intervals
  function stopSimulator() {
    if (loaderInterval) clearInterval(loaderInterval);
    if (heartInterval) clearInterval(heartInterval);
    if (heartsContainer) heartsContainer.innerHTML = "";
  }

  // Spawning delicate rose floating heart particles
  function startSpawningHearts() {
    if (!heartsContainer) return;
    heartsContainer.innerHTML = "";

    // Spawn a heart every 400ms
    heartInterval = setInterval(() => {
      const heart = document.createElement("i");
      heart.className = "ri-heart-fill floating-heart-particle";
      
      // Random physics variations
      const leftOffset = Math.random() * 100; // random horizontal spawn coordinate
      const driftValue = (Math.random() * 60) - 30; // random drift direction
      const scaleValue = (Math.random() * 0.6) + 0.5; // random size
      const durationValue = (Math.random() * 3) + 4; // random floating speed

      heart.style.left = `${leftOffset}%`;
      heart.style.setProperty("--drift", `${driftValue}px`);
      heart.style.animationDuration = `${durationValue}s`;
      heart.style.transform = `scale(${scaleValue})`;

      heartsContainer.appendChild(heart);

      // Clean up particle from DOM once animation finishes
      setTimeout(() => {
        heart.remove();
      }, durationValue * 1000);
    }, 450);
  }

  // Transition from Splash loading screen to interactive Dashboard
  function transitionToDashboard() {
    stopSimulator();
    
    stageSplash.classList.remove("active");
    stageDashboard.classList.add("active");
    hasLoadedOnce = true;
  }

  // Reset simulator (click home/restart inside app)
  if (restartBtn) {
    restartBtn.addEventListener("click", () => {
      virtualCart = 0;
      cartCountEl.textContent = "0";
      startSimulator();
    });
  }

  // Add Pastry to Basket Interactivity
  const addToCartBtns = document.querySelectorAll(".add-to-cart-btn");
  addToCartBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const productName = btn.dataset.name || "Pastry";
      virtualCart++;
      
      // Update count & trigger pop scale bounce animation
      cartCountEl.textContent = virtualCart;
      cartBadge.style.animation = "none";
      setTimeout(() => {
        cartBadge.style.animation = "popScale 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      }, 10);

      // Trigger glassmorphic toast notification
      showToast(`${productName} added to basket! 🥐`);
    });
  });

  // Helper to show the toast inside simulator
  function showToast(message) {
    if (!toastEl) return;
    toastEl.textContent = message;
    toastEl.classList.add("show");
    
    // Auto-dismiss toast
    setTimeout(() => {
      toastEl.classList.remove("show");
    }, 1800);
  }

  // Categories Filter inside the app menu
  catPills.forEach((pill) => {
    pill.addEventListener("click", () => {
      catPills.forEach(p => p.classList.remove("active"));
      pill.classList.add("active");

      const filterVal = pill.textContent.trim().toLowerCase();

      productCards.forEach((card) => {
        const title = card.querySelector("h6").textContent.trim().toLowerCase();
        
        if (filterVal === "all") {
          card.style.display = "flex";
        } else if (filterVal === "cakes" && (title.includes("cupcake") || title.includes("cake"))) {
          card.style.display = "flex";
        } else if (filterVal === "macarons" && title.includes("macaron")) {
          card.style.display = "flex";
        } else if (filterVal === "croissants" && (title.includes("croissant") || title.includes("éclair") || title.includes("eclair"))) {
          // Croissants is bakery pastries
          card.style.display = "flex";
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

/* ==========================================================================
   6. DELICIOUS TEMPTATIONS 4U DESKTOP SIMULATOR ENGINE
   ========================================================================== */
function initDesktopSimulator() {
  // Selector targets
  const backBtn = document.getElementById("dt-back-btn");
  const forwardBtn = document.getElementById("dt-forward-btn");
  const reloadBtn = document.getElementById("dt-reload-btn");
  const urlLoader = document.getElementById("address-loader");
  const browserUrl = document.getElementById("browser-url");
  const viewport = document.getElementById("browser-viewport");

  const searchIcon = document.getElementById("dt-search-icon");
  const searchWidget = document.getElementById("dt-search-widget");
  const searchInput = document.getElementById("dt-search-input");
  const searchSubmit = document.getElementById("dt-search-submit");
  const searchSuggestions = document.querySelectorAll(".search-suggestions span");

  const heartIcon = document.getElementById("dt-heart-icon");
  const wishlistDot = document.getElementById("dt-wishlist-dot");

  const cartIcon = document.getElementById("dt-cart-icon");
  const cartWidget = document.getElementById("dt-cart-widget");
  const cartBadgeCount = document.getElementById("dt-cart-badge-count");
  const cartItemsContainer = document.getElementById("dt-cart-items");
  const cartTotalPrice = document.getElementById("dt-cart-total-price");
  const clearCartBtn = document.getElementById("dt-clear-cart");
  const checkoutBtn = document.getElementById("dt-checkout-btn");

  const orderNowBtn = document.getElementById("dt-order-now-btn");
  const viewMenuBtn = document.getElementById("dt-view-menu-btn");
  const orderModal = document.getElementById("dt-order-modal");
  const closeOrderModalBtn = document.getElementById("dt-close-order-modal");
  const cancelOrderBtn = document.getElementById("dt-cancel-order");
  const submitOrderBtn = document.getElementById("dt-submit-order");

  const itemSelect = document.getElementById("dt-item-select");
  const itemQty = document.getElementById("dt-item-qty");
  const orderName = document.getElementById("dt-order-name");
  const orderPhone = document.getElementById("dt-order-phone");
  const orderAddress = document.getElementById("dt-order-address");

  const whatsappFab = document.getElementById("dt-whatsapp-fab");
  const whatsappWidget = document.getElementById("dt-whatsapp-widget");
  const closeWhatsappBtn = document.getElementById("dt-close-whatsapp");
  const whatsappInput = document.getElementById("dt-whatsapp-input");
  const whatsappSendBtn = document.getElementById("dt-whatsapp-send");
  const whatsappChatBody = document.getElementById("dt-whatsapp-chat-body");

  // Virtual State
  let cartData = [];
  let isWishlisted = false;

  // Helper: Portfolio level toast message inside browser simulator
  function showSimulatedToast(message, isSuccess = true) {
    const toast = document.createElement("div");
    toast.style.position = "absolute";
    toast.style.bottom = "20px";
    toast.style.right = "20px";
    toast.style.background = isSuccess ? "rgba(219, 39, 119, 0.95)" : "rgba(225, 29, 72, 0.95)";
    toast.style.color = "#fff";
    toast.style.padding = "10px 20px";
    toast.style.borderRadius = "30px";
    toast.style.fontSize = "12px";
    toast.style.fontWeight = "600";
    toast.style.boxShadow = "0 8px 20px rgba(0,0,0,0.15)";
    toast.style.zIndex = "1000";
    toast.style.backdropFilter = "blur(10px)";
    toast.style.transition = "all 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
    toast.style.opacity = "0";
    toast.style.transform = "translateY(20px)";
    
    viewport.appendChild(toast);
    toast.textContent = message;

    // Trigger transition
    setTimeout(() => {
      toast.style.opacity = "1";
      toast.style.transform = "translateY(0)";
    }, 50);

    // Dismiss toast
    setTimeout(() => {
      toast.style.opacity = "0";
      toast.style.transform = "translateY(20px)";
      setTimeout(() => {
        toast.remove();
      }, 300);
    }, 2500);
  }

  // Helper: Trigger Address Bar Loading Line
  function triggerUrlLoad(callback) {
    urlLoader.style.width = "0%";
    let width = 0;
    const interval = setInterval(() => {
      width += Math.floor(Math.random() * 25) + 15;
      if (width >= 100) {
        width = 100;
        clearInterval(interval);
        setTimeout(() => {
          urlLoader.style.width = "0%";
          if (callback) callback();
        }, 300);
      }
      urlLoader.style.width = `${width}%`;
    }, 100);
  }

  // Address controls
  reloadBtn.addEventListener("click", () => {
    triggerUrlLoad(() => {
      // Close all widgets & modals
      searchWidget.classList.remove("active");
      cartWidget.classList.remove("active");
      whatsappWidget.classList.remove("active");
      orderModal.classList.remove("active");
      
      // Reset simulator values
      cartData = [];
      isWishlisted = false;
      wishlistDot.style.display = "none";
      updateCartDisplay();
      showSimulatedToast("Page reloaded successfully! 🥐");
    });
  });

  backBtn.addEventListener("click", () => {
    showSimulatedToast("History back action is simulated!");
  });

  forwardBtn.addEventListener("click", () => {
    showSimulatedToast("History forward action is simulated!");
  });

  // Website Nav link interaction
  const simNavLinks = document.querySelectorAll(".sim-web-nav a");
  simNavLinks.forEach(link => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      
      const targetHash = link.getAttribute("href");
      simNavLinks.forEach(l => l.classList.remove("active"));
      link.classList.add("active");

      // Update Address Bar URL
      browserUrl.textContent = `https://www.delicioustemptations4u.com/${targetHash.replace('#dt-', '')}`;

      triggerUrlLoad(() => {
        showSimulatedToast(`Simulated navigation to: ${link.textContent} section!`);
      });
    });
  });

  // Search Widget Logic
  searchIcon.addEventListener("click", () => {
    searchWidget.classList.toggle("active");
    if (searchWidget.classList.contains("active")) {
      searchInput.focus();
      cartWidget.classList.remove("active");
    }
  });

  function performSearch() {
    const query = searchInput.value.trim();
    if (query) {
      triggerUrlLoad(() => {
        showSimulatedToast(`Found results for "${query}"! 🍰`);
        searchWidget.classList.remove("active");
        searchInput.value = "";
      });
    }
  }

  searchSubmit.addEventListener("click", performSearch);
  searchInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") performSearch();
  });

  searchSuggestions.forEach(suggestion => {
    suggestion.addEventListener("click", () => {
      searchInput.value = suggestion.textContent;
      performSearch();
    });
  });

  // Wishlist Toggle
  heartIcon.addEventListener("click", () => {
    isWishlisted = !isWishlisted;
    if (isWishlisted) {
      wishlistDot.style.display = "block";
      showSimulatedToast("Added brand to wishlist! ❤️");
    } else {
      wishlistDot.style.display = "none";
      showSimulatedToast("Removed brand from wishlist.");
    }
  });

  // Cart Widget Toggle
  cartIcon.addEventListener("click", () => {
    cartWidget.classList.toggle("active");
    if (cartWidget.classList.contains("active")) {
      searchWidget.classList.remove("active");
    }
  });

  // Cart logic & updates
  function updateCartDisplay() {
    // badge count
    const totalQty = cartData.reduce((acc, curr) => acc + curr.qty, 0);
    cartBadgeCount.textContent = totalQty;

    // content rows
    cartItemsContainer.innerHTML = "";
    if (cartData.length === 0) {
      cartItemsContainer.innerHTML = `<p class="empty-cart-message">Your basket is empty. Place an order now!</p>`;
      cartTotalPrice.textContent = "$0.00";
    } else {
      let grandTotal = 0;
      cartData.forEach((item) => {
        const subtotal = item.qty * item.price;
        grandTotal += subtotal;

        const row = document.createElement("div");
        row.className = "cart-item-row";
        row.innerHTML = `
          <div class="cart-item-info">
            <span class="cart-item-name">${item.name}</span>
            <span class="cart-item-qty">Qty: ${item.qty}</span>
          </div>
          <span class="cart-item-subtotal">$${subtotal.toFixed(2)}</span>
        `;
        cartItemsContainer.appendChild(row);
      });
      cartTotalPrice.textContent = `$${grandTotal.toFixed(2)}`;
    }
  }

  // Clear Cart
  clearCartBtn.addEventListener("click", () => {
    if (cartData.length > 0) {
      cartData = [];
      updateCartDisplay();
      showSimulatedToast("Shopping basket cleared.");
    }
  });

  // Checkout Cart
  checkoutBtn.addEventListener("click", () => {
    if (cartData.length === 0) {
      showSimulatedToast("Add items to basket before checking out!", false);
      return;
    }

    triggerUrlLoad(() => {
      showSimulatedToast("Checkout Simulated! Order has been processed. 🥐🎉");
      cartData = [];
      updateCartDisplay();
      cartWidget.classList.remove("active");
    });
  });

  // Order Now Form Modal Actions
  orderNowBtn.addEventListener("click", () => {
    orderModal.classList.add("active");
  });

  // Hero View Menu button
  viewMenuBtn.addEventListener("click", () => {
    triggerUrlLoad(() => {
      // Simulate switching to menu tab
      const menuLink = document.querySelector('a[href="#dt-menu"]');
      if (menuLink) {
        menuLink.click();
      }
    });
  });

  function closeModal() {
    orderModal.classList.remove("active");
    orderName.value = "";
    orderPhone.value = "";
    orderAddress.value = "";
  }

  closeOrderModalBtn.addEventListener("click", closeModal);
  cancelOrderBtn.addEventListener("click", closeModal);

  submitOrderBtn.addEventListener("click", () => {
    const name = orderName.value.trim();
    const phone = orderPhone.value.trim();
    const address = orderAddress.value.trim();
    const selectedItem = itemSelect.value;
    const selectedQty = parseInt(itemQty.value) || 1;
    const selectedPrice = parseFloat(itemSelect.options[itemSelect.selectedIndex].getAttribute("data-price"));

    if (!name || !phone || !address) {
      showSimulatedToast("Please fill in name, phone, and delivery address!", false);
      return;
    }

    // Add to cart data
    const existingIndex = cartData.findIndex(item => item.name === selectedItem);
    if (existingIndex !== -1) {
      cartData[existingIndex].qty += selectedQty;
    } else {
      cartData.push({
        name: selectedItem,
        qty: selectedQty,
        price: selectedPrice
      });
    }

    updateCartDisplay();
    closeModal();
    showSimulatedToast(`Success! ${selectedQty}x ${selectedItem} added to basket. 🍩`);
  });

  // WhatsApp Widget Interactions
  whatsappFab.addEventListener("click", () => {
    whatsappWidget.classList.toggle("active");
    // Clear notification badge
    const badge = whatsappFab.querySelector(".whatsapp-badge");
    if (badge) badge.style.display = "none";
  });

  closeWhatsappBtn.addEventListener("click", () => {
    whatsappWidget.classList.remove("active");
  });

  function handleSendWhatsappMessage() {
    const text = whatsappInput.value.trim();
    if (!text) return;

    // Append user message
    const userMsg = document.createElement("div");
    userMsg.className = "chat-message user";
    userMsg.innerHTML = `
      <p>${text}</p>
      <span class="message-time">Just now</span>
    `;
    whatsappChatBody.appendChild(userMsg);
    whatsappInput.value = "";
    whatsappChatBody.scrollTop = whatsappChatBody.scrollHeight;

    // Trigger auto response
    setTimeout(() => {
      const replyMsg = document.createElement("div");
      replyMsg.className = "chat-message agent";
      
      let replyText = "Thank you for reaching out! Chef Sakshi is currently in the kitchen crafting fresh delights. We will contact you soon! 🍰🍪";
      
      const lowerText = text.toLowerCase();
      if (lowerText.includes("menu") || lowerText.includes("price") || lowerText.includes("cost")) {
        replyText = "Our menu is full of gourmet delicacies! Parisian Macarons ($14.90), Butter Croissants ($5.20), and Royal Cupcakes ($8.50). You can order them directly using the 'Order Now' button inside this browser! 🥐🧁";
      } else if (lowerText.includes("hello") || lowerText.includes("hi") || lowerText.includes("hey")) {
        replyText = "Hi there! Welcome to Delicious Temptations 4U. Would you like to place a custom order or inquire about our daily special menu? 🎂✨";
      } else if (lowerText.includes("special") || lowerText.includes("today")) {
        replyText = "Today's special is 'Le Saint Honoré' – a Parisian classic caramelized puff pastry! Highly recommended! 🍮✨";
      } else if (lowerText.includes("contact") || lowerText.includes("phone") || lowerText.includes("number")) {
        replyText = "You can contact Sakshi directly at +91 7657890856 or email us at sakshishukla85277@gmail.com! 📧📞";
      }

      replyMsg.innerHTML = `
        <p>${replyText}</p>
        <span class="message-time">Just now</span>
      `;
      whatsappChatBody.appendChild(replyMsg);
      whatsappChatBody.scrollTop = whatsappChatBody.scrollHeight;
      
      // Make a light sound or pop effect
      showSimulatedToast("New WhatsApp reply received! 💬");
    }, 1200);
  }

  whatsappSendBtn.addEventListener("click", handleSendWhatsappMessage);
  whatsappInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") handleSendWhatsappMessage();
  });
}


