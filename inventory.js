// inventory.js – Public inventory display for Open Road Exchange
const STORAGE_KEY = "openRoadInventory";

const typeFilter = document.getElementById("typeFilter");
const priceFilter = document.getElementById("priceFilter");
const searchBar = document.getElementById("searchBar");
const inventoryList = document.getElementById("inventoryList");

const defaultInventory = [
  {
    id: "1",
    title: "2020 Thor Class A Diesel Pusher",
    type: "rv",
    year: 2020,
    price: 189999,
    mileage: 32000,
    stock: "ORX-001",
    status: "available",
    image: "",
    tags: ["Diesel", "Class A"],
    description: "Beautiful Class A diesel coach, full body paint, ready for long trips."
  },
  {
    id: "2",
    title: "2018 Ford F-350 Dually Tow Rig",
    type: "truck",
    year: 2018,
    price: 59999,
    mileage: 78000,
    stock: "ORX-002",
    status: "available",
    image: "",
    tags: ["Dually", "Diesel"],
    description: "Perfect hauler for big fifth wheels and race trailers."
  },
  {
    id: "3",
    title: "28' Enclosed Race Trailer",
    type: "trailer",
    year: 2021,
    price: 18995,
    mileage: 0,
    stock: "ORX-003",
    status: "available",
    image: "",
    tags: ["Race Trailer", "Enclosed"],
    description: "28-foot enclosed race trailer with cabinets and tire rack."
  }
];

function loadInventory() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [...defaultInventory];
    }
  }
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultInventory));
  return [...defaultInventory];
}

let inventory = loadInventory();

function renderInventory(list) {
  inventoryList.innerHTML = "";

  if (!list.length) {
    inventoryList.innerHTML = `<p>No units match your search. Try adjusting filters.</p>`;
    return;
  }

  list.forEach((item) => {
    const card = document.createElement("article");
    card.className = "inventory-card";

    const priceText = item.price
      ? "$" + Number(item.price).toLocaleString()
      : "Call for price";

    const statusBadge = item.status === "sold"
      ? `<span class="badge sold">Sold</span>`
      : item.status === "sale_pending"
      ? `<span class="badge pending">Sale Pending</span>`
      : `<span class="badge available">Available</span>`;

    const imageHtml = item.image
      ? `<div class="inventory-image" style="background-image:url('${item.image}')"></div>`
      : `<div class="inventory-image placeholder">RV / Truck / Trailer</div>`;

    card.innerHTML = `
      ${imageHtml}
      <div class="inventory-content">
        <div class="inventory-header">
          <h3>${item.title || ""}</h3>
          <div class="inventory-price-status">
            <span class="price">${priceText}</span>
            ${statusBadge}
          </div>
        </div>
        <div class="inventory-meta">
          ${item.year ? `<span>${item.year}</span>` : ""}
          ${item.year ? `<span class="dot"></span>` : ""}
          <span>${formatType(item.type)}</span>
          ${item.mileage ? `<span class="dot"></span><span>${Number(item.mileage).toLocaleString()} mi</span>` : ""}
          ${item.stock ? `<span class="dot"></span><span>Stock #${item.stock}</span>` : ""}
        </div>
        <p class="inventory-description">
          ${item.description || ""}
        </p>
        ${renderTags(item.tags)}
      </div>
    `;

    inventoryList.appendChild(card);
  });
}

function formatType(type) {
  switch (type) {
    case "rv":
      return "RV";
    case "truck":
      return "Truck";
    case "trailer":
      return "Trailer";
    default:
      return type || "";
  }
}

function renderTags(tags = []) {
  if (!tags.length) return "";
  return `
    <div class="inventory-tags">
      ${tags.map((t) => `<span class="tag">${t}</span>`).join("")}
    </div>
  `;
}

function applyFilters() {
  const typeVal = typeFilter ? typeFilter.value : "all";
  const priceVal = priceFilter ? priceFilter.value : "all";
  const searchVal = (searchBar && searchBar.value ? searchBar.value : "").toLowerCase();

  let filtered = [...inventory];

  if (typeVal !== "all") {
    filtered = filtered.filter((i) => i.type === typeVal);
  }

  if (priceVal !== "all") {
    filtered = filtered.filter((i) => {
      const price = Number(i.price) || 0;
      if (priceVal === "0-25000") return price <= 25000;
      if (priceVal === "25000-50000") return price > 25000 && price <= 50000;
      if (priceVal === "50000-100000") return price > 50000 && price <= 100000;
      if (priceVal === "100000+") return price > 100000;
      return true;
    });
  }

  if (searchVal) {
    filtered = filtered.filter((i) => {
      const text = `${i.title || ""} ${i.description || ""} ${(i.tags || []).join(" ")}`.toLowerCase();
      return text.includes(searchVal);
    });
  }

  renderInventory(filtered);
}

if (typeFilter) typeFilter.addEventListener("change", applyFilters);
if (priceFilter) priceFilter.addEventListener("change", applyFilters);
if (searchBar) searchBar.addEventListener("input", applyFilters);

document.addEventListener("DOMContentLoaded", () => {
  inventory = loadInventory();
  renderInventory(inventory);
});
