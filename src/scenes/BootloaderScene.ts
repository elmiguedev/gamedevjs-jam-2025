import { Scene } from "phaser";
import SkatePng from "../assets/skate/skate.png";
import SkateJson from "../assets/skate/skate.json";
import ObstaclesPng from "../assets/obstacles/obstacles.png";
import ObstaclesJson from "../assets/obstacles/obstacles.json";
import Song1Ogg from "../assets/sounds/songs/ratm.ogg";
import Song2Ogg from "../assets/sounds/songs/rhcp.ogg";
import Jump1Ogg from "../assets/sounds/sfx/jump.ogg";
import Jump2Ogg from "../assets/sounds/sfx/jump2.ogg";
import CrashOgg from "../assets/sounds/sfx/crash.ogg";
import PointOgg from "../assets/sounds/sfx/point.ogg";
import OllieOgg from "../assets/sounds/sfx/ollie.ogg";
import TrickOgg from "../assets/sounds/sfx/trick.ogg";

export class BootloaderScene extends Scene {
  constructor() {
    super({ key: "BootloaderScene" });


  }

  preload() {
    this.cameras.main.setBackgroundColor(0xFFFFFF);
    this.load.audio("song1", Song1Ogg);
    this.load.audio("song2", Song2Ogg);
    this.load.audio("jump1", Jump1Ogg);
    this.load.audio("jump2", Jump2Ogg);
    this.load.audio("crash", CrashOgg);
    this.load.audio("point", PointOgg);
    this.load.audio("ollie", OllieOgg);
    this.load.audio("trick", TrickOgg);
    this.load.aseprite("skate", SkatePng, SkateJson);
    this.load.aseprite("obstacles", ObstaclesPng, ObstaclesJson);
    this.load.on("complete", () => {
      this.scene.start("StartScene");
    });
  }
}