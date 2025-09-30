document.addEventListener("DOMContentLoaded", function () {
  // Initialiser AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-in-out",
    once: false,
  });

  // Animation de la Navbar au scroll
  const navbar = document.querySelector(".glass-nav");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (lastScrollY < window.scrollY) {
      navbar.style.transform = "translateY(-100%)";
    } else {
      navbar.style.transform = "translateY(0)";
    }
    lastScrollY = window.scrollY;

    // Ajouter une ombre après un certain scroll
    if (window.scrollY > 50) {
      navbar.style.boxShadow = "0 4px 30px rgba(0, 0, 0, 0.2)";
    } else {
      navbar.style.boxShadow = "none";
    }
  });

  // Animation des liens de navigation
  const navLinks = document.querySelectorAll(".nav-link");
  navLinks.forEach((link) => {
    link.addEventListener("mouseenter", () => {
      gsap.to(link, {
        scale: 1.05,
        duration: 0.3,
      });
    });
    link.addEventListener("mouseleave", () => {
      gsap.to(link, {
        scale: 1,
        duration: 0.3,
      });
    });
  });

  // Menu hamburger
  const hamburger = document.querySelector(".hamburger");
  const navLinksContainer = document.querySelector(".nav-links");

  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("active");
    navLinksContainer.classList.toggle("active");
  });

  // Effet de parallaxe pour la section hero
  const heroImage = document.querySelector(".hero-image");
  if (heroImage) {
    window.addEventListener("mousemove", (e) => {
      const x = (window.innerWidth - e.pageX) / 50;
      const y = (window.innerHeight - e.pageY) / 50;
      heroImage.style.transform = `translate(${x}px, ${y}px)`;
    });
  }

  // Matrix Effect
  const matrixCanvas = document.getElementById("matrixCanvas");
  if (matrixCanvas) {
    matrixCanvas.width = window.innerWidth;
    matrixCanvas.height = window.innerHeight;

    const nom = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%^&*()*&^%";

    const alphabet = nom;

    const fontSize = 16;
    const columns = matrixCanvas.width / fontSize;

    const rainDrops = [];

    for (let x = 0; x < columns; x++) {
      rainDrops[x] = 1;
    }

    const draw = () => {
      const ctx = matrixCanvas.getContext("2d");
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, matrixCanvas.width, matrixCanvas.height);

      ctx.fillStyle = "#0F0";
      ctx.font = fontSize + "px monospace";

      for (let i = 0; i < rainDrops.length; i++) {
        const text = alphabet.charAt(
          Math.floor(Math.random() * alphabet.length)
        );
        ctx.fillText(text, i * fontSize, rainDrops[i] * fontSize);

        if (
          rainDrops[i] * fontSize > matrixCanvas.height &&
          Math.random() > 0.975
        ) {
          rainDrops[i] = 0;
        }
        rainDrops[i]++;
      }
    };

    setInterval(draw, 30);
  }

  // Custom Cursor
  const cursor = document.createElement("div");
  cursor.classList.add("custom-cursor");
  document.body.appendChild(cursor);

  document.addEventListener("mousemove", (e) => {
    cursor.style.left = e.clientX + "px";
    cursor.style.top = e.clientY + "px";

    setTimeout(() => {
      cursorFollower.style.left = e.clientX + "px";
      cursorFollower.style.top = e.clientY + "px";
    }, 100);
  });

  document.querySelectorAll("a, button, .project-card").forEach((el) => {
    el.addEventListener("mouseenter", () => {
      cursor.classList.add("active");
      cursorFollower.classList.add("active");
    });
    el.addEventListener("mouseleave", () => {
      cursor.classList.remove("active");
      cursorFollower.classList.remove("active");
    });
  });

  // Radar Chart
  const radarCtx = document.getElementById("radarChart");
  if (radarCtx) {
    new Chart(radarCtx, {
      type: "radar",
      data: {
        labels: ["JavaScript", "HTML", "CSS", "Java", "C++", "Python"],
        datasets: [
          {
            label: "Compétences",
            data: [70, 80, 80, 55, 35, 90],
            backgroundColor: "rgba(110, 69, 226, 0.2)",
            borderColor: "rgba(110, 69, 226, 1)",
            pointBackgroundColor: "rgba(136, 211, 206, 1)",
            pointBorderColor: "#fff",
            pointHoverRadius: 6,
            pointRadius: 4,
            borderWidth: 2,
          },
        ],
      },
      options: {
        scales: {
          r: {
            angleLines: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            grid: {
              color: "rgba(255, 255, 255, 0.1)",
            },
            suggestedMin: 0,
            suggestedMax: 100,
            pointLabels: {
              color: "#e0e0e0",
              font: {
                size: 12,
              },
            },
            ticks: {
              display: false,
              beginAtZero: true,
            },
          },
        },
        plugins: {
          legend: {
            labels: {
              color: "#e0e0e0",
              font: {
                size: 14,
              },
            },
          },
        },
      },
    });
  }
});
 

  // Transition fluide entre sections
  const links = document.querySelectorAll('a[href^="#"]');
  const transition = document.createElement("div");
  transition.classList.add("section-transition");
  document.body.appendChild(transition);

  links.forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      if (targetId === "#") return;

      e.preventDefault();

      const target = document.querySelector(targetId);
      if (!target) return;

      transition.classList.add("active");

      setTimeout(() => {
        window.scrollTo({
          top: target.offsetTop,
          behavior: "smooth",
        });
      }, 100);

      setTimeout(() => {
        transition.classList.remove("active");
      }, 800);
    });
  });

  // Mise à jour des points de navigation spatiale
  const spaceDots = document.querySelectorAll(".space-dot");

  function updateSpaceNav() {
    const scrollPosition = window.scrollY;

    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      const sectionHeight = section.offsetHeight;
      const sectionId = section.getAttribute("id");

      if (
        scrollPosition >= sectionTop &&
        scrollPosition < sectionTop + sectionHeight
      ) {
        spaceDots.forEach((dot) => {
          dot.classList.remove("active");
          if (dot.getAttribute("href") === `#${sectionId}`) {
            dot.classList.add("active");
          }
        });
      }
    });
  }

  window.addEventListener("scroll", updateSpaceNav);
  updateSpaceNav();

  // Mise à jour de l'année dans le footer
  const yearElement = document.getElementById("year");
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }

  // Chargement personnalisé
  const loader = document.querySelector(".loader");
  if (loader) {
    const spheres = document.querySelectorAll(".loader-sphere");

    // Animation des sphères
    gsap.to(spheres, {
      duration: 2,
      scale: 1.5,
      opacity: 0.7,
      yoyo: true,
      repeat: -1,
      stagger: 0.2,
      ease: "sine.inOut",
    });

    // Cacher le loader quand tout est chargé
    window.addEventListener("load", () => {
      gsap.to(loader, {
        duration: 0.8,
        opacity: 0,
        onComplete: () => {
          loader.style.display = "none";
        },
      });
    });
  }

// Animation des barres de compétences principales
function animateMainSkills() {
    const skillBars = document.querySelectorAll('.skills-list .bar');
    
    skillBars.forEach((bar, index) => {
        // Réinitialiser à 0
        bar.style.width = '0';
        
        // Animer avec un délai progressif
        setTimeout(() => {
            const width = bar.getAttribute('data-width') || bar.style.width;
            bar.style.width = width;
        }, 300 + index * 200);
    });
}

// Animation des barres de compétences dans la modal
function animateSkillsModalBars() {
    const skillBars = skillsModal.querySelectorAll('.bar');
    
    // Réinitialiser toutes les barres à 0
    skillBars.forEach(bar => {
        bar.style.width = '0';
    });
    
    // Animer chaque barre avec un délai progressif
    skillBars.forEach((bar, index) => {
        setTimeout(() => {
            const width = bar.getAttribute('data-width') || bar.style.width;
            bar.style.width = width;
        }, 200 + index * 150);
    });
}

// Initialiser les largeurs des barres au chargement
document.addEventListener('DOMContentLoaded', function() {
    // Stocker les largeurs originales pour les barres principales
    const mainSkillBars = document.querySelectorAll('.skills-list .bar');
    mainSkillBars.forEach(bar => {
        const width = bar.style.width;
        bar.setAttribute('data-width', width);
        bar.style.width = '0';
    });
});

// Gestion de la modal des compétences supplémentaires
const skillsModal = document.getElementById("skillsModal");
const showMoreSkillsBtn = document.getElementById("showMoreSkillsBtn");
const closeSkillsModal = skillsModal.querySelector(".close-modal");

// Ouvrir la modal
showMoreSkillsBtn.addEventListener('click', () => {
    skillsModal.style.display = 'block';
    document.body.style.overflow = 'hidden';
    
    // Lancer l'animation après un court délai pour que la modal soit visible
    setTimeout(() => {
        animateSkillsModalBars();
    }, 100);
});

// Fermer la modal
closeSkillsModal.addEventListener('click', () => {
    skillsModal.style.display = 'none';
    document.body.style.overflow = 'auto';
});

// Fermer en cliquant à l'extérieur
window.addEventListener('click', (e) => {
    if (e.target === skillsModal) {
        skillsModal.style.display = 'none';
        document.body.style.overflow = 'auto';
    }
});



// Effet de parallaxe avancé
const parallaxElements = document.querySelectorAll("[data-parallax]");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  parallaxElements.forEach((el) => {
    const speed = parseFloat(el.getAttribute("data-parallax"));
    const offset = scrollY * speed;

    gsap.to(el, {
      y: offset,
      ease: "none",
    });
  });
});

// Données des projets
const projectsData = [
  {
    title: "Projet...",
    tech: "HTML/CSS",
    description:
      "Ce projet est une réalisation personnelle qui démontre mes compétences en développement front-end. J'ai créé une interface utilisateur moderne et réactive en utilisant les dernières technologies web.",
    details: [
      "Design responsive adapté à tous les appareils",
      "Animations CSS personnalisées",
      "Optimisation des performances",
      "Code propre et bien documenté",
    ],
    image: "/images/project1.jpg",
    link: "#",
  },
  {
    title: "Site BST79",
    tech: "Wordpress",
    description:
      "Site web développé avec Wordpress pour un client local. Le site présente les services de l'entreprise et permet aux clients de prendre rendez-vous en ligne.",
    details: [
      "Thème personnalisé développé sur mesure",
      "Intégration de formulaire de contact",
      "Optimisation SEO",
      "Backoffice personnalisé pour le client",
    ],
    image: "/images/project2.jpg",
    link: "#",
  },
  {
    title: "Site Web Créatif",
    tech: "HTML/CSS, JavaScript",
    description:
      "Un site web avec des effets visuels avancés et des interactions utilisateur uniques. Ce projet montre ma capacité à créer des expériences web innovantes.",
    details: [
      "Effets de parallaxe avancés",
      "Animations GSAP",
      "Mode sombre/clair",
      "Design original et créatif",
    ],
    image: "/images/project3.jpg",
    link: "#",
  },
  {
    title: "Application Web",
    tech: "React, Node.js",
    description:
      "Application web complète avec frontend en React et backend en Node.js. Cette application permet aux utilisateurs de gérer leurs tâches quotidiennes.",
    details: [
      "Authentification utilisateur",
      "Base de données MongoDB",
      "API RESTful",
      "Interface drag-and-drop",
    ],
    image: "/images/project4.jpg",
    link: "#",
  },
  {
    title: "Jeu en Ligne",
    tech: "JavaScript, Canvas",
    description:
      "Jeu développé en pur JavaScript utilisant l'API Canvas. Un projet amusant qui montre mes compétences en programmation algorithmique.",
    details: [
      "Moteur de jeu personnalisé",
      "Effets visuels optimisés",
      "Système de score en ligne",
      "Contrôles tactiles pour mobile",
    ],
    image: "/images/project5.jpg",
    link: "#",
  },
  {
    title: "Dashboard Admin",
    tech: "Vue.js, Firebase",
    description:
      "Tableau de bord administratif pour gérer les utilisateurs et le contenu d'une application web. Développé avec Vue.js et connecté à Firebase.",
    details: [
      "Visualisation de données en temps réel",
      "Gestion des utilisateurs",
      "Export de données en CSV",
      "Notifications en temps réel",
    ],
    image: "/images/project6.jpg",
    link: "#",
  },
];

// Modal pour les projets
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalProjectTitle");
const modalTech = document.getElementById("modalProjectTech");
const modalDescription = document.getElementById("modalProjectDescription");
const modalDetails = document.getElementById("modalProjectDetails");
const modalImage = document.getElementById("modalProjectImage");
const modalLink = document.getElementById("modalProjectLink");
const closeModal = document.querySelector(".close-modal");

// Ouvrir la modal
document.querySelectorAll(".project-card .btn-small").forEach((btn, index) => {
  btn.addEventListener("click", (e) => {
    e.preventDefault();
    const project = projectsData[index];
    showProjectModal(project);
  });
});

// Fonction pour afficher la modal
function showProjectModal(project) {
  modalTitle.textContent = project.title;
  modalTech.textContent = `Technologies: ${project.tech}`;
  modalDescription.textContent = project.description;
  modalImage.src = project.image;
  modalImage.alt = project.title;
  modalLink.href = project.link;

  // Effacer les détails précédents
  modalDetails.innerHTML = "";

  // Ajouter les nouveaux détails
  project.details.forEach((detail) => {
    const li = document.createElement("li");
    li.textContent = detail;
    modalDetails.appendChild(li);
  });

  // Afficher la modal
  modal.style.display = "block";
  document.body.style.overflow = "hidden";
}

// Fermer la modal
closeModal.addEventListener("click", () => {
  modal.style.display = "none";
  document.body.style.overflow = "auto";
});

// Fermer la modal en cliquant à l'extérieur
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }
});

// Charger plus de projets
const loadMoreBtn = document.getElementById("loadMoreBtn");
const showLessBtn = document.getElementById("showLessBtn");
const moreProjectsSection = document.getElementById("moreProjects");
const moreProjectsGrid = moreProjectsSection.querySelector(".projects-grid");

loadMoreBtn.addEventListener("click", () => {
  // Afficher les projets supplémentaires
  moreProjectsSection.style.display = "block";

  // Remplir avec les projets supplémentaires (index 3 à 5)
  moreProjectsGrid.innerHTML = "";
  for (let i = 3; i < projectsData.length; i++) {
    const project = projectsData[i];
    const projectCard = createProjectCard(project, i);
    moreProjectsGrid.appendChild(projectCard);
  }

  // Cacher le bouton "Voir plus"
  loadMoreBtn.style.display = "none";
});

showLessBtn.addEventListener("click", () => {
  // Cacher les projets supplémentaires
  moreProjectsSection.style.display = "none";

  // Afficher le bouton "Voir plus"
  loadMoreBtn.style.display = "inline-block";
});

// Fonction pour créer une carte de projet
function createProjectCard(project, index) {
  const card = document.createElement("div");
  card.className = "project-card hologram";
  card.setAttribute("data-aos", "fade-up");
  card.setAttribute("data-aos-delay", ((index % 3) + 2) * 100);

  card.innerHTML = `
            <div class="hologram-content">
                <h3>${project.title}</h3>
                <p>Technologies: ${project.tech}</p>
                <a href="#" class="btn btn-small">Voir plus</a>
            </div>
            <div class="hologram-light"></div>
            <div class="hologram-grid"></div>
        `;

  // Ajouter l'événement click au nouveau bouton "Voir plus"
  card.querySelector(".btn-small").addEventListener("click", (e) => {
    e.preventDefault();
    showProjectModal(project);
  });

  return card;
}
showLessBtn.addEventListener("click", () => {
  // Animation pour faire disparaître les projets
  gsap.to(moreProjectsSection, {
    duration: 0.7,
    opacity: 0,
    height: 0,
    padding: 0,
    margin: 0,
    ease: "power2.inOut",
    onComplete: () => {
      moreProjectsSection.style.display = "none";
      // Réinitialiser les styles après l'animation
      gsap.set(moreProjectsSection, {
        clearProps: "all",
      });
    },
  });

  // Animation du bouton "Voir plus" qui réapparaît
  gsap.fromTo(
    loadMoreBtn,
    { opacity: 0, y: 20, scale: 0.8 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.5,
      delay: 0.4,
      ease: "back.out(1.7)",
    }
  );
  loadMoreBtn.style.display = "inline-block";
});

// Ajoutez cette fonction pour animer le background
function animateBackground() {
    const background = document.querySelector('.matrix-grid');
    if (background) {
        gsap.to(background, {
            duration: 30,
            backgroundPosition: '200px 200px',
            repeat: -1,
            ease: 'none',
            yoyo: true
        });
    }
}

// Gestion du responsive
function handleResponsive() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Désactiver certains effets sur mobile
    if (screenWidth <= 768) {
        // Désactiver le parallaxe sur mobile
        if (heroImage) {
            heroImage.style.transform = 'none';
        }
        
        // Simplifier les animations
        AOS.init({
            duration: 400,
            once: true
        });
    } else {
        // Réactiver pour les grands écrans
        AOS.init({
            duration: 800,
            once: false
        });
    }
    
    // Ajuster le canvas Matrix pour les petits écrans
    if (matrixCanvas) {
        matrixCanvas.width = screenWidth;
        matrixCanvas.height = Math.min(screenHeight, 800);
    }
}

// Écouter le redimensionnement
window.addEventListener('resize', handleResponsive);
window.addEventListener('load', handleResponsive);

// Appeler une fois au chargement
handleResponsive();

// Gestion du responsive améliorée
function handleResponsive() {
    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;
    
    // Désactiver certains effets sur mobile
    if (screenWidth <= 767) {
        // Désactiver le parallaxe sur mobile
        if (heroImage) {
            heroImage.style.transform = 'none';
            window.removeEventListener('mousemove', parallaxHandler);
        }
        
        // Désactiver le curseur personnalisé
        if (cursor) cursor.style.display = 'none';
        if (cursorFollower) cursorFollower.style.display = 'none';
        
        // Simplifier AOS
        AOS.init({
            duration: 400,
            once: true,
            disable: function() {
                return screenWidth <= 767;
            }
        });
        
        // Ajuster le canvas Matrix
        if (matrixCanvas) {
            matrixCanvas.style.display = 'none';
        }
        
    } else {
        // Réactiver pour les grands écrans
        if (heroImage) {
            window.addEventListener('mousemove', parallaxHandler);
        }
        
        if (cursor) cursor.style.display = 'block';
        if (cursorFollower) cursorFollower.style.display = 'block';
        
        AOS.init({
            duration: 800,
            once: false
        });
        
        if (matrixCanvas) {
            matrixCanvas.style.display = 'block';
            matrixCanvas.width = screenWidth;
            matrixCanvas.height = Math.min(screenHeight, 800);
        }
    }
    
    // Gestion spécifique pour les très petits écrans
    if (screenWidth <= 480) {
        document.body.classList.add('mobile-small');
    } else {
        document.body.classList.remove('mobile-small');
    }
    
    // Gestion de l'orientation paysage
    if (screenHeight <= 500 && screenWidth <= 767) {
        document.body.classList.add('landscape-mobile');
    } else {
        document.body.classList.remove('landscape-mobile');
    }
}

// Handler pour le parallaxe
function parallaxHandler(e) {
    if (window.innerWidth > 767 && heroImage) {
        const x = (window.innerWidth - e.pageX) / 50;
        const y = (window.innerHeight - e.pageY) / 50;
        heroImage.style.transform = `translate(${x}px, ${y}px)`;
    }
}

// Réinitialiser au redimensionnement
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(handleResponsive, 250);
});

// Gestion du menu hamburger améliorée
hamburger.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinksContainer.classList.toggle('active');
    
    // Empêcher le scroll quand le menu est ouvert
    if (navLinksContainer.classList.contains('active')) {
        document.body.style.overflow = 'hidden';
    } else {
        document.body.style.overflow = 'auto';
    }
});

// Fermer le menu en cliquant sur un lien
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        if (window.innerWidth <= 767) {
            hamburger.classList.remove('active');
            navLinksContainer.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
});

function updateSpaceNav() {
    const scrollPosition = window.scrollY;

    document.querySelectorAll("section").forEach((section) => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute("id");

        if (
            scrollPosition >= sectionTop &&
            scrollPosition < sectionTop + sectionHeight
        ) {
            spaceDots.forEach((dot) => {
                dot.classList.remove("active");
                if (dot.getAttribute("href") === `#${sectionId}`) {
                    dot.classList.add("active");
                }
            });
        }
    });
}

// Animation des cartes veille au scroll
function animateVeilleCards() {
    const veilleCards = document.querySelectorAll('.veille-card');
    
    veilleCards.forEach((card, index) => {
        const cardTop = card.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (cardTop < windowHeight - 100) {
            setTimeout(() => {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }, index * 200);
        }
    });
}

// Initialiser l'animation
document.addEventListener('DOMContentLoaded', function() {
    const veilleCards = document.querySelectorAll('.veille-card');
    veilleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
    });
    
    window.addEventListener('scroll', animateVeilleCards);
    animateVeilleCards(); // Appeler une fois au chargement
});