import { Scene } from "phaser";
import { Player } from "../entities/Player";
import { Floor } from "../entities/Floor";
import { Counter } from "../entities/Counter";
import { Obstacle } from "../entities/Obstacle";

export class GameScene extends Scene {
  private player: Player;
  private floor: Floor;
  private counter: Counter;
  private obstacles: Phaser.Physics.Arcade.Group;
  private obstaclesTimer: Phaser.Time.TimerEvent;
  private isGameOver: boolean = false;
  private keys: {
    left: Phaser.Input.Keyboard.Key;
    right: Phaser.Input.Keyboard.Key;
    space: Phaser.Input.Keyboard.Key;
    a: Phaser.Input.Keyboard.Key;
    d: Phaser.Input.Keyboard.Key;
    w: Phaser.Input.Keyboard.Key;
    c: Phaser.Input.Keyboard.Key;
  }


  constructor() {
    super({ key: "GameScene" });
  }

  update(time: number, delta: number) {
    if (this.keys.left.isDown || this.keys.a.isDown) {
      this.player.moveLeft();
    } else if (this.keys.right.isDown || this.keys.d.isDown) {
      this.player.moveRight();
    }

    if (this.keys.space.isDown) {
      this.player.jump();
    }

    if (this.keys.c.isDown) {
      this.player.trick("flip");
    }

    this.player.update(time, delta);
  }

  create() {
    this.isGameOver = false;
    this.createCamera();
    this.createFloor();
    this.createPlayer();
    this.createObstacles();
    this.createCursors();
    this.createCounter();
    this.createMusic();
  }

  createCamera() {
    this.cameras.main.setBackgroundColor(0xFFFFFF);
  }

  createPlayer() {
    const x = this.game.canvas.width / 2;
    const y = this.game.canvas.height - 140;

    this.player = new Player(this, x, y, () => {
      this.gameOver();
    });

    this.player.onTrick = (trick: string) => {
      this.sound.play("point", { volume: 0.6 });
      this.increaseTrickScore(trick);
    }

    this.player.addCollider(this.floor);

  }

  createFloor() {
    const y = this.game.canvas.height - 20;
    this.floor = new Floor(this, 0, y);
  }

  createCursors() {
    this.keys = {
      a: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.A),
      d: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.D),
      left: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.LEFT),
      right: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.RIGHT),
      space: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE),
      w: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.W),
      c: this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.C),
    }
  }

  createCounter() {
    const x = this.game.canvas.width / 2;
    const y = 100;
    this.counter = new Counter(this, x, y);
  }

  restartGame() {
    this.sound.stopAll();
    this.scene.start("StartScene")
  }

  createObstacles() {
    this.obstacles = this.physics.add.group();

    this.obstaclesTimer = this.time.addEvent({
      delay: 6000,
      repeat: -1,
      callback: () => {
        this.createObstacle();
      }
    });


  }

  createObstacle() {
    const frame = Phaser.Math.Between(0, 1);
    const obstacle = new Obstacle(this, frame);
    this.obstacles.add(obstacle);
    obstacle.setGravityY(0);
    obstacle.setVelocityX(-500);
    this.physics.add.collider(obstacle, this.floor);
    this.physics.add.collider(this.player, obstacle, () => {
      obstacle.destroy();
      this.gameOver();
    });
  }

  createMusic() {
    const songs = ["song1", "song2"];
    const song = songs[Phaser.Math.Between(0, songs.length - 1)];
    const music = this.sound.add(song);
    // switch song once the current one ends
    music.on("complete", () => {
      this.createMusic();
      music.destroy();
    });
    music.play({
      volume: 0.5,
    });
  }

  increaseTrickScore(trick: string) {
    switch (trick) {
      case "flip":
        this.counter.increaseScore(10);
        break;
      default:
        this.counter.increaseScore(1)
        break;
    }
  }

  gameOver() {
    if (this.isGameOver) return;
    this.isGameOver = true;
    this.sound.stopAll();
    this.counter.stop();
    this.playCrashAudio();
    this.obstaclesTimer.destroy();
    this.obstacles.destroy(true);
    const title = "press [ENTER] to restart";
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
    const enterKey = this.input.keyboard!.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
    enterKey.on("down", () => {
      this.scene.restart();
    });

  }

  private playCrashAudio() {
    this.sound.play("crash", { volume: 0.9 });

  }


}