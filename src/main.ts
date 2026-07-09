import './style.css'
import Phaser from 'phaser';
import GameScene from './GameScene';

const config: Phaser.Types.Core.GameConfig = {
	type: Phaser.AUTO,
	width: window.innerWidth,
	height: window.innerHeight,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { x: 0, y: 0 },
			debug: false
		}
	},
	scene: GameScene
};

new Phaser.Game(config);
