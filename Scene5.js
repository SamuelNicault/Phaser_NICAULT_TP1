class Scene5 extends Phaser.Scene {
    constructor() {
        super("Scene_5");
    }



preload(){

	this.load.image('credits', 'assets/credits.png');

}

create(){

	this.add.image(500,300,'credits');

}