import * as THREE from 'https://cdn.jsdelivr.net/npm/three@0.176.0/build/three.module.js';
import {GLTFLoader} from 'https://cdn.jsdelivr.net/npm/three@0.176.0/examples/jsm/loaders/GLTFLoader.js';
import {OrbitControls} from 'https://cdn.jsdelivr.net/npm/three@0.176.0/examples/jsm/controls/OrbitControls.js';

window.addEventListener('load',()=>setTimeout(()=>document.querySelector('#loader').classList.add('done'),700));

function scene(canvas,modelMode=false){
 const r=new THREE.WebGLRenderer({canvas,antialias:true,alpha:true});r.setPixelRatio(Math.min(devicePixelRatio,2));
 const s=new THREE.Scene();const cam=new THREE.PerspectiveCamera(35,1,.01,100);cam.position.set(2,1.2,3);
 s.add(new THREE.HemisphereLight(0xffffff,0x222222,2));const l=new THREE.DirectionalLight(0xffffff,4);l.position.set(3,4,5);s.add(l);
 let root=null,controls=null;
 if(modelMode){controls=new OrbitControls(cam,canvas);controls.enableDamping=true;controls.autoRotate=true;controls.autoRotateSpeed=1.2;
  new GLTFLoader().load('../assets/models/3dmodel.glb',g=>{root=g.scene;s.add(root);fit();document.querySelector('#status').style.display='none'},()=>{},()=>{document.querySelector('#status').textContent='PLACE 3dmodel.glb IN assets/models/'});}
 else {const g=new THREE.IcosahedronGeometry(1.3,2);root=new THREE.Mesh(g,new THREE.MeshPhysicalMaterial({color:0x777777,metalness:.7,roughness:.2,clearcoat:1}));s.add(root);controls=null;}
 function fit(){const box=new THREE.Box3().setFromObject(root),size=box.getSize(new THREE.Vector3()),center=box.getCenter(new THREE.Vector3()),m=Math.max(size.x,size.y,size.z);root.position.sub(center);cam.position.set(m*1.8,m*1.1,m*1.8);cam.lookAt(0,0,0);if(controls){controls.target.set(0,0,0);controls.update()}}
 function resize(){const w=canvas.clientWidth||innerWidth,h=canvas.clientHeight||innerHeight;r.setSize(w,h,false);cam.aspect=w/h;cam.updateProjectionMatrix()}addEventListener('resize',resize);resize();
 function tick(){if(root&&!modelMode){root.rotation.x+=.002;root.rotation.y+=.004}if(controls)controls.update();r.render(s,cam);requestAnimationFrame(tick)}tick();
 return {fit,get root(){return root},controls};
}
scene(document.querySelector('#hero'));
const v=scene(document.querySelector('#model'),true);
document.querySelector('#reset').onclick=()=>v.fit();
document.querySelector('#auto').onclick=()=>v.controls.autoRotate=!v.controls.autoRotate;
let wire=false;document.querySelector('#wire').onclick=()=>{wire=!wire;if(v.root)v.root.traverse(x=>{if(x.isMesh&&x.material)x.material.wireframe=wire})};
document.querySelectorAll('.filters button').forEach(b=>b.onclick=()=>{document.querySelectorAll('.filters button').forEach(x=>x.classList.remove('active'));b.classList.add('active');const f=b.dataset.f;document.querySelectorAll('.grid article').forEach(x=>x.style.display=f==='all'||x.dataset.t===f?'':'none')});