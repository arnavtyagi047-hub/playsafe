/**
 * PlaySafe Recovery Hub - How I Used AI Page Logic
 * js/ai-page.js
 *
 * Features:
 * 1. Global aiTools data array with exactly 8 core AI tools.
 * 2. Dynamic card rendering with categories, icons, tasks, and status badges.
 * 3. Interactive category filtering (All, Planning, Building, Research, Chatbot, Design, Video).
 * 4. Dynamic counter calculation ("8 AI tools used").
 * 5. Media placeholder fallback detection ("Coming soon" boxes for empty or missing media).
 */

// 1. DATA: Array of 8 AI tools used across the project
const aiTools = [
  {
    name: "Antigravity",
    icon: "🚀",
    category: "Building",
    task: "Built the website code from my step-by-step prompts",
    status: "Used"
  },
  {
    name: "Lovable",
    icon: "💜",
    category: "Building",
    task: "Used to create and test website design ideas and layouts",
    status: "Used"
  },
  {
    name: "Claude",
    icon: "🧠",
    category: "Planning",
    task: "Helped plan the project, wrote my build prompts, and helped with the 3D body code",
    status: "Used"
  },
  {
    name: "Perplexity",
    icon: "🔎",
    category: "Research",
    task: "Researched common sports injuries and the Sports Injury Centre in Delhi, with sources",
    status: "Used"
  },
  {
    name: "NotebookLM",
    icon: "📚",
    category: "Research",
    task: "Summarised NHS and Mayo Clinic pages so I could check my injury guides",
    status: "Used"
  },
  {
    name: "Botpress",
    icon: "🤖",
    category: "Chatbot",
    task: "Powers the \"Ask the Physio\" chatbot, answering from NHS and Mayo Clinic pages",
    status: "Used"
  },
  {
    name: "Canva",
    icon: "🎨",
    category: "Design",
    task: "Designed the logo and banners",
    status: "Used"
  },
  {
    name: "Lumen5",
    icon: "🎬",
    category: "Video",
    task: "Turned my project text into a short explainer video",
    status: "Used"
  }
];

// 2. DOM Ready Initialization
document.addEventListener("DOMContentLoaded", function () {
  initAiPage();
});

function initAiPage() {
  updateCounter();
  renderCards(aiTools);
  setupFilters();
  setupMediaPlaceholders();
}

/**
 * Counts items with status === "Used" and updates the counter header
 */
function updateCounter() {
  const counterEl = document.getElementById("ai-tools-counter");
  if (!counterEl) return;

  const usedCount = aiTools.filter(tool => tool.status === "Used").length;
  counterEl.textContent = `${usedCount} AI tools used`;
}

/**
 * Renders the AI tool cards into the #ai-tools-grid container
 */
function renderCards(tools) {
  const grid = document.getElementById("ai-tools-grid");
  if (!grid) return;

  grid.innerHTML = "";

  if (tools.length === 0) {
    grid.innerHTML = `
      <div class="empty-filter-state">
        <p>No AI tools found in this category.</p>
      </div>
    `;
    return;
  }

  tools.forEach(tool => {
    const card = document.createElement("article");
    card.className = "card ai-card";
    card.setAttribute("data-category", tool.category);

    const isUsed = tool.status === "Used";
    const statusClass = isUsed ? "status-used" : "status-planned";

    card.innerHTML = `
      <div class="ai-card-header">
        <div class="ai-card-icon" aria-hidden="true">${escapeHtml(tool.icon)}</div>
        <span class="ai-status-badge ${statusClass}">${escapeHtml(tool.status)}</span>
      </div>
      <div class="ai-card-body">
        <div class="ai-card-meta">
          <span class="category-pill">${escapeHtml(tool.category)}</span>
        </div>
        <h3 class="ai-card-name">${escapeHtml(tool.name)}</h3>
        <p class="ai-card-task">${escapeHtml(tool.task)}</p>
      </div>
    `;

    grid.appendChild(card);
  });
}

/**
 * Handles interactive filtering by category without page reloads
 */
function setupFilters() {
  const filterBtns = document.querySelectorAll(".filter-btn");
  if (!filterBtns.length) return;

  filterBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      // Manage active state
      filterBtns.forEach(b => b.classList.remove("active"));
      this.classList.add("active");

      const category = this.getAttribute("data-category");

      if (category === "All") {
        renderCards(aiTools);
      } else {
        const filtered = aiTools.filter(tool => tool.category === category);
        renderCards(filtered);
      }
    });
  });
}

/**
 * Checks media elements (images, video).
 * If src is empty or media fails to load, displays a friendly "Coming soon" placeholder box.
 * Also wires up the Lumen5 video's .video-coming-soon fallback by id.
 */
function setupMediaPlaceholders() {
  const mediaCards = document.querySelectorAll(".media-card");

  mediaCards.forEach(card => {
    const mediaEl = card.querySelector("img, video");
    // Support both .media-coming-soon (old) and .video-coming-soon (Lumen5 card)
    const comingSoonBox = card.querySelector(".media-coming-soon, .video-coming-soon");

    if (!mediaEl || !comingSoonBox) return;

    const currentSrc = (mediaEl.getAttribute("src") || "").trim();

    // If src is empty, empty hash, or unassigned placeholder
    if (!currentSrc || currentSrc === "#") {
      mediaEl.style.display = "none";
      comingSoonBox.style.display = "flex";
      return;
    }

    // If src exists, listen for load failures (broken file path)
    mediaEl.addEventListener("error", function () {
      mediaEl.style.display = "none";
      comingSoonBox.style.display = "flex";
    });

    // If successfully loaded image
    if (mediaEl.tagName === "IMG") {
      if (mediaEl.complete && mediaEl.naturalWidth > 0) {
        mediaEl.style.display = "block";
        comingSoonBox.style.display = "none";
      } else {
        mediaEl.addEventListener("load", function () {
          mediaEl.style.display = "block";
          comingSoonBox.style.display = "none";
        });
      }
    }
  });
}

/**
 * Basic HTML escaping helper for safe text injection
 */
function escapeHtml(str) {
  if (!str) return "";
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
