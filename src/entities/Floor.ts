export class Floor extends Phaser.GameObjects.Rectangle {
  constructor(scene: Phaser.Scene, x: number, y: number) {
    super(scene, x, y, scene.scale.width * 2, 20, 0x000000);
    this.setOrigin(0, 0);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this, true);
  }

}