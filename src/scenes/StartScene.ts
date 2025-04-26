import { Scene } from "phaser";

export class StartScene extends Scene {
  private startKey: Phaser.Input.Keyboard.Key;

  constructor() {
    super({ key: "StartScene" });
  }

  create() {
    this.cameras.main.setBackgroundColor(0xFFFFFF);

    this.createTitle();
    this.createStartTitle();

    this.startKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    this.startKey.on("down", () => {
      this.scene.start("GameScene");
    });
  }

  createTitle() {
    const title = "el manual dev";
    const x = this.cameras.main.centerX;
    const y = this.cameras.main.centerY - 50;
    const txt = this.add.text(
      x,
      y,
      title, {
      fontSize: "72px",
      color: "#000000",
      fontFamily: "Tiny5",
      align: "center",
    }
    ).setOrigin(0.5, 0.5);
  }

  createStartTitle() {
    const title = "press [ENTER] to start";
    const x = this.cameras.main.centerX;
    const y = this.cameras.main.centerY + 50;
    const txt = this.add.text(
      x,
      y,
      title, {
      fontSize: "32px",
      color: "#000000",
      fontFamily: "Tiny5",
      align: "center",
    }
    ).setOrigin(0.5, 0.5);
  }
}