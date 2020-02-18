class Scene2 extends Phaser.Scene {
    constructor() {
        super("Scene_2");
    }


	preload() {

	}

	create() { 
		var text;
		text = this.add.text(400,300,'Scene 2 - aaa');

		this.cursors = this.input.keyboard.createCursorKeys(); 
	}

	update() {
		if(this.cursors.up.isDown)
		{
			this.scene.start('Scene_3');
		}
	}
}