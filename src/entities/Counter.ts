import { Scene } from "phaser";

export class Counter extends Phaser.GameObjects.Container {
  private txt: Phaser.GameObjects.Text;
  private timer: Phaser.Time.TimerEvent;
  private score: number = 0;

  constructor(scene: Scene, x: number, y: number) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.createCountrer();
    this.createTimer();
  }

  public stop() {
    this.timer.destroy();
  }

  public increaseScore(score = 1) {
    this.score += score;
    this.txt.setText(this.score.toString());
  }

  private createCountrer() {
    this.txt = this.scene.add.text(0, 0, "0", {
      fontSize: "120px",
      color: "#000000",
      fontFamily: "Tiny5",
      align: "center",
    }).setOrigin(0.5, 0.5);

    this.add(this.txt);
  }

  private createTimer() {
    this.timer = this.scene.time.addEvent({
      delay: 500,
      callback: () => {
        this.increaseScore();
      },
      loop: true,
    });
  }
}