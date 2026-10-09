const menuToggle = document.getElementById("menuToggle");
const navMenu = document.querySelector(".nav-menu");
const typing = document.getElementById("typing");
const themeToggle = document.getElementById("themeToggle");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
        navMenu.classList.toggle("active");
    });
}

document.querySelectorAll(".nav-menu a").forEach(link => {
    link.addEventListener("click", () => {
        navMenu.classList.remove("active");
    });
});

const words = [
    "digital experiences",
    "Android applications",
    "web interfaces",
    "software solutions"
];

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect() {
    if (!typing) return;

    const currentWord = words[wordIndex];

    if (deleting) {
        charIndex--;
    } else {
        charIndex++;
    }

    typing.textContent = currentWord.substring(0, charIndex);

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeEffect, 1500);
        return;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % words.length;
    }

    setTimeout(typeEffect, deleting ? 45 : 85);
}

typeEffect();

if (themeToggle) {
    themeToggle.addEventListener("click", () => {
        document.body.classList.toggle("light-theme");

        const isLight = document.body.classList.contains("light-theme");

        themeToggle.textContent = isLight ? "☾" : "☼";
        localStorage.setItem("theme", isLight ? "light" : "dark");
    });

    if (localStorage.getItem("theme") === "light") {
        document.body.classList.add("light-theme");
        themeToggle.textContent = "☾";
    }
}

const revealItems = document.querySelectorAll(".about-card, .about-image, .about-text, .about-stats");

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

revealItems.forEach(item => {
    item.classList.add("reveal");
    revealObserver.observe(item);
});

const skillsSection = document.querySelector(".skills-section");

if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillsSection.classList.add("visible");
            }
        });
    }, {
        threshold: 0.2
    });

    skillsObserver.observe(skillsSection);
}

const githubUsername = "aditya-raj-tech";

async function loadGitHub() {
    try {
        const response = await fetch(`https://api.github.com/users/${githubUsername}`);

        if (!response.ok) {
            throw new Error("GitHub profile not found");
        }

        const user = await response.json();

        document.getElementById("githubName").textContent = user.name || githubUsername;
        document.getElementById("githubUsername").textContent = `@${user.login}`;
        document.getElementById("repoCount").textContent = user.public_repos;
        document.getElementById("followersCount").textContent = user.followers;
        document.getElementById("followingCount").textContent = user.following;
        document.getElementById("gistCount").textContent = user.public_gists;

        const repoResponse = await fetch(`https://api.github.com/users/${githubUsername}/repos?sort=updated&per_page=6`);

        if (!repoResponse.ok) {
            throw new Error("Repositories not found");
        }

        const repos = await repoResponse.json();
        const repoGrid = document.getElementById("repoGrid");

        repoGrid.innerHTML = "";

        repos.forEach(repo => {
            repoGrid.innerHTML += `
                <a href="${repo.html_url}" target="_blank" class="repo-card">
                    <div class="repo-top">
                        <span class="repo-icon">◇</span>
                        <span class="repo-stars">★ ${repo.stargazers_count}</span>
                    </div>

                    <h4>${repo.name}</h4>

                    <p>${repo.description || "No description available."}</p>

                    <div class="repo-bottom">
                        <span class="repo-language"></span>
                        <span>${repo.language || "Code"}</span>
                    </div>
                </a>
            `;
        });

    } catch (error) {
        document.getElementById("repoGrid").innerHTML = `
            <div class="repo-loading">Unable to load GitHub repositories.</div>
        `;
    }
}

loadGitHub();

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-menu a");

const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            navLinks.forEach(link => {
                link.classList.remove("active");

                if (link.getAttribute("href") === `#${entry.target.id}`) {
                    link.classList.add("active");
                }
            });
        }
    });
}, {
    threshold: 0.35
});

sections.forEach(section => sectionObserver.observe(section));