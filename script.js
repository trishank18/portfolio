const roles = ['Data Science Engineer','Machine Learning Engineer','Full-Stack Developer','IoT Developer'];
let roleIndex = 0;
const roleText = document.getElementById('role-text');
setInterval(() => { roleIndex = (roleIndex + 1) % roles.length; roleText.animate([{opacity:0, transform:'translateY(5px)'},{opacity:1, transform:'translateY(0)'}], {duration:450, easing:'ease-out'}); roleText.textContent = roles[roleIndex]; }, 2600);

const canvas = document.getElementById('hero-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(55, innerWidth / innerHeight, .1, 1000);
camera.position.z = 8;
const renderer = new THREE.WebGLRenderer({canvas, antialias:true, alpha:true});
renderer.setPixelRatio(Math.min(devicePixelRatio, 1.8));
renderer.setSize(innerWidth, innerHeight);
const core = new THREE.Group();
scene.add(core);
const cyan = new THREE.Color(0x73e8ff);
const orange = new THREE.Color(0xff8b63);
const nodeCount = innerWidth < 700 ? 38 : 72;
const nodePositions = [];
for (let i=0;i<nodeCount;i++) {
  const r = 2.1 + Math.random() * 2.7;
  const theta = Math.random() * Math.PI * 2;
  const phi = Math.acos((Math.random() * 2) - 1);
  const p = new THREE.Vector3(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
  nodePositions.push(p);
}
const pointsGeometry = new THREE.BufferGeometry().setFromPoints(nodePositions);
const points = new THREE.Points(pointsGeometry, new THREE.PointsMaterial({color:cyan, size:.045, transparent:true, opacity:.85}));
core.add(points);
const lineMaterial = new THREE.LineBasicMaterial({color:cyan, transparent:true, opacity:.13});
for (let i=0;i<nodePositions.length;i++) for (let j=i+1;j<nodePositions.length;j++) if (nodePositions[i].distanceTo(nodePositions[j]) < 1.9) { const geo = new THREE.BufferGeometry().setFromPoints([nodePositions[i],nodePositions[j]]); core.add(new THREE.Line(geo,lineMaterial)); }
const nucleus = new THREE.Mesh(new THREE.IcosahedronGeometry(1.05,2), new THREE.MeshBasicMaterial({color:cyan, wireframe:true, transparent:true, opacity:.75}));
core.add(nucleus);
const nucleusInner = new THREE.Mesh(new THREE.IcosahedronGeometry(.66,1), new THREE.MeshBasicMaterial({color:orange, wireframe:true, transparent:true, opacity:.3}));
core.add(nucleusInner);
for (let i=0;i<3;i++) { const ring = new THREE.Mesh(new THREE.TorusGeometry(1.45 + i*.28,.008,6,80), new THREE.MeshBasicMaterial({color:i===1?orange:cyan, transparent:true, opacity:.38})); ring.rotation.set(Math.random()*2,Math.random()*2,Math.random()*2); core.add(ring); }
let mouseX=0, mouseY=0, targetX=0, targetY=0;
addEventListener('pointermove', e => { mouseX = (e.clientX / innerWidth - .5); mouseY = (e.clientY / innerHeight - .5); document.querySelector('.cursor-glow').style.left = `${e.clientX}px`; document.querySelector('.cursor-glow').style.top = `${e.clientY}px`; });
function animate(){ requestAnimationFrame(animate); targetX += (mouseX * .55 - targetX) * .035; targetY += (mouseY * .35 - targetY) * .035; core.rotation.y += .0022; core.rotation.x += .0008; core.rotation.y += targetX*.001; core.position.x += ((innerWidth > 800 ? 1.8 : .2) - core.position.x)*.02; core.position.y += (-.2 - targetY*.7 - core.position.y)*.02; nucleus.rotation.x += .004; nucleus.rotation.y += .006; nucleusInner.rotation.y -= .006; renderer.render(scene,camera); }
animate();
addEventListener('resize',()=>{ camera.aspect=innerWidth/innerHeight; camera.updateProjectionMatrix(); renderer.setSize(innerWidth,innerHeight); });

const skillData = [['Python','cyan'],['TensorFlow','cyan'],['Keras','cyan'],['Scikit-learn','cyan'],['Pandas','cyan'],['NumPy','cyan'],['OpenCV','cyan'],['CNN','cyan'],['NLP','cyan'],['LLM APIs','cyan'],['Embeddings','cyan'],['C++','orange'],['C','orange'],['SQL','orange'],['React','orange'],['Node.js','orange'],['MongoDB','orange'],['AWS','orange'],['Prompt Design','orange'],['ESP32','lime'],['Arduino','lime'],['Raspberry Pi','lime'],['MQTT','lime'],['I2C','lime'],['Embedded C','lime'],['PHP','orange']];
const skillContainer = document.querySelector('.skill-nodes');
const positions = [[5,22],[18,5],[37,1],[60,6],[79,22],[88,43],[80,67],[64,84],[42,91],[20,83],[4,66],[1,45],[18,39],[29,23],[48,16],[67,28],[71,51],[59,68],[38,75],[21,63],[28,47],[52,48],[12,31],[84,31],[12,57],[86,57]];
skillData.forEach(([name,color],i)=>{ const node=document.createElement('button'); node.className='skill-node'; node.textContent=name; node.style.setProperty('--node-color',`var(--${color})`); node.style.left=`${positions[i][0]}%`; node.style.top=`${positions[i][1]}%`; node.addEventListener('mouseenter',()=>document.querySelector('.skill-core').classList.add('active')); node.addEventListener('mouseleave',()=>document.querySelector('.skill-core').classList.remove('active')); skillContainer.appendChild(node); });

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if(entry.isIntersecting) { entry.target.classList.add('visible'); if(entry.target.matches('.metrics')) startCounters(); } }), {threshold:.14});
document.querySelectorAll('.reveal,.metrics').forEach(el=>observer.observe(el));
let countersStarted=false;
function startCounters(){if(countersStarted)return;countersStarted=true;document.querySelectorAll('[data-count]').forEach(el=>{const target=+el.dataset.count;const suffix=el.dataset.suffix||'';let start=0;const step=()=>{start += Math.ceil(target/35); if(start>target)start=target;el.textContent=start+suffix;if(start<target)requestAnimationFrame(step)};step();});}

document.querySelectorAll('[data-tilt]').forEach(card=>{card.addEventListener('pointermove',e=>{if(innerWidth<800)return;const r=card.getBoundingClientRect();const x=(e.clientX-r.left)/r.width-.5;const y=(e.clientY-r.top)/r.height-.5;card.style.transform=`perspective(1000px) rotateY(${x*3}deg) rotateX(${-y*3}deg)`});card.addEventListener('pointerleave',()=>card.style.transform='')});
document.querySelectorAll('.magnetic').forEach(button=>{button.addEventListener('pointermove',e=>{const r=button.getBoundingClientRect();button.style.transform=`translate(${(e.clientX-r.left-r.width/2)*.12}px, ${(e.clientY-r.top-r.height/2)*.12}px)`});button.addEventListener('pointerleave',()=>button.style.transform='')});
const menuToggle=document.querySelector('.menu-toggle');const nav=document.querySelector('.nav-links');menuToggle.addEventListener('click',()=>nav.classList.toggle('open'));nav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>nav.classList.remove('open')));
const modal=document.getElementById('contact-modal');document.getElementById('contact-open').addEventListener('click',()=>modal.showModal());document.getElementById('modal-close').addEventListener('click',()=>modal.close());modal.addEventListener('click',e=>{if(e.target===modal)modal.close()});document.getElementById('contact-form').addEventListener('submit',e=>{e.preventDefault();const data=new FormData(e.target);const subject=encodeURIComponent(`Portfolio opportunity from ${data.get('name')}`);const body=encodeURIComponent(`Hi Trishank,\n\n${data.get('message')}\n\nReply to: ${data.get('email')}`);window.location.href=`mailto:mukkamallatrishankreddy@gmail.com?subject=${subject}&body=${body}`;modal.close();});
