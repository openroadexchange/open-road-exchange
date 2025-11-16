
const STORAGE_KEY="openRoadInventory";
const params=new URLSearchParams(window.location.search);
const id=params.get("id");
let list=JSON.parse(localStorage.getItem(STORAGE_KEY)||"[]");
let item=list.find(i=>i.id===id);
const c=document.getElementById("detailContainer");
if(!item){c.innerHTML="<h2>Item not found</h2>";}
else{
 c.innerHTML=`<h1>${item.title}</h1>
 <p><strong>Year:</strong> ${item.year}</p>
 <p><strong>Type:</strong> ${item.type}</p>
 <p><strong>Price:</strong> ${item.price}</p>
 <p><strong>Status:</strong> ${item.status}</p>
 <img src="${item.image}" width="400">
 <p>${item.description}</p>`;
}
