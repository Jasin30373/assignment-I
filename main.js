import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import gsap from 'gsap';

const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87CEEB);  

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(15, 15, 15);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;

const groundGeometry = new THREE.PlaneGeometry(30, 30);
const grassMaterial = new THREE.MeshBasicMaterial({ color: 0x228B22 });  
const ground = new THREE.Mesh(groundGeometry, grassMaterial);
ground.rotation.x = -Math.PI / 2;  
scene.add(ground);

const roadMaterial = new THREE.MeshBasicMaterial({ color: 0x333333 });  

const curvePath = new THREE.CurvePath();
curvePath.add(new THREE.LineCurve3(new THREE.Vector3(-5, 0.01, 5), new THREE.Vector3(0, 0.01, 5))); 
curvePath.add(new THREE.QuadraticBezierCurve3(
    new THREE.Vector3(0, 0.01, 5),   
    new THREE.Vector3(2, 0.01, 3),   
    new THREE.Vector3(5, 0.01, 0)    
));
curvePath.add(new THREE.LineCurve3(new THREE.Vector3(5, 0.01, 0), new THREE.Vector3(5, 0.01, -5))); 
const roadGeometry = new THREE.TubeGeometry(curvePath, 100, 0.5, 8, false);
const road = new THREE.Mesh(roadGeometry, roadMaterial);
scene.add(road);

const whiteMaterial = new THREE.MeshBasicMaterial({ color: 0xFFFFFF });  

const building1 = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 6), whiteMaterial);
building1.position.set(-0.5, 1, 0);  
scene.add(building1);

const building2 = new THREE.Mesh(new THREE.BoxGeometry(3, 2, 6), whiteMaterial);
building2.position.set(1, 1, 9);  
scene.add(building2);

const building3 = new THREE.Mesh(new THREE.BoxGeometry(4, 2, 6), whiteMaterial);
building3.position.set(9, 1, 0);  
scene.add(building3);

const sphereGeometry = new THREE.SphereGeometry(0.5, 32, 32);
const sphereMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial);
sphere.position.set(-5, 0.5, 5); 
scene.add(sphere);

const pathLength = curvePath.getLength();  
let speed = 0.01;  
let direction = 1;  
let t = 0;  

function updateBallPosition() {
  t += speed * direction;  
  
  if (t > 1) {  
    t = 1;  
    direction = -1;  
  }
  
  if (t < 0) {  
    t = 0;  
    direction = 1;  
  }

  const point = curvePath.getPointAt(t); 
  sphere.position.set(point.x, point.y + 0.5, point.z); 
}

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();  

    updateBallPosition();

    renderer.render(scene, camera);
}
animate();
