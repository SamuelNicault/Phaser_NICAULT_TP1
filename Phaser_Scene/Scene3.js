class Scene3 extends Phaser.Scene {
    constructor() {
        super("Scene_3");
    }


	preload() {

	}

	create() { 
		
		this.text = this.add.text(400,300,'Scene 3 - iii');

		this.cursors = this.input.keyboard.createCursorKeys(); 
	}

	update() {
		if(this.cursors.up.isDown)
		{
			this.scene.start('Scene_1');
		}

	}
}