import * as THREE from 'three';

export class CameraController {
    constructor(camera, target) {
        this.camera = camera;
        this.target = target;
        this.offset = new THREE.Vector3(0, 5, -10);
        this.lookAtOffset = new THREE.Vector3(0, 0, 5);
        this.smoothness = 0.05;
    }

    update() {
        const targetPosition = this.target.position.clone();
        const desiredPosition = targetPosition.clone().add(
            this.offset.clone().applyQuaternion(this.target.quaternion)
        );

        this.camera.position.lerp(desiredPosition, this.smoothness);

        const lookAtPosition = targetPosition.clone().add(
            this.lookAtOffset.clone().applyQuaternion(this.target.quaternion)
        );
        this.camera.lookAt(lookAtPosition);
    }
}