import { GameObjects } from "phaser";

export class Player extends Phaser.GameObjects.Container {
  public skate: Phaser.GameObjects.Sprite;
  private offset: Phaser.GameObjects.Rectangle;
  private txt: Phaser.GameObjects.Text;
  private isManual: boolean = true;
  private currentTrick?: string = undefined;
  private isCrashed: boolean = false;
  public onCrash: Function;
  public onTrick: Function;

  private angularVelocity = 0;
  private angularAcceleration = 0;

  private baseBalanceStrength = 0.005;
  private maxBalanceStrength = 0.015;
  private damping = 0.985;
  private elapsed = 0;
  private canTrick = true;

  constructor(scene: Phaser.Scene, x: number, y: number, onCrash: Function) {
    super(scene, x, y);
    this.scene.add.existing(this);
    this.scene.physics.add.existing(this);
    this.onCrash = onCrash;
    this.createSkate();
    this.createOffset();
    this.setAngle(-20); // angulo inicial
  }

  public update(time: number, delta: number) {
    if (!this.isManual) {
      // this.angle += this.angularVelocity;
      return;
    }

    if (this.canTrick && this.currentTrick && !this.isJumpling()) {
      this.onTrick(this.currentTrick);
      this.currentTrick = undefined;
    }

    // this.elapsed += delta;

    // balance proresivo
    // const t = Phaser.Math.Clamp(this.elapsed / 5000, 0, 1);
    const balanceStrength = Phaser.Math.Linear(this.baseBalanceStrength, this.maxBalanceStrength, 0.1);

    // agregar dificultad extra :V 
    this.angularAcceleration = -balanceStrength * this.angle;
    this.angularAcceleration += Phaser.Math.FloatBetween(-0.02, 0.02);

    this.angularVelocity += this.angularAcceleration;
    this.angularVelocity *= this.damping;
    this.angle += this.angularVelocity;

    // this.txt.setText(`angle: ${this.angle.toFixed(2)}`);

    // Condición de caída (igual que en tu original)
    if (!this.isJumpling() && (this.angle <= -50 || this.angle >= 0)) {
      this.isManual = false;
      this.onCrash();
      this.isCrashed = true;
    } else {
    }
  }

  public moveLeft() {
    if (!this.isManual) return;
    this.angularVelocity -= 0.25; // fuerza constante
  }

  public moveRight() {
    if (!this.isManual) return;
    this.angularVelocity += 0.25;
  }

  public jump() {
    if (this.isJumpling() || this.isCrashed) return;
    this.playOllieAudio();
    this.getBody().setVelocityY(-600);
  }

  public trick(t: string) {
    if (!this.canTrick || !this.isJumpling()) return;
    this.currentTrick = t;

    if (t === "flip") {
      this.canTrick = false;
      this.playFlipAnimation();
    }

    this.playTrickAudio();

  }

  public addCollider(target: any) {
    this.scene.physics.add.collider(this, target, () => {
      if (!this.canTrick) {
        this.onCrash();
      }
    });
  }

  private createSkate() {
    this.skate = this.scene.add.sprite(0, 0, "skate").setOrigin(0);
    this.skate.setScale(10);
    this.skate.anims.createFromAseprite("skate");
    this.add(this.skate);
  }

  private createOffset() {
    const x = 50;
    const y = 220;

    // this.offset = this.scene.add.rectangle(0, 0, 10, 10, 0xff0000).setOrigin(0);
    // this.add(this.offset);

    const xOffset = 50 / 240;
    const yOffset = 220 / 240;
    this.skate.setOrigin(xOffset, yOffset);

    // body offset
    const body = this.body as Phaser.Physics.Arcade.Body;
    body.setOffset(0, -44);
  }

  private getBody() {
    return this.body as Phaser.Physics.Arcade.Body;
  }

  private isJumpling() {
    return !this.getBody().touching.down;
  }

  private playFlipAnimation() {
    this.skate.play({
      key: "flip",
      frameRate: 24,

    }, true);
    this.skate.on("animationcomplete", () => {
      this.resetTrickState();
    });
  }

  private resetTrickState() {
    this.canTrick = true;
    // this.currentTrick = undefined;
    this.skate.setFrame(0);
  }

  private playOllieAudio() {
    this.scene.sound.play("ollie", { volume: 0.6 });
  }

  private playTrickAudio() {
    this.scene.sound.play("trick", { volume: 0.6 });
  }
}
