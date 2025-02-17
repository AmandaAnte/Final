import * as THREE from 'three';
import { Airplane } from './airplane.js';
import { Controls } from './controls.js';
import { CameraController } from './camera.js';
import { ObstacleManager } from './obstacles.js';

// Scene
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x87ceeb);

// Camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

// Renderer
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

// Lighting
const ambientLight = new THREE.AmbientLight(0x404040, 0.6);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
directionalLight.position.set(100, 100, 50);
directionalLight.castShadow = true;
scene.add(directionalLight);

// Ground
const groundGeometry = new THREE.PlaneGeometry(200, 200);
const groundMaterial = new THREE.MeshLambertMaterial({ color: 0x90EE90 });
const ground = new THREE.Mesh(groundGeometry, groundMaterial);
ground.rotation.x = -Math.PI / 2;
ground.position.y = -10;
ground.receiveShadow = true;
scene.add(ground);

// Create airplane
const airplane = new Airplane();
airplane.mesh.position.set(0, 0, 0);
airplane.mesh.castShadow = true;
scene.add(airplane.mesh);

// Create obstacles
const obstacleManager = new ObstacleManager();
obstacleManager.createRandomObstacles(25, 100);
obstacleManager.addToScene(scene);

// Controls
const controls = new Controls();

// Camera controller
const cameraController = new CameraController(camera, airplane.mesh);

// Add instructions
const instructions = document.createElement('div');
instructions.style.position = 'absolute';
instructions.style.top = '10px';
instructions.style.left = '10px';
instructions.style.color = 'white';
instructions.style.fontFamily = 'Arial, sans-serif';
instructions.style.fontSize = '14px';
instructions.innerHTML = `
    <strong>飞机控制:</strong><br>
    W - 加速<br>
    S - 减速<br>
    A - 左转<br>
    D - 右转<br>
    Space - 上升<br>
    C - 下降
`;
document.body.appendChild(instructions);

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    
    // Update airplane
    airplane.update(controls.getKeys());
    
    // Update camera
    cameraController.update();
    
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Start animation
animate();