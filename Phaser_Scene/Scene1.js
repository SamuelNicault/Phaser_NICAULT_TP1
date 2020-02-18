class Scene1 extends Phaser.Scene {
    constructor() {
        super("Scene_1");
    }


	preload() {

	}

	create() { 
		var text;
		text = this.add.text(400,300,'Scene 1 - ooo');

		this.cursors = this.input.keyboard.createCursorKeys(); 
	}

	update() {
		if(this.cursors.up.isDown)
		{
			this.scene.start('Scene_2');
		}


	}
}