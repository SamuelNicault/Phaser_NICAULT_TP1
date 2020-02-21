class Title extends Phaser.Scene {
    constructor() {
        super("Title");
    }

	init(){
		this.platforms;
		this.sol;
		this.cursors;
		this.player;
		this.enterText;
		this.exitText;
	}


	preload(){
		this.load.image('background','assets/back.png');
		this.load.image('platform', 'assets/platform.png');
		this.load.image('sol', 'assets/sol.png');
		this.load.image('door', 'assets/door.png');
		this.load.spritesheet('perso','assets/Run.png', {frameWidth: 40, frameHeight: 28});
		this.load.spritesheet('idle','assets/Idle.png', {frameWidth: 39, frameHeight: 28});
	}

	create(){

		//Monde
		
		this.add.image(500,300,'background');



	//Fonction touché par la bombe


		this.door = this.physics.add.staticGroup();
		this.door.create(500,200, 'door');
		this.door.create(500,356, 'door');

		this.bouton1 = this.physics.add.staticGroup();
		this.bouton1.create(500,244, 'platform');

		this.bouton = this.physics.add.staticGroup();
		this.bouton.create(500,400, 'platform');
		


		this.sol = this.physics.add.staticGroup();
		this.sol.create(500,582, 'sol');
		this.sol.create(500,582, 'sol');

		//Récupération des curseurs
		this.keys = this.input.keyboard.addKeys('A,S,P');
		this.cursors = this.input.keyboard.createCursorKeys();

		
		this.player = this.physics.add.sprite(500,212,'perso');
		this.player.setCollideWorldBounds(true);
		this.player.body.setGravityY(-300);
		this.physics.add.collider(this.bouton, this.player, hitBouton, null, this);
		this.physics.add.collider(this.bouton1, this.player, hitBouton1, null, this);
		this.physics.add.collider(this.player,this.sol);

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 7}),
			frameRate: 15,
			repeat: -1
		});

		this.anims.create({
			key: 'pause',
			frames: this.anims.generateFrameNumbers('idle', {start: 0, end: 10}),
			frameRate: 8,
			repeat: -1
		});
		

		this.enterText = this.add.text(340, 100, "Allez chercher votre couronne. 'P'", {'font': '16px', fill: '#fff'});
		this.enterText.visible = false;

		this.exitText = this.add.text(320, 100, "Laissez votre couronne au Roi cochon. 'S'", {'font': '16px', fill: '#fff'});
		this.exitText.visible = false;



		function hitBouton(player, bouton){
		}

		function hitBouton1(player, bouton1){
		}


	}

	update() {
		
		if (this.cursors.left.isDown){
			this.player.anims.play('left', true);
			this.player.setVelocityX(-150);
			this.player.setFlipX(true);
		}
		else if (this.cursors.right.isDown){
			this.player.anims.play('left', true);
			this.player.setFlipX(false);
			this.player.setVelocityX(150);
		}

		else if (this.cursors.down.isDown){
			this.player.anims.play('left', true);
			this.player.setFlipX(false);
			this.player.setVelocityY(150);
		}

		else if (this.cursors.up.isDown){
			this.player.anims.play('left', true);
			this.player.setFlipX(false);
			this.player.setVelocityY(-150);
		}

		else{
	        this.player.anims.play('pause', true);
			this.player.setVelocityX(0);
			this.player.setVelocityY(0);
			
		}

		if(this.player.y >= 120 && this.player.y <= 260 && this.player.x >= 420 && this.player.x <= 580){
			this.enterText.visible = true;
		}


		else if(this.player.y >= 340 && this.player.x >= 420 && this.player.x <= 580){
			this.exitText.visible = true;
		}

		else{
			this.enterText.visible = false;
			this.exitText.visible = false;
		}

		if(this.keys.P.isDown){
			this.scene.start('Scene_1');
		}

		if(this.keys.S.isDown){
			this.scene.stop();
		}

	}
}