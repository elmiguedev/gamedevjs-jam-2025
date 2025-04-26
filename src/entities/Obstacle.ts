export class Obstacle extends Phaser.Physics.Arcade.Sprite {
  constructor(scene: Phaser.Scene, frame: number) {
    super(scene, 0, 0, "obstacles", frame);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    const x = this.scene.game.canvas.width;
    const y = this.scene.game.canvas.height - 140;
    this.setGravityY(0);
    this.setPosition(x, y);
    this.setVelocity(-500, 0);
    this.resizeBody(frame);
  }

  private resizeBody(frame: number) {
    // WOLOLO
    switch (frame) {
      case 0:
        this.body?.setSize(120, 60);
        this.body?.setOffset(60, 180);
        break
      case 1:
        this.body?.setSize(60, 30);
        this.body?.setOffset(90, 210);
        break
      default:
        this.body?.setSize(120, 60);
        this.body?.setOffset(60, 180);
    }
  }
}