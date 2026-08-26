import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.180.0/build/three.module.js";

const loaderLine = document.querySelector(".loader-line span");
let progress = 0;
const timer = setInterval(() => {
  progress += Math.random() * 18;
  if (progress >= 100) { progress = 100; clearInterval(timer); }
  loaderLine.style.width = progress + "%";
}, 90);

window.addEventListener("load", () => setTimeout(() => document.documentElement.classList.add("loaded"), 700));

/* Interactive hero object — intentionally lightweight for GitHub Pages. */
const canvas = document.getElementById("hero-canvas");
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(45, innerWidth / innerHeight, .1, 100);
camera.position.set(0, 0, 6);

const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
renderer.setSize(innerWidth, innerHeight);
renderer.outputColorSpace = THREE.SRGBColorSpace;

const group = new THREE.Group();
scene.add(group);

const geometry = new THREE.IcosahedronGeometry(1.55, 2);
const material = new THREE.MeshBasicMaterial({color:0x8d8d8d, wireframe:true, transparent:true, opacity:.28});
const mesh = new THREE.Mesh(geometry, material);
group.add(mesh);

const core = new THREE.Mesh(
  new THREE.IcosahedronGeometry(1.28, 3),
  new THREE.MeshBasicMaterial({color:0x101010, transparent:true, opacity:.8})
);
group.add(core);

const mouse = {x:0,y:0};
window.addEventListener("pointermove", e => {
  mouse.x = (e.clientX / innerWidth - .5);
  mouse.y = (e.clientY / innerHeight - .5);
});

function animate(){
  requestAnimationFrame(animate);
  group.rotation.y += .0018;
  group.rotation.x += .0007;
  group.rotation.y += mouse.x * .0012;
  group.rotation.x += mouse.y * .0008;
  const s = 1 + Math.sin(performance.now()*.0006)*.025;
  group.scale.setScalar(s);
  renderer.render(scene,camera);
}
animate();

window.addEventListener("resize",()=>{
  camera.aspect = innerWidth/innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(innerWidth,innerHeight);
});

/* Portfolio filters */
const filters = document.querySelectorAll("#filters button");
const cards = document.querySelectorAll(".project-card");
filters.forEach(btn => btn.addEventListener("click",()=>{
  filters.forEach(x=>x.classList.remove("active"));
  btn.classList.add("active");
  const f = btn.dataset.filter;
  cards.forEach(card => {
    card.style.display = (f==="all" || card.dataset.category===f) ? "" : "none";
  });
}));

/* Project modal */
const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalType = document.getElementById("modalType");
const closeModal = () => { modal.classList.remove("open"); document.body.classList.remove("no-scroll"); modal.setAttribute("aria-hidden","true"); };
cards.forEach(card=>card.addEventListener("click",()=>{
  modalTitle.textContent = card.dataset.title;
  modalType.textContent = card.dataset.type;
  modal.classList.add("open");
  document.body.classList.add("no-scroll");
  modal.setAttribute("aria-hidden","false");
}));
document.getElementById("modalClose").addEventListener("click",closeModal);
modal.addEventListener("click",e=>{ if(e.target===modal) closeModal(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape") closeModal(); });

/* Tiny magnetic CTA effect */
document.querySelectorAll(".magnetic").forEach(el=>{
  el.addEventListener("pointermove",e=>{
    const r=el.getBoundingClientRect();
    el.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.08}px,${(e.clientY-r.top-r.height/2)*.08}px)`;
  });
  el.addEventListener("pointerleave",()=>el.style.transform="");
});

/* Hide GLB placeholder once model loads */
const mv = document.getElementById("modelViewer");
const ph = document.getElementById("viewerPlaceholder");
mv.addEventListener("load",()=>ph.style.display="none");
mv.addEventListener("error",()=>ph.style.display="grid");
