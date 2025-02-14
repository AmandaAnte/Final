import * as THREE from 'three';

export class Airplane {
    constructor() {
        this.mesh = new THREE.Group();
        this.speed = 0.2;
        this.turnSpeed = 0.05;
        this.velocity = new THREE.Vector3(0, 0, 0);
        
        this.createMesh();
    }

    createMesh() {
        const fuselage = new THREE.CylinderGeometry(0.1, 0.1, 1.5, 8);
        const fuselageMaterial = new THREE.MeshLambertMaterial({ color: 0x1e90ff });
        const fuselageMesh = new THREE.Mesh(fuselage, fuselageMaterial);
        fuselageMesh.rotation.x = Math.PI / 2;
        this.mesh.add(fuselageMesh);

        const wingGeometry = new THREE.BoxGeometry(1.5, 0.05, 0.4);
        const wingMaterial = new THREE.MeshLambertMaterial({ color: 0x87ceeb });
        const wingMesh = new THREE.Mesh(wingGeometry, wingMaterial);
        wingMesh.position.y = -0.1;
        this.mesh.add(wingMesh);

        const tailWingGeometry = new THREE.BoxGeometry(0.6, 0.025, 0.2);
        const tailWingMesh = new THREE.Mesh(tailWingGeometry, wingMaterial);
        tailWingMesh.position.z = -0.6;
        tailWingMesh.position.y = -0.05;
        this.mesh.add(tailWingMesh);

        const verticalTailGeometry = new THREE.BoxGeometry(0.025, 0.4, 0.2);
        const verticalTailMesh = new THREE.Mesh(verticalTailGeometry, wingMaterial);
        verticalTailMesh.position.z = -0.6;
        verticalTailMesh.position.y = 0.1;
        this.mesh.add(verticalTailMesh);

        const propellerGeometry = new THREE.CylinderGeometry(0.025, 0.025, 0.05, 8);
        const propellerMaterial = new THREE.MeshLambertMaterial({ color: 0x333333 });
        const propellerMesh = new THREE.Mesh(propellerGeometry, propellerMaterial);
        propellerMesh.position.z = 0.8;
        propellerMesh.rotation.x = Math.PI / 2;
        this.mesh.add(propellerMesh);

        const bladeGeometry = new THREE.BoxGeometry(0.01, 0.4, 0.075);
        const bladeMaterial = new THREE.MeshLambertMaterial({ color: 0x444444 });
        
        const blade1 = new THREE.Mesh(bladeGeometry, bladeMaterial);
        blade1.position.set(0, 0.2, 0.825);
        this.mesh.add(blade1);
        
        const blade2 = new THREE.Mesh(bladeGeometry, bladeMaterial);
        blade2.position.set(0, -0.2, 0.825);
        this.mesh.add(blade2);
        
        this.propellerGroup = new THREE.Group();
        this.propellerGroup.add(propellerMesh, blade1, blade2);
        this.mesh.add(this.propellerGroup);
    }

    update(keys) {
        if (keys['w'] || keys['W']) {
            this.velocity.add(new THREE.Vector3(0, 0, this.speed).applyQuaternion(this.mesh.quaternion));
        }
        if (keys['s'] || keys['S']) {
            this.velocity.add(new THREE.Vector3(0, 0, -this.speed * 0.5).applyQuaternion(this.mesh.quaternion));
        }
        if (keys['a'] || keys['A']) {
            this.mesh.rotateY(this.turnSpeed);
        }
        if (keys['d'] || keys['D']) {
            this.mesh.rotateY(-this.turnSpeed);
        }
        if (keys[' ']) {
            this.mesh.rotateX(this.turnSpeed);
        }
        if (keys['c'] || keys['C']) {
            this.mesh.rotateX(-this.turnSpeed);
        }

        this.velocity.multiplyScalar(0.98);
        this.mesh.position.add(this.velocity);

        this.propellerGroup.rotation.z += 0.5;
    }
}