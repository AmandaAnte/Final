export class Controls {
    constructor() {
        this.keys = {};
        this.setupEventListeners();
    }

    setupEventListeners() {
        document.addEventListener('keydown', (event) => {
            this.keys[event.key] = true;
        });

        document.addEventListener('keyup', (event) => {
            this.keys[event.key] = false;
        });

        document.addEventListener('blur', () => {
            this.keys = {};
        });
    }

    getKeys() {
        return this.keys;
    }
}