
const STORAGE_KEY="openRoadInventory";
let list=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");
const grid=document.getElementById("featuredGrid");
list.slice(0,3).forEach(v=>{
 let d=document.createElement("div");
 d.className="feat-card";
 d.innerHTML=`<h3>${v.title}</h3><p>${v.year} • ${v.type}</p><p>${v.price}</p>`;
 grid.appendChild(d);
});
