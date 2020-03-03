var config = {
	type: Phaser.AUTO,
	width: 1000,
	height: 600,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: {y: 300},
			debug: false

		}
	},

	scene: [Title, Scene1, Scene2, Scene3, Scene4, Scene5]

};

var game = new Phaser.Game(config);