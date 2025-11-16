// admin.js – Admin panel for Open Road Exchange

const STORAGE_KEY = "openRoadInventory";

// Simple hardcoded login (upgrade later to real auth/server)
const ADMIN_USER = "admin";
const ADMIN_PASS = "openroad123";

// ---- DOM ELEMENTS ----
const loginSection = document.getElementById("loginSection");
const adminSection = document.getElementById("adminSection");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const loginError = document.getElementById("loginError");
const userInput = document.getElementById("adminUser");
const passInput = document.getElementById("adminPass");

const vehicleForm = document.getElementById("vehicleForm");
const formTitle = document.getElementById("formTitle");
const vehicleIdInput = document.getElementById("vehicleId");
const titleInput = document.getElementById("title");
const typeInput = document.getElementById("type");
const yearInput = document.getElementById("year");
const priceInput = document.getElementById("price");
const mileageInput = document.getElementById("mileage");
const stockInput = document.getElementById("stock");
const statusInput = document.getElementById("status");
const imageInput = document.getElementById("image");
const tagsInput = document.getElementById("tags");
const descriptionInput = document.getElementById("description");
const resetBtn = document.getElementById("resetBtn");

const tableBody = document.getElementById("inventoryTableBody");
const exportBtn = document.getElementById("exportBtn");
const importFile = document.getElementById("importFile");

// ---- BASIC INVENTORY SCHEMA ----
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

// ---- STORAGE HELPERS ----

function loadInventory() {
  const stored = localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      return [...defaultInventory];
    }
  }
  // First-time load: seed with defaults
  localStorage.setItem(STORAGE_KEY, JSON.stringify(defaultInventory));
  return [...defaultInventory];
}

function saveInventory(inventory) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(inventory));
}

// ---- AUTH ----

function isLoggedIn() {
  return sessionStorage.getItem("orxAdminLoggedIn") === "true";
}

function setLoggedIn(value) {
  sessionStorage.setItem("orxAdminLoggedIn", value ? "true" : "false");
}

function showLogin() {
  loginSection.style.display = "block";
  adminSection.style.display = "none";
}

function showAdmin() {
  loginSection.style.display = "none";
  adminSection.style.display = "block";
}

// ---- UI RENDERING ----

let inventory = loadInventory();

function renderTable() {
  tableBody.innerHTML = "";

  if (!inventory.length) {
    const row = document.createElement("tr");
    const cell = document.createElement("td");
    cell.colSpan = 7;
    cell.textContent = "No inventory yet. Add your first vehicle using the form.";
    row.appendChild(cell);
    tableBody.appendChild(row);
    return;
  }

  inventory.forEach((item) => {
    const tr = document.createElement("tr");

    const priceText = item.price
      ? "$" + Number(item.price).toLocaleString()
      : "";

    tr.innerHTML = `
      <td>${item.title || ""}</td>
      <td>${item.type || ""}</td>
      <td>${item.year || ""}</td>
      <td>${priceText}</td>
      <td>${formatStatus(item.status)}</td>
      <td>${item.stock || ""}</td>
      <td class="table-actions">
        <button data-id="${item.id}" class="small-btn edit-btn">Edit</button>
        <button data-id="${item.id}" class="small-btn danger-btn">Delete</button>
      </td>
    `;

    tableBody.appendChild(tr);
  });

  attachRowEvents();
}

function formatStatus(status) {
  switch (status) {
    case "available":
      return "Available";
    case "sale_pending":
      return "Sale Pending";
    case "sold":
      return "Sold";
    default:
      return status || "";
  }
}

function attachRowEvents() {
  document.querySelectorAll(".edit-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      startEdit(id);
    });
  });

  document.querySelectorAll(".danger-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const id = btn.getAttribute("data-id");
      deleteItem(id);
    });
  });
}

// ---- FORM LOGIC ----

function clearForm() {
  formTitle.textContent = "Add Vehicle";
  vehicleIdInput.value = "";
  vehicleForm.reset();
  statusInput.value = "available";
}

function startEdit(id) {
  const item = inventory.find((i) => i.id === id);
  if (!item) return;

  formTitle.textContent = "Edit Vehicle";
  vehicleIdInput.value = item.id;
  titleInput.value = item.title || "";
  typeInput.value = item.type || "rv";
  yearInput.value = item.year || "";
  priceInput.value = item.price || "";
  mileageInput.value = item.mileage || "";
  stockInput.value = item.stock || "";
  statusInput.value = item.status || "available";
  imageInput.value = item.image || "";
  tagsInput.value = (item.tags || []).join(", ");
  descriptionInput.value = item.description || "";
}

function deleteItem(id) {
  if (!confirm("Delete this vehicle?")) return;
  inventory = inventory.filter((i) => i.id !== id);
  saveInventory(inventory);
  renderTable();
}

vehicleForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const id = vehicleIdInput.value || (window.crypto && crypto.randomUUID ? crypto.randomUUID() : String(Date.now()));

  const data = {
    id,
    title: titleInput.value.trim(),
    type: typeInput.value,
    year: yearInput.value ? Number(yearInput.value) : "",
    price: priceInput.value ? Number(priceInput.value) : "",
    mileage: mileageInput.value ? Number(mileageInput.value) : "",
    stock: stockInput.value.trim(),
    status: statusInput.value,
    image: imageInput.value.trim(),
    tags: tagsInput.value
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    description: descriptionInput.value.trim()
  };

  const existingIndex = inventory.findIndex((i) => i.id === id);
  if (existingIndex >= 0) {
    inventory[existingIndex] = data;
  } else {
    inventory.push(data);
  }

  saveInventory(inventory);
  renderTable();
  clearForm();
});

resetBtn.addEventListener("click", () => {
  clearForm();
});

// ---- LOGIN EVENTS ----

loginBtn.addEventListener("click", () => {
  const u = userInput.value.trim();
  const p = passInput.value;

  if (u === ADMIN_USER && p === ADMIN_PASS) {
    setLoggedIn(true);
    loginError.textContent = "";
    showAdmin();
  } else {
    loginError.textContent = "Invalid username or password.";
  }
});

logoutBtn.addEventListener("click", () => {
  setLoggedIn(false);
  showLogin();
});

// ---- EXPORT / IMPORT ----

exportBtn.addEventListener("click", () => {
  const dataStr = JSON.stringify(inventory, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "openroad_inventory.json";
  a.click();

  URL.revokeObjectURL(url);
});

document
  .querySelector(".import-label")
  .addEventListener("click", () => importFile.click());

importFile.addEventListener("change", (e) => {
  const file = e.target.files[0];
  if (!file) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    try {
      const imported = JSON.parse(ev.target.result);
      if (!Array.isArray(imported)) {
        alert("Invalid file format.");
        return;
      }
      inventory = imported;
      saveInventory(inventory);
      renderTable();
      alert("Inventory imported successfully.");
    } catch (err) {
      console.error(err);
      alert("Error reading file.");
    }
  };
  reader.readAsText(file);
});

// ---- INIT ----
document.addEventListener("DOMContentLoaded", () => {
  inventory = loadInventory();
  if (isLoggedIn()) {
    showAdmin();
  } else {
    showLogin();
  }
  renderTable();
});
