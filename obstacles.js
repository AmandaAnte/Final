import * as THREE from 'three';

export class Obstacle {
    constructor(type = 'cube', position = { x: 0, y: 0, z: 0 }, scale = 1) {
        this.type = type;
        this.mesh = null;
        this.createMesh(scale);
        this.mesh.position.set(position.x, position.y, position.z);
        this.mesh.castShadow = true;
        this.mesh.receiveShadow = true;
    }

    createMesh(scale) {
        let geometry, material;

        switch (this.type) {
            case 'cube':
                geometry = new THREE.BoxGeometry(2 * scale, 2 * scale, 2 * scale);
                material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
                break;
            case 'tower':
                geometry = new THREE.CylinderGeometry(0.8 * scale, 1 * scale, 5 * scale, 8);
                material = new THREE.MeshLambertMaterial({ color: 0x696969 });
                break;
            case 'ring':
                const outerGeometry = new THREE.TorusGeometry(3 * scale, 0.5 * scale, 8, 16);
                material = new THREE.MeshLambertMaterial({ color: 0xFF4500 });
                geometry = outerGeometry;
                break;
            case 'mountain':
                geometry = new THREE.ConeGeometry(4 * scale, 8 * scale, 8);
                material = new THREE.MeshLambertMaterial({ color: 0x8B7355 });
                break;
            case 'wall':
                geometry = new THREE.BoxGeometry(8 * scale, 6 * scale, 1 * scale);
                material = new THREE.MeshLambertMaterial({ color: 0x654321 });
                break;
            default:
                geometry = new THREE.BoxGeometry(2 * scale, 2 * scale, 2 * scale);
                material = new THREE.MeshLambertMaterial({ color: 0x8B4513 });
        }

        this.mesh = new THREE.Mesh(geometry, material);
    }
}

export class ObstacleManager {
    constructor() {
        this.obstacles = [];
    }

    createRandomObstacles(count = 20, range = 80) {
        const obstacleTypes = ['cube', 'tower', 'ring', 'mountain', 'wall'];
        
        for (let i = 0; i < count; i++) {
            const type = obstacleTypes[Math.floor(Math.random() * obstacleTypes.length)];
            const position = {
                x: (Math.random() - 0.5) * range,
                y: type === 'ring' ? Math.random() * 10 + 5 : 0,
                z: (Math.random() - 0.5) * range
            };
            const scale = 0.5 + Math.random() * 1;
            
            if (Math.abs(position.x) > 10 || Math.abs(position.z) > 10) {
                const obstacle = new Obstacle(type, position, scale);
                this.obstacles.push(obstacle);
            }
        }
    }

    addToScene(scene) {
        this.obstacles.forEach(obstacle => {
            scene.add(obstacle.mesh);
        });
    }

    getObstacles() {
        return this.obstacles;
    }
}