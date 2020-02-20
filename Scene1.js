class Scene1 extends Phaser.Scene {
    constructor() {
        super("Scene_1");
    }

	init(){
		this.platforms;
		this.platforms1;
		this.sol;
		this.player;
		this.playerj;
		this.tard;
		this.cursors;
		this.glands;
		this.scoreText;
		this.gameOverText;
		this.gameOverTextj;
		this.bomb;
		this.potions
		this.score = 0;
		this.scorej = 0;
		this.vie = 3;
		this.viej = 3;
		this.saut = 2;
		this.sauveSaut = 1;
		this.sprite;
		this.groupeBullets;
		this.tir = 2;
		this.aidePopoText;
		this.aideTirText;
		this.aideGlandText;
		this.aideSortieText;
		this.aideSortie1Text;
		this.aideBombText;
	}


	preload(){
		this.load.image('background','assets/back.png');
		this.load.image('platform', 'assets/platform.png');
		this.load.image('sol', 'assets/sol.png');
		this.load.image('glands', 'assets/gland.png');
		this.load.spritesheet('persoj','assets/RunPig.png', {frameWidth: 38, frameHeight: 26});
		this.load.spritesheet('perso','assets/Run.png', {frameWidth: 40, frameHeight: 28});
		this.load.spritesheet('jump','assets/Jump.png', {frameWidth: 39, frameHeight: 28});
		this.load.spritesheet('idle','assets/Idle.png', {frameWidth: 39, frameHeight: 28});
		this.load.image('bombs','assets/bombs.png');
		this.load.image('vie_3','assets/vie_3.png');
		this.load.image('vie_2','assets/vie_2.png');
		this.load.image('vie_1','assets/vie_1.png');
		this.load.image('potions','assets/potion.png');
		this.load.spritesheet('tard','assets/Tard.png', {frameWidth: 24, frameHeight: 22});
		this.load.image('bullet', 'assets/bullet.png');
		this.load.image('door', 'assets/door.png');
		this.load.image('cible', 'assets/cible.png');



	}

	create(){

		//Monde
		
		this.add.image(500,300,'background');



	//Fonction touché par la bombe


		this.door = this.physics.add.staticGroup();
		this.door.create(900,106, 'door');

		this.platforms = this.physics.add.staticGroup();
		
		this.platforms.create(600,400, 'platform');
		this.platforms.create(500,300, 'platform');
		this.platforms.create(50,250, 'platform');
		this.platforms.create(900,150, 'platform');
		this.platforms.create(800,450, 'platform');
		this.platforms.create(220,480, 'platform');
		this.platforms.create(700,200, 'platform');

		this.platforms1 = this.physics.add.staticGroup();
		

		this.sol = this.physics.add.staticGroup();
		this.sol.create(500,582, 'sol');


		//Vie

		this.vie_1 = this.add.image(70,35,'vie_1');
		this.vie_2 = this.add.image(70,35,'vie_2');
		this.vie_3 = this.add.image(70,35,'vie_3');

		this.vie_1j = this.add.image(930,35,'vie_1');
		this.vie_1j.setFlipX(true);
		this.vie_2j = this.add.image(930,35,'vie_2');
		this.vie_2j.setFlipX(true);
		this.vie_3j = this.add.image(930,35,'vie_3');
		this.vie_3j.setFlipX(true);
		

		//Player 1

		this.player = this.physics.add.sprite(100,450,'perso');
		this.player.direction = 'right';
		this.player.setBounce(0.02);
		this.player.setCollideWorldBounds(true);
		this.player.body.setGravityY(200);
		this.physics.add.collider(this.player,this.platforms);
		this.physics.add.collider(this.player,this.sol);
		this.physics.add.overlap(this.player,this.door, fadeLevel, null, this);

		this.groupeBullets = this.physics.add.group();
	        
	    this.cibles = this.physics.add.group({
	        key: 'cible',
	        repeat: 0,
	        setXY: { x: 500, y: 230, stepX: 110 }
	    });
	    
	    this.cibles.children.iterate(function (cible) {
	        cible.pointsVie=Phaser.Math.Between(1, 5);
	        cible.setBounce(0);
	    });

	    this.physics.add.collider(this.cibles, this.platforms);
	    this.physics.add.collider(this.groupeBullets, this.platforms, destroy, null,this);
	    this.physics.add.overlap(this.groupeBullets, this.cibles, hit, null,this);

		//Récupération des curseurs
		this.keys = this.input.keyboard.addKeys('A,S,P');
		this.cursors = this.input.keyboard.createCursorKeys();
		this.fire = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F);

		//Animations Joueur 1

		this.anims.create({
			key: 'left',
			frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 7}),
			frameRate: 15,
			repeat: -1
		});

		this.anims.create({
			key: 'right',
			frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 7}),
			frameRate: 15,
			repeat: -1
		});

		this.anims.create({
			key: 'jump',
			frames: this.anims.generateFrameNumbers('jump', {start: 0, end: 1}),
			frameRate: 5,
			repeat: -1
		});


		this.anims.create({
			key: 'pause',
			frames: this.anims.generateFrameNumbers('idle', {start: 0, end: 10}),
			frameRate: 8,
			repeat: -1
		});


		//Glands

		this.glands = this.physics.add.group({
			key: 'glands',
			repeat: 0,
			setXY: {x: 12, y: 1, stepX: 70}
		});

		this.physics.add.collider(this.glands, this.platforms);
		this.physics.add.collider(this.glands, this.sol);
		this.physics.add.overlap(this.glands, this.player, collectGland, null, this);
		
		//Texte

		this.scoreText = this.add.text(25,100, 'Score: 0', {fontsize: '32px', fill: '#000'});
		this.gameOverText = this.add.text(450, 250, "GAME OVER MAN", {fontsize: '128px', fill: '#000'});
		this.gameOverText.visible = false;

		this.aidePopoText = this.add.text(600, 520, "Voici une potion, elle redonne de la vie !", {'font': '14px', fill: '#fff'});
		this.aidePopoText.visible = false;


		this.aideTirText = this.add.text(390, 220, "Voici une cible, appuyez sur F !", {'font': '14px', fill: '#fff'});

		this.aideDashText = this.add.text(100, 100, "Mince, vous êtes ralentis, restez appuyez sur A pour courrir !", {'font': '14px', fill: '#fff'});
		this.aideDashText.visible = false;

		this.aideGlandText = this.add.text(100, 160, "Ouah ! Ce truc doit rapporter des points !", {'font': '14px', fill: '#fff'});

		this.aideSortieText = this.add.text(100, 160, "Voilà la sortie ! Mais il va falloir plus de points...", {'font': '14px', fill: '#fff'});

		this.aideSortie1Text = this.add.text(100, 160, "Encore un petit effort.", {'font': '14px', fill: '#fff'});

		this.aideBombText = this.add.text(300, 320, "Attention !!! Le Roi cochon à mis des pièges.", {'font': '14px', fill: '#fff'});

		//Bombes

		this.bombs = this.physics.add.group();
		this.physics.add.collider(this.bombs, this.platforms);
		this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);
		this.physics.add.collider(this.bombs, this.sol);


		//Potion

		this.potions = this.physics.add.group({
			key: 'potions',
			repeat: 0,
			setXY: {x: 750, y: 450, stepX: 70}
		});

		this.physics.add.collider(this.potions, this.platforms);
		this.physics.add.collider(this.potions, this.sol);
		this.physics.add.overlap(this.potions, this.player, collectPotion, null, this);

		//Fonction touché par la bombe

		function hitBomb(player, bomb){
			this.vie --;
			bomb.destroy(true);
		}

		function destroy(bullet, platforms){
			bullet.destroy(true);
		}



		//Fonction récupération Glands

		function collectGland(player, gland){
			gland.disableBody(true,true);
			this.aideDashText.destroy();
			this.aideGlandText.destroy();
			this.score += 10;
			this.scoreText.setText('Score: '+ this.score);
			if (this.glands.countActive(true) === 0){
				this.glands.children.iterate(function(child){
					child.enableBody(true,child.x,0, true, true);
				});
				var x = (player.x < 400) ? 
				Phaser.Math.Between(400,800):
				Phaser.Math.Between(0,400);
				this.bomb = this.bombs.create(x, 16, 'bombs');
				this.bomb.setBounce(0.8);
				this.bomb.setCollideWorldBounds(true);
				this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
			};
		}




		//Fonction potion

		function collectPotion(player, potion){
			potion.disableBody(true,true);
			this.vie ++;
			if (this.potions.countActive(true) === 0){
				this.aidePopoText.destroy();
				if(this.vie<=1){
					this.potions.children.iterate(function(child){
						child.enableBody(true,child.x,child.y, true, true);

					});
				}
			};
		}


		//function tirer(player) {
			//console.log("TIRER");
	        /*this.coefDir;
		    if (this.player.direction == 'left') { this.coefDir = -1; } else { this.coefDir = 1 }
	        // on crée la balle a coté du joueur
	        this.bullet = this.groupeBullets.create(this.player.x + (25 * this.coefDir), this.player.y - 4, 'bullet');
	        // parametres physiques de la balle.
	        this.bullet.body.allowGravity =false;
	        this.bullet.setVelocity(1000 * this.coefDir, 0); // vitesse en x et en y*/
		//}

		function hit (bullet, cible) {
		  cible.pointsVie--;

		  if (cible.pointsVie==0) {
		  	this.aideTirText.destroy();
		  	this.aideDashText.visible = true;
		    cible.destroy(); 
		    this.score += 40;
		    this.scoreText.setText('Score: '+ this.score);
		  } 
		   bullet.destroy();
		}

		function fadeLevel(player, door) {
			this.cameras.main.fade(0xff,4000);
			this.timedEvent = this.time.delayedCall(500, changeLevel, [], this);
		}

		function changeLevel () {
			console.log('change de level');
			this.scene.start('Scene_2');
		}

	}

	update() {
		//Perte de vie

		if (this.vie == 2){
			this.vie_2 = this.add.image(70,35,'vie_2');
			this.vie_3.destroy(true);
		}
		else if (this.vie == 1){
			this.vie_1 = this.add.image(70,35,'vie_1');
			this.vie_2.destroy(true);
		}
		else if (this.vie == 0){
			this.vie_1.destroy(true);
			this.physics.pause();
			this.player.setTint(0xff0000);
			this.player.anims.play('turn');
			this.gameOverText.visible = true;
			this.gameOver = true;
			this.score = 0;
			this.vie = 3;
			this.scorej = 0;
			this.viej = 3;
		}
		if(this.vie == 3){
			this.vie_3 = this.add.image(70,35,'vie_3');
		}


		if(this.vie<=1){
				this.potions.children.iterate(function(child){
					child.enableBody(true,child.x,550, true, true);

				});
		}




		//Déplacement du Joueur 1


		if (this.cursors.space.isDown){
			this.registry.destroy(); // destroy registry
			this.events.off(); // disable all active events
			this.scene.restart(); // restart current scene
		}

		if (this.cursors.left.isDown){
			this.player.direction = 'left';
			this.player.anims.play('right', true);
			this.player.setVelocityX(-150);
			this.player.setFlipX(true);
			if(this.keys.A.isDown){
				this.player.anims.play('right', true);
				this.player.setFlipX(true);
				this.player.setVelocityX(-200);
			}
		}
		else if (this.cursors.right.isDown){
			this.player.direction = 'right';
			this.player.anims.play('left', true);
			this.player.setFlipX(false);
			this.player.setVelocityX(150);
			if(this.keys.A.isDown){
				this.player.anims.play('left', true);
				this.player.setFlipX(false);
				this.player.setVelocityX(200);
			}

		}


		

		else{
	        this.player.anims.play('pause', true);
			this.player.setVelocityX(0);
			
		}


		if ((this.player.body.touching.down) && (this.cursors.up.isDown)){
			this.saut = 2;
		}

		if ((this.sauveSaut==1) && (this.saut > 0) && (this.cursors.up.isDown)){
			this.saut --;
			this.sauveSaut = 0;
			if (this.saut==1) {
				if(this.score<40){
					this.player.setVelocityY(-350);
				}
				else{
					this.player.setVelocityY(-250);
				}
				if (this.player.body.velocity.y < 0) {
					this.player.anims.play('jump', true);
				}
			}
			if (this.saut==0) {
				if(this.score<40){
					this.player.setVelocityY(-350);
				}
				else{
					this.player.setVelocityY(-250);
				}
				if (this.player.body.velocity.y < 0) {
					this.player.anims.play('jump', true);
				}
			}
		}

		if (this.cursors.up.isUp){
			this.sauveSaut = 1;
		}

		if (Phaser.Input.Keyboard.JustDown(this.fire)) {
		        this.coefDir;
			    if (this.player.direction == 'left') { this.coefDir = -1; } else { this.coefDir = 1 }
		        // on crée la balle a coté du joueur
		        this.bullet = this.groupeBullets.create(this.player.x + (25 * this.coefDir), this.player.y - 4, 'bullet');
		        // parametres physiques de la balle.
		        this.bullet.body.allowGravity =false;
		        this.bullet.setVelocity(1000 * this.coefDir, 0); // vitesse en x et en y
	    }


		if(this.keys.P.isDown){
			this.scene.start('Scene_2');
		}

		if(this.score<=0){
			this.platforms1.create(800,100, 'platform').setAlpha(0);
			this.platforms1.create(800,70, 'platform').setAlpha(0);
			this.platforms1.create(800,30, 'platform').setAlpha(0);
		}

		if(this.score>=100){
			this.platforms1.destroy(true);

		}

		if(this.player.x > 460 && this.player.x < 760 && this.player.y >= 520){
			this.aidePopoText.visible = true;
		}
		else{
			this.aidePopoText.visible = false;
		}

		if(this.player.x > 420 && this.player.x < 560 && this.player.y <= 350){
			this.aideTirText.visible = true;
		}
		else{
			this.aideTirText.visible = false;
		}

		if(this.player.x > 10 && this.player.x < 400 && this.player.y <= 280){
			this.aideGlandText.visible = true;
		}
		else{
			this.aideGlandText.visible = false;
		}

		if(this.player.x > 600 && this.player.x < 1000 && this.player.y <= 400 && this.score<40){
			this.aideSortieText.visible = true;
		}
		else{
			this.aideSortieText.visible = false;
		}

		if(this.player.x > 600 && this.player.x < 1000 && this.player.y <= 400 && this.score>=40 && this.score<=90){
			this.aideSortie1Text.visible = true;
		}
		else{
			this.aideSortie1Text.visible = false;
		}
		
		if(this.score >= 50 && this.score < 110){
			this.aideBombText.visible = true;
		}
		else{
			this.aideBombText.visible = false;
		}
	}
}