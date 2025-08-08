// Mobile Navigation
const hamburger = document.querySelector(".hamburger")
const navMenu = document.querySelector(".nav-menu")

hamburger.addEventListener("click", () => {
  hamburger.classList.toggle("active")
  navMenu.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((n) =>
  n.addEventListener("click", () => {
    hamburger.classList.remove("active")
    navMenu.classList.remove("active")
  }),
)

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Particles animation
function createParticles() {
  const particlesContainer = document.getElementById("particles")
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"
    particle.style.animationDelay = Math.random() * 6 + "s"
    particle.style.animationDuration = Math.random() * 3 + 3 + "s"
    particlesContainer.appendChild(particle)
  }
}

// Animated counters
function animateCounters() {
  const counters = document.querySelectorAll(".stat-number")

  counters.forEach((counter) => {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const increment = target / 100
    let current = 0

    const updateCounter = () => {
      if (current < target) {
        current += increment
        counter.textContent = Math.ceil(current)
        setTimeout(updateCounter, 20)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  })
}

// Skill bars animation
function animateSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")

  skillBars.forEach((bar) => {
    const width = bar.getAttribute("data-width")
    bar.style.width = width
  })
}

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("animate")

      // Trigger specific animations
      if (entry.target.classList.contains("about")) {
        animateCounters()
      }

      if (entry.target.classList.contains("skills")) {
        setTimeout(animateSkillBars, 500)
      }
    }
  })
}, observerOptions)

// Observe elements for animation
document.querySelectorAll(".about, .experience, .skills, .education, .projects, .contact").forEach((section) => {
  observer.observe(section)
})

// Navbar background on scroll
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar")
  if (window.scrollY > 100) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)"
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)"
  }
})

// Active navigation link
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })
})

// Contact form handling
document.getElementById("contactForm").addEventListener("submit", function (e) {
  e.preventDefault()

  // Get form data
  const formData = new FormData(this)
  const name = formData.get("name")
  const email = formData.get("email")
  const subject = formData.get("subject")
  const message = formData.get("message")

  // Simple validation
  if (!name || !email || !subject || !message) {
    alert("Please fill in all fields")
    return
  }

  // Simulate form submission
  const submitBtn = this.querySelector('button[type="submit"]')
  const originalText = submitBtn.textContent

  submitBtn.textContent = "Sending..."
  submitBtn.disabled = true

  setTimeout(() => {
    alert("Thank you for your message! I will get back to you soon.")
    this.reset()
    submitBtn.textContent = originalText
    submitBtn.disabled = false
  }, 2000)
})

// Typing effect for hero subtitle
function typeWriter(element, text, speed = 100) {
  let i = 0
  element.textContent = ""

  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i)
      i++
      setTimeout(type, speed)
    }
  }

  type()
}

// Initialize animations when page loads
window.addEventListener("load", () => {
  createParticles()

  // Typing effect for hero subtitle
  const heroSubtitle = document.querySelector(".hero-subtitle")
  if (heroSubtitle) {
    const originalText = heroSubtitle.textContent
    setTimeout(() => {
      typeWriter(heroSubtitle, originalText, 100)
    }, 1000)
  }

  // Add loading screen
  const loadingScreen = document.createElement("div")
  loadingScreen.innerHTML = `
    <div style="
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: var(--bg-primary);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 9999;
        flex-direction: column;
    ">
        <div style="
            width: 50px;
            height: 50px;
            border: 3px solid var(--border-color);
            border-top: 3px solid var(--primary-color);
            border-radius: 50%;
            animation: spin 1s linear infinite;
        "></div>
        <p style="
            color: var(--primary-color);
            margin-top: 20px;
            font-family: 'Orbitron', monospace;
        ">Loading...</p>
    </div>
  `;

  document.body.appendChild(loadingScreen)

  // Remove loading screen after delay
  setTimeout(() => {
    loadingScreen.style.opacity = "0"
    loadingScreen.style.transition = "opacity 0.5s ease"
    setTimeout(() => {
      loadingScreen.remove()
    }, 500)
  }, 1500)
})

// Add spin animation for loading
const style = document.createElement("style")
style.textContent = `
    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
    
    .nav-link.active {
        color: var(--primary-color) !important;
    }
    
    .nav-link.active::after {
        width: 100% !important;
    }
    
    .animate {
        animation: fadeInUp 0.8s ease forwards;
    }
    
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(30px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`
document.head.appendChild(style)

// Parallax effect for hero section
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const parallax = document.querySelector(".hero-background")
  const speed = scrolled * 0.5

  if (parallax) {
    parallax.style.transform = `translateY(${speed}px)`
  }
})

// Add glitch effect on hover for project items
document.querySelectorAll(".project-item").forEach((item) => {
  item.addEventListener("mouseenter", function () {
    this.style.animation = "glitch 0.3s ease-in-out"
  })

  item.addEventListener("mouseleave", function () {
    this.style.animation = ""
  })
})

// Random tech stack animation delays
document.querySelectorAll(".tech-item").forEach((item, index) => {
  item.style.animationDelay = `${Math.random() * 2}s`
})
