var config = {
	type: Phaser.AUTO,
	width: 1000,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 300},
			debug: true

		}
	},
	scene: [Scene1, Scene3]
};

var game = new Phaser.Game(config);