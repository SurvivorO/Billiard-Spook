import Phaser from 'phaser';

export default class GameScene extends Phaser.Scene {

    private donuts!: Phaser.Physics.Arcade.Group;

    constructor() {
        super({ key: 'GameScene' });
    }

    preload() {

    }

    create() {
        this.donuts = this.physics.add.group();

        const donutCount = 10;

        for (let i = 0; i < donutCount; i++) {
            const x = Phaser.Math.Between(100, window.innerWidth - 100);
            const y = Phaser.Math.Between(100, window.innerHeight - 100);

            const donutRadius = 32;
            const donut = this.add.circle(x, y, donutRadius, 0xffff00);

            this.donuts.add(donut);

            const body = donut.body as Phaser.Physics.Arcade.Body;
            body.setCollideWorldBounds(true);
            body.setBounce(0.8, 0.8);
            body.setDamping(true);
            body.setDrag(0.96);
            body.setCircle(donutRadius);
            body.setVelocity(Phaser.Math.Between(-50, 50), Phaser.Math.Between(-50, 50));
        }

        this.physics.add.collider(this.donuts, this.donuts);

        this.input.on('pointerdown', (pointer: Phaser.Input.Pointer) => {

            this.donuts.getChildren().forEach((gameObject) => {
                const donut = gameObject as Phaser.GameObjects.Arc;
                const body = donut.body as Phaser.Physics.Arcade.Body;


                let distance = Phaser.Math.Distance.Between(pointer.x, pointer.y, donut.x, donut.y);
                let nearDistance = 32;

                if (distance < nearDistance) distance = nearDistance;

                const shockWaveRadius = 250;

                if (distance < shockWaveRadius) {
                    const angle = Phaser.Math.Angle.Between(pointer.x, pointer.y, donut.x, donut.y);
                    const force = (shockWaveRadius - distance) * 2.5;

                    body.velocity.x += Math.cos(angle) * force;
                    body.velocity.y += Math.sin(angle) * force;
                }
            });
        });
    }

    update() {

    }
}