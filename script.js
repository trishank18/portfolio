document.addEventListener("DOMContentLoaded", () => {
  const githubUsername = "trishank18";
  const loadingScreen = document.getElementById("loadingScreen");
  const navToggle = document.getElementById("navToggle");
  const navLinks = document.getElementById("navLinks");
  const themeToggle = document.getElementById("themeToggle");
  const scrollTopBtn = document.getElementById("scrollTop");
  const typingText = document.getElementById("typingText");
  const resumeDownload = document.getElementById("resumeDownload");
  const counters = document.querySelectorAll(".counter");
  const filterButtons = document.querySelectorAll(".filter-btn[data-filter]");
  const projectCards = document.querySelectorAll(".project-card[data-category]");
  const form = document.querySelector(".contact-form");
  const formNote = document.getElementById("formNote");
  const sections = document.querySelectorAll("main section[id]");
  const navAnchorLinks = document.querySelectorAll(".nav-links a");
  const repoGrid = document.getElementById("repoGrid");
  const repoSearch = document.getElementById("repoSearch");
  const repoFilters = document.getElementById("repoFilters");
  const repoCount = document.getElementById("repoCount");
  const followerCount = document.getElementById("followerCount");
  const starCount = document.getElementById("starCount");
  const languageCount = document.getElementById("languageCount");
  const languageBars = document.getElementById("languageBars");
  const cursorDot = document.querySelector(".cursor-dot");
  const cursorRing = document.querySelector(".cursor-ring");
  const typingRoles = ["Data Science Student", "Full Stack Developer", "IoT Enthusiast", "Machine Learning Developer"];
  const resumeText = [
    "Mukkamalla Subramanya Trishank Reddy",
    "Location: Jammalamadugu, Andhra Pradesh, India",
    "Email: trishanktrishank787@gmail.com",
    "Phone: +91 7075356362",
    "Highlights: Data Science, ML, IoT, Full Stack Development"
  ].join("\n");
  const featuredRepositories = [
    {
      name: "MedConnect",
      category: "iot",
      tech: ["PHP", "MySQL", "HTML", "CSS", "JavaScript", "IoT"],
      description: "IoT-based healthcare monitoring system with real-time patient monitoring, ESP32 integration, doctor-patient authentication, predictive analytics, and healthcare dashboard visualization.",
      demoUrl: "https://medconect.kesug.com"
    },
    {
      name: "Food Delivery Full Stack",
      category: "web",
      tech: ["JavaScript", "Full Stack Development"],
      description: "Responsive full-stack food delivery web application with modern UI and interactive features."
    },
    {
      name: "Music Player Service",
      category: "app",
      tech: ["Swift"],
      description: "Music player application with playlist management and modern audio controls."
    },
    {
      name: "DIWALI SALES ANALYSIS",
      category: "data",
      tech: ["Python", "Jupyter Notebook", "Data Analysis"],
      description: "Data analytics project analyzing Diwali sales trends using visualization and data preprocessing techniques."
    },
    {
      name: "MittsuThreads Online Clothing Store",
      category: "web",
      tech: ["JavaScript", "E-commerce"],
      description: "Online clothing store with responsive UI, product catalog, cart functionality, and stylish design."
    },
    {
      name: "Spotify Clone",
      category: "web",
      tech: ["JavaScript", "HTML", "CSS"],
      description: "Spotify-inspired music streaming frontend clone with responsive interface and modern design."
    },
    {
      name: "Student Team Management Application",
      category: "app",
      tech: ["JavaScript"],
      description: "Web-based student team management system for organizing teams, members, and activities."
    },
    {
      name: "Snake Game",
      category: "app",
      tech: ["Python", "Jupyter Notebook"],
      description: "Interactive snake game with score tracking and gameplay logic implementation."
    },
    {
      name: "Hotel Management System",
      category: "app",
      tech: ["Java"],
      description: "Hotel management desktop application for room booking, customer management, and billing."
    }
  ];

  const cardSelector = ".glass-card, .skill-card, .project-card, .cert-card, .timeline-card, .contact-card, .profile-card, .repo-card, .github-profile-card, .github-mini-stat, .github-visual-card";

  if (window.AOS) {
    AOS.init({ duration: 800, once: true, offset: 80 });
  }

  window.addEventListener("load", () => {
    if (!loadingScreen) return;
    setTimeout(() => {
      loadingScreen.style.opacity = "0";
      loadingScreen.style.pointerEvents = "none";
      setTimeout(() => loadingScreen.remove(), 350);
    }, 450);
  });

  const savedTheme = localStorage.getItem("portfolio-theme");
  if (savedTheme === "light") {
    document.body.classList.add("light");
  }
  updateThemeIcon();

  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light");
    localStorage.setItem("portfolio-theme", document.body.classList.contains("light") ? "light" : "dark");
    updateThemeIcon();
  });

  function updateThemeIcon() {
    const icon = themeToggle.querySelector("i");
    icon.className = document.body.classList.contains("light") ? "fa-solid fa-sun" : "fa-solid fa-moon";
  }

  navToggle.addEventListener("click", () => {
    const expanded = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!expanded));
    navLinks.classList.toggle("open");
  });

  navAnchorLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  resumeDownload.addEventListener("click", (event) => {
    event.preventDefault();
    const anchor = document.createElement("a");
    anchor.href = "assets/documents/Cv.pdf";
    anchor.download = "Mukkamalla_Subramanya_Trishank_Reddy_Resume.pdf";
    document.body.appendChild(anchor);
    anchor.click();
    anchor.remove();
  });

  const typeWriter = (() => {
    let roleIndex = 0;
    let charIndex = 0;
    let deleting = false;

    const tick = () => {
      const currentRole = typingRoles[roleIndex];
      typingText.textContent = currentRole.slice(0, deleting ? charIndex-- : charIndex++);

      if (!deleting && charIndex > currentRole.length) {
        deleting = true;
        return setTimeout(tick, 1100);
      }

      if (deleting && charIndex < 0) {
        deleting = false;
        roleIndex = (roleIndex + 1) % typingRoles.length;
        charIndex = 0;
      }

      setTimeout(tick, deleting ? 55 : 90);
    };

    return tick;
  })();
  typeWriter();

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("in-view");
      }
    });
  }, { threshold: 0.25 });

  const observeCards = (scope = document) => {
    scope.querySelectorAll(cardSelector).forEach((card) => observer.observe(card));
  };
  observeCards();

  let countersAnimated = false;
  const countUp = () => {
    if (countersAnimated) return;
    const heroSection = document.querySelector(".hero");
    if (!heroSection) return;
    const rect = heroSection.getBoundingClientRect();

    if (rect.top < window.innerHeight * 0.8) {
      countersAnimated = true;
      counters.forEach((counter) => {
        const target = Number(counter.dataset.target);
        const duration = 1400;
        const start = performance.now();

        const animate = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          counter.textContent = target >= 100 ? `${Math.floor(eased * target)}+` : Math.floor(eased * target);
          if (progress < 1) requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);
      });
    }
  };
  countUp();
  window.addEventListener("scroll", countUp, { passive: true });

  filterButtons.forEach((button) => {
    button.addEventListener("click", () => {
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      button.classList.add("active");
      const filter = button.dataset.filter;

      projectCards.forEach((card) => {
        const show = filter === "all" || card.dataset.category === filter;
        card.classList.toggle("hidden", !show);
      });
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    formNote.textContent = "Thanks for reaching out. This demo form is ready to connect with a backend or email service.";
    form.reset();
  });

  const onScroll = () => {
    scrollTopBtn.classList.toggle("visible", window.scrollY > 500);

    let currentSection = "";
    sections.forEach((section) => {
      const top = section.offsetTop - 120;
      if (window.scrollY >= top) {
        currentSection = section.id;
      }
    });

    navAnchorLinks.forEach((link) => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentSection}`);
    });
  };

  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  scrollTopBtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

  const canvas = document.getElementById("particleCanvas");
  const context = canvas.getContext("2d");

  const resizeCanvas = () => {
    canvas.width = window.innerWidth * window.devicePixelRatio;
    canvas.height = window.innerHeight * window.devicePixelRatio;
    canvas.style.width = `${window.innerWidth}px`;
    canvas.style.height = `${window.innerHeight}px`;
    context.setTransform(window.devicePixelRatio, 0, 0, window.devicePixelRatio, 0, 0);
  };

  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  const particles = Array.from({ length: 60 }, () => createParticle());

  function createParticle() {
    return {
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      radius: 1 + Math.random() * 2.4,
      speedX: (-0.35 + Math.random() * 0.7) * 0.4,
      speedY: (-0.35 + Math.random() * 0.7) * 0.4,
      alpha: 0.2 + Math.random() * 0.45
    };
  }

  const renderParticles = () => {
    context.clearRect(0, 0, window.innerWidth, window.innerHeight);
    particles.forEach((particle) => {
      particle.x += particle.speedX;
      particle.y += particle.speedY;

      if (particle.x < -20) particle.x = window.innerWidth + 20;
      if (particle.x > window.innerWidth + 20) particle.x = -20;
      if (particle.y < -20) particle.y = window.innerHeight + 20;
      if (particle.y > window.innerHeight + 20) particle.y = -20;

      context.beginPath();
      context.fillStyle = `rgba(109, 124, 255, ${particle.alpha})`;
      context.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
      context.fill();
    });

    requestAnimationFrame(renderParticles);
  };

  renderParticles();

  const finePointer = window.matchMedia("(pointer: fine)").matches;
  if (finePointer && cursorDot && cursorRing) {
    document.body.classList.add("has-cursor");
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let ringX = mouseX;
    let ringY = mouseY;

    const updateCursor = () => {
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      cursorDot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      cursorRing.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%, -50%)`;

      requestAnimationFrame(updateCursor);
    };

    document.addEventListener("pointermove", (event) => {
      mouseX = event.clientX;
      mouseY = event.clientY;
    });

    document.querySelectorAll("a, button, input, textarea, .project-card, .repo-card, .profile-card").forEach((element) => {
      element.addEventListener("mouseenter", () => document.body.classList.add("cursor-active"));
      element.addEventListener("mouseleave", () => document.body.classList.remove("cursor-active"));
    });

    updateCursor();
  }

  const normalizeKey = (value) => value.toLowerCase().replace(/[^a-z0-9]+/g, "");
  let repoState = {
    filter: "all",
    search: "",
    featured: featuredRepositories.map((repository) => ({ ...repository, stars: 0, forks: 0, language: "", repoUrl: "https://github.com/trishank18?tab=repositories" }))
  };

  function renderLanguageBars(languages) {
    if (!languageBars) return;

    const total = languages.reduce((sum, item) => sum + item.bytes, 0) || 1;
    languageBars.innerHTML = languages.length
      ? languages.map((item) => {
          const percent = Math.max(8, Math.round((item.bytes / total) * 100));
          return `<span class="language-pill"><strong>${item.name}</strong> ${percent}%</span>`;
        }).join("")
      : '<span class="language-pill">GitHub data loading...</span>';
  }

  function renderRepositoryCards() {
    if (!repoGrid) return;

    const term = repoState.search.trim().toLowerCase();
    const repos = repoState.featured.filter((repository) => {
      const matchesFilter = repoState.filter === "all" || repository.category === repoState.filter;
      const searchable = [repository.name, repository.description, repository.language, repository.tech.join(" ")].join(" ").toLowerCase();
      const matchesSearch = !term || searchable.includes(term);
      return matchesFilter && matchesSearch;
    });

    repoGrid.innerHTML = repos.length
      ? repos.map((repository) => `
        <article class="repo-card glass-card" data-repo-category="${repository.category}">
          <div class="repo-top">
            <div>
              <p class="project-badge">${repository.category.toUpperCase()}</p>
              <h3>${repository.name}</h3>
            </div>
            <a class="btn btn-secondary btn-sm" href="${repository.repoUrl}" target="_blank" rel="noreferrer">GitHub</a>
          </div>
          <p>${repository.description}</p>
          <div class="repo-badges">${repository.tech.map((tech) => `<span>${tech}</span>`).join("")}</div>
          <div class="repo-meta">
            <div class="repo-stats">
              <span><i class="fa-solid fa-star"></i> ${repository.stars}</span>
              <span><i class="fa-solid fa-code-branch"></i> ${repository.forks}</span>
              <span><i class="fa-solid fa-layer-group"></i> ${repository.language || "Featured"}</span>
            </div>
          </div>
          <div class="repo-footer">
            <div class="repo-actions">
              <a class="btn btn-primary btn-sm" href="${repository.repoUrl}" target="_blank" rel="noreferrer">GitHub</a>
              <a class="btn btn-secondary btn-sm" href="${repository.demoUrl || '#contact'}" ${repository.demoUrl ? 'target="_blank" rel="noreferrer"' : ''}>Live Demo</a>
            </div>
          </div>
        </article>
      `).join("")
      : '<article class="repo-card glass-card"><h3>No repositories matched your search.</h3><p>Try another technology or clear the filters to see all featured work.</p></article>';

    observeCards(repoGrid);
  }

  function updateGithubSummary(user, repositories) {
    const totalStars = repositories.reduce((sum, repository) => sum + (repository.stargazers_count || 0), 0);
    const languages = new Set(repositories.map((repository) => repository.language).filter(Boolean));

    if (repoCount) repoCount.textContent = user.public_repos ?? repositories.length;
    if (followerCount) followerCount.textContent = user.followers ?? 0;
    if (starCount) starCount.textContent = totalStars;
    if (languageCount) languageCount.textContent = languages.size;
  }

  async function aggregateLanguages(repositories) {
    const languageEntries = await Promise.all(
      repositories
        .filter((repository) => repository.languages_url)
        .slice(0, 8)
        .map(async (repository) => {
          const response = await fetch(repository.languages_url);
          return response.ok ? response.json() : {};
        })
    );

    const totals = new Map();
    languageEntries.forEach((entry) => {
      Object.entries(entry).forEach(([name, bytes]) => {
        totals.set(name, (totals.get(name) || 0) + bytes);
      });
    });

    return [...totals.entries()]
      .map(([name, bytes]) => ({ name, bytes }))
      .sort((left, right) => right.bytes - left.bytes)
      .slice(0, 6);
  }

  function syncFeaturedRepositories(repositories) {
    repoState.featured = featuredRepositories.map((repository) => {
      const normalizedName = normalizeKey(repository.name);
      const match = repositories.find((item) => normalizeKey(item.name).includes(normalizedName) || normalizedName.includes(normalizeKey(item.name)));

      return {
        ...repository,
        stars: match ? match.stargazers_count : 0,
        forks: match ? match.forks_count : 0,
        language: match?.language || repository.tech[0],
        repoUrl: match?.html_url || `https://github.com/${githubUsername}?tab=repositories`
      };
    });
  }

  async function loadGithubPortfolio() {
    if (!repoGrid) return;

    repoGrid.innerHTML = '<article class="repo-card glass-card"><h3>Loading GitHub repositories...</h3><p>Fetching live repository data and contribution metrics.</p></article>';

    try {
      const [userResponse, repositoriesResponse] = await Promise.all([
        fetch(`https://api.github.com/users/${githubUsername}`),
        fetch(`https://api.github.com/users/${githubUsername}/repos?per_page=100&sort=updated`)
      ]);

      if (!userResponse.ok || !repositoriesResponse.ok) {
        throw new Error("GitHub API request failed");
      }

      const user = await userResponse.json();
      const repositories = await repositoriesResponse.json();
      const sortedRepositories = [...repositories].sort((left, right) => right.stargazers_count - left.stargazers_count);

      updateGithubSummary(user, repositories);
      syncFeaturedRepositories(sortedRepositories);

      const languages = await aggregateLanguages(sortedRepositories);
      renderLanguageBars(languages);
      renderRepositoryCards();
    } catch (error) {
      syncFeaturedRepositories([]);
      renderLanguageBars([]);
      renderRepositoryCards();
    }
  }

  repoSearch.addEventListener("input", (event) => {
    repoState.search = event.target.value;
    renderRepositoryCards();
  });

  repoFilters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-repo-filter]");
    if (!button) return;

    repoFilters.querySelectorAll(".filter-btn").forEach((filterButton) => filterButton.classList.remove("active"));
    button.classList.add("active");
    repoState.filter = button.dataset.repoFilter;
    renderRepositoryCards();
  });

  loadGithubPortfolio();
});