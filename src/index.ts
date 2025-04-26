import { Game } from "phaser";
import { BootloaderScene } from "./scenes/BootloaderScene";
import { StartScene } from "./scenes/StartScene";
import { GameScene } from "./scenes/GameScene";

export default new Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [
    BootloaderScene,
    StartScene,
    GameScene,
  ],
  render: {
    pixelArt: true
  },
  physics: {
    default: "arcade",
    arcade: {
      gravity: { y: 1300, x: 0 },
      debug: false,
    },
  }
});