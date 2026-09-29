// =========================================================
// ATF CAMPUS GROUPS
// Main JavaScript
// =========================================================

const state = {
  groups: [],
  filteredGroups: []
};

const groupsGrid = document.getElementById("groupsGrid");
const searchInput = document.getElementById("searchInput");
const countryFilter = document.getElementById("countryFilter");
const typeFilter = document.getElementById("typeFilter");
const resultsSummary = document.getElementById("resultsSummary");
const emptyState = document.getElementById("emptyState");
const clearFilters = document.getElementById("clearFilters");
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.getElementById("mainNav");

document.getElementById("year").textContent = new Date().getFullYear();

async function loadGroups() {
  try {
    const response = await fetch("data/groups.json");

    if (!response.ok) {
      throw new Error("Could not load groups.json");
    }

    state.groups = await response.json();
    state.filteredGroups = [...state.groups];

    populateFilters();
    updateStatistics();
    renderGroups();
  } catch (error) {
    console.error(error);
    resultsSummary.textContent = "The group directory could not be loaded.";
  }
}

function populateFilters() {
  const countries = [...new Set(state.groups.map(group => group.country))]
    .filter(Boolean)
    .sort();

  const types = [...new Set(state.groups.map(group => group.type))]
    .filter(Boolean)
    .sort();

  countries.forEach(country => {
    const option = document.createElement("option");
    option.value = country;
    option.textContent = country;
    countryFilter.appendChild(option);
  });

  types.forEach(type => {
    const option = document.createElement("option");
    option.value = type;
    option.textContent = type;
    typeFilter.appendChild(option);
  });
}

function updateStatistics() {
  const countries = new Set(state.groups.map(group => group.country));
  const universities = new Set(state.groups.map(group => group.university));

  document.getElementById("heroGroupCount").textContent = state.groups.length;
  document.getElementById("heroCountryCount").textContent = countries.size;
  document.getElementById("heroUniversityCount").textContent = universities.size;
}

function filterGroups() {
  const search = searchInput.value.trim().toLowerCase();
  const country = countryFilter.value;
  const type = typeFilter.value;

  state.filteredGroups = state.groups.filter(group => {
    const searchableText = [
      group.name,
      group.university,
      group.country,
      group.city,
      group.type,
      group.description
    ].join(" ").toLowerCase();

    const matchesSearch = !search || searchableText.includes(search);
    const matchesCountry = !country || group.country === country;
    const matchesType = !type || group.type === type;

    return matchesSearch && matchesCountry && matchesType;
  });

  renderGroups();
}

function renderGroups() {
  groupsGrid.innerHTML = "";

  resultsSummary.textContent =
    `Showing ${state.filteredGroups.length} of ${state.groups.length} group${state.groups.length === 1 ? "" : "s"}.`;

  if (state.filteredGroups.length === 0) {
    emptyState.classList.remove("hidden");
    return;
  }

  emptyState.classList.add("hidden");

  state.filteredGroups.forEach(group => {
    const card = document.createElement("article");
    card.className = "group-card";

    card.innerHTML = `
      <div class="card-top">
        <span class="badge">${escapeHtml(group.type)}</span>
        <span class="country">${escapeHtml(group.country)}</span>
      </div>

      <h3>${escapeHtml(group.name)}</h3>
      <p class="university">${escapeHtml(group.university)}</p>
      <p class="description">${escapeHtml(group.description)}</p>

      <div class="card-bottom">
        <span class="location">📍 ${escapeHtml(group.city)}</span>
        <a class="card-link" href="${safeUrl(group.link)}" target="_blank" rel="noopener">
          Join / View →
        </a>
      </div>
    `;

    groupsGrid.appendChild(card);
  });
}

function escapeHtml(value) {
  return String(value ?? "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

function safeUrl(url) {
  const value = String(url ?? "").trim();

  if (
    value.startsWith("https://") ||
    value.startsWith("http://") ||
    value.startsWith("mailto:")
  ) {
    return value;
  }

  return "#";
}

searchInput.addEventListener("input", filterGroups);
countryFilter.addEventListener("change", filterGroups);
typeFilter.addEventListener("change", filterGroups);

clearFilters.addEventListener("click", () => {
  searchInput.value = "";
  countryFilter.value = "";
  typeFilter.value = "";
  filterGroups();
});

menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("open");
});

mainNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => mainNav.classList.remove("open"));
});

loadGroups();
