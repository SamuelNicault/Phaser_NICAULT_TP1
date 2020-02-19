class Scene4 extends Phaser.Scene {
    constructor() {
        super("Scene_4");
    }




init(){
	this.platforms;
	this.sol;
	this.player;
	this.playerj;
	this.tard;
	this.cursors;
	this.glands;
	this.scoreText;
	this.gameOverText;
	this.scoreTextj;
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
	this.load.image('vie_0','assets/vie_0.png');
	this.load.image('potions','assets/potion.png');
	this.load.spritesheet('tard','assets/Tard.png', {frameWidth: 24, frameHeight: 22});
	this.load.image('bullet', 'assets/bullet.png');
	this.load.spritesheet('skull','assets/skull.png', {frameWidth: 39, frameHeight: 28});
	this.load.image('cible', 'assets/cible.png');

}

create(){

	//Monde
	
	this.add.image(500,300,'background');

	this.platforms = this.physics.add.staticGroup();
	this.platforms.create(600,400, 'platform');
	this.platforms.create(500,300, 'platform');
	this.platforms.create(50,250, 'platform');
	this.platforms.create(900,150, 'platform');
	this.platforms.create(800,450, 'platform');
	this.platforms.create(220,480, 'platform');

	this.sol = this.physics.add.staticGroup();
	this.sol.create(500,582, 'sol');


	//Vie

	this.vie_0 = this.add.image(70,35,'vie_0');
	this.vie_1 = this.add.image(70,35,'vie_1');
	this.vie_2 = this.add.image(70,35,'vie_2');
	this.vie_3 = this.add.image(70,35,'vie_3');

	this.vie_0j = this.add.image(930,35,'vie_0');
	this.vie_0j.setFlipX(true);
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

	this.groupeBullets = this.physics.add.group();
        
    this.cibles = this.physics.add.group({
        key: 'cible',
        repeat: 7,
        setXY: { x: 12, y: 0, stepX: 110 }
    });
    
    this.cibles.children.iterate(function (cible) {
        cible.pointsVie=Phaser.Math.Between(1, 5);
        cible.y = Phaser.Math.Between(10,250);
        cible.setBounce(1);
    });

    this.physics.add.collider(this.cibles, this.platforms);
    this.physics.add.collider(this.groupeBullets, this.platforms, destroy, null,this);
    this.physics.add.overlap(this.groupeBullets, this.cibles, hit, null,this);

	//Récupération des curseurs
	this.keys = this.input.keyboard.addKeys('A,S,D,F');
	this.cursors = this.input.keyboard.createCursorKeys();


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


	//Player 2


	this.playerj = this.physics.add.sprite(600,450,'persoj');
	this.playerj.setCollideWorldBounds(true);
	this.playerj.setBounce(0.02);
	this.playerj.body.setGravityY(200);
	this.physics.add.collider(this.playerj,this.platforms);
	this.physics.add.collider(this.playerj,this.sol);

	//Animations Joueur 2

	this.anims.create({
		key: 'leftj',
		frames: this.anims.generateFrameNumbers('persoj', {start: 0, end: 3}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: 'jumpj',
		frames: this.anims.generateFrameNumbers('persoj', {start: 5, end: 6}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: 'pausej',
		frames: [{key: 'persoj', frame: 4}],
		frameRate: 20
	});


	// Ennemis 
	
	this.tard = this.physics.add.sprite(100,100,'tard');
	this.tard.setCollideWorldBounds(true);
	this.tard.setBounce(0.02);
	this.tard.body.setGravityY(200);
	this.physics.add.collider(this.tard,this.platforms);
	this.physics.add.collider(this.tard,this.sol);

	this.tard1 = this.physics.add.sprite(280,380,'tard');
	this.tard1.setCollideWorldBounds(true);
	this.tard1.setBounce(0.02);
	this.tard1.body.setGravityY(200);
	this.physics.add.collider(this.tard1,this.platforms);
	this.physics.add.collider(this.tard1,this.sol);
	
	
	this.anims.create({
		key: 'idle_tard',
		frames: this.anims.generateFrameNumbers('tard', {start: 0, end: 2}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: 'mvt_tard',
		frames: this.anims.generateFrameNumbers('tard', {start: 3, end: 9}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: 'attak_tard',
		frames: this.anims.generateFrameNumbers('tard', {start: 10, end: 12}),
		frameRate: 5,
		repeat: -1
	});

	//Enemies volants

	
	this.skull = this.physics.add.sprite(100,100,'skull');
	this.skull.setCollideWorldBounds(true);
	this.skull.body.setGravityY(0);
	this.physics.add.collider(this.skull,this.platforms);
	this.physics.add.collider(this.skull,this.sol);

	
	this.anims.create({
		key: 'skull',
		frames: this.anims.generateFrameNumbers('skull', {start: 0, end: 2}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: 'mvt_skull',
		frames: this.anims.generateFrameNumbers('skull', {start: 3, end: 9}),
		frameRate: 5,
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
	this.physics.add.overlap(this.glands, this.playerj, collectGlandj, null, this);
	
	//Texte

	this.scoreText = this.add.text(25,100, 'Score: 0', {fontsize: '32px', fill: '#000'});
	this.gameOverText = this.add.text(450, 250, "GAME OVER MAN", {fontsize: '128px', fill: '#000'});
	this.gameOverText.visible = false
	this.scoreTextj = this.add.text(900,100, 'Score: 0', {fontsize: '32px', fill: '#000'});
	this.gameOverTextj = this.add.text(450, 250, 'GAME OVER DIN DON', {fontsize: '128px', fill: '#000'});
	this.gameOverTextj.visible = false


	//Bombes

	this.bombs = this.physics.add.group();
	this.physics.add.collider(this.bombs, this.platforms);
	this.physics.add.overlap(this.player,this.playerj);
	this.physics.add.collider(this.player, this.bombs, hitBomb, null, this);
	this.physics.add.collider(this.player, this.playerj, hitPlayerJ, null, this);
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
	this.physics.add.overlap(this.potions, this.playerj, collectPotionj, null, this);

	//Fonction touché par la bombe

	function hitBomb(player, bomb){
		this.vie --;
		bomb.destroy(true);
	}

	function destroy(bullet, platforms){
		bullet.destroy(true);
	}



	function hitPlayerJ(player, playerj){
		if(this.vie == 3){
			this.vie --;
		}

		//A ajouter un cooldown
		if(this.vie == 1){
			this.vie --;
		}
	}


	function hitTard(player, tard){
		this.vie --;
	}
	//Fonction récupération Glands

	function collectGland(player, gland){
		gland.disableBody(true,true);
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

	function collectGlandj(playerj, gland){
		this.gland.disableBody(true,true);
		this.scorej += 10;
		this.scoreTextj.setText('Score: '+ this.scorej);
		if (this.glands.countActive(true) === 0){
			this.glands.children.iterate(function(child){
				child.enableBody(true,child.x,0, true, true);
			});
			var x = (this.playerj.x < 400) ? 
			Phaser.Math.Between(400,800):
			Phaser.Math.Between(0,400);
			var bomb = this.bombs.create(x, 16, 'bombs');
			this.bomb.setBounce(1);
			this.bomb.setCollideWorldBounds(true);
			this.bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
		};
	}


	//Fonction potion

	function collectPotion(player, potion){
		potion.disableBody(true,true);
		this.vie ++;
		if (this.potions.countActive(true) === 0){
			if(this.vie<=1){
				this.potions.children.iterate(function(child){
					child.enableBody(true,child.x,550, true, true);

				});
			}
		};
	}

	function collectPotionj(playerj, potion){
		potion.disableBody(true,true);
		this.scorej += 10;
		this.scoreTextj.setText('Score: '+ this.scorej);
		if (this.potions.countActive(true) === 0){
			this.potions.children.iterate(function(child){
				child.enableBody(true,child.x,550, true, true);
			});
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
	    cible.destroy(); 
	  } 
	   bullet.destroy();
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




	if (this.viej == 2){
		this.vie_3j.destroy(true);
	}
	else if (this.viej == 1){
		this.vie_2j.destroy(true);
	}
	else if (this.viej == 0){
		this.vie_1j.destroy(true);
		this.physics.pause();
		this.playerj.setTint(0xff0000);
		this.playerj.anims.play('turn');
		this.gameOverTextj.visible = true;
		this.gameOverj = true;
		this.scorej = 0;
		this.viej = 3;
		this.score = 0;
		this.vie = 3;
	}


	//Déplacement du Joueur 1


	if (this.cursors.space.isDown){
		this.registry.destroy(); // destroy registry
		this.events.off();﻿ // disable all active events
		this.scene.restart();﻿﻿﻿﻿ // restart current scene
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
			this.player.setVelocityY(-250);
			if (this.player.body.velocity.y < 0) {
				this.player.anims.play('jump', true);
			}
		}
		if (this.saut==0) {
			this.player.setVelocityY(-250);
			if (this.player.body.velocity.y < 0) {
				this.player.anims.play('jump', true);
			}
		}
	}

	if (this.cursors.up.isUp){
		this.sauveSaut = 1;
	}

	if (this.keys.F.isDown) {
	        this.coefDir;
		    if (this.player.direction == 'left') { this.coefDir = -1; } else { this.coefDir = 1 }
	        // on crée la balle a coté du joueur
	        this.bullet = this.groupeBullets.create(this.player.x + (25 * this.coefDir), this.player.y - 4, 'bullet');
	        // parametres physiques de la balle.
	        this.bullet.body.allowGravity =false;
	        this.bullet.setVelocity(1000 * this.coefDir, 0); // vitesse en x et en y
    }
	//Déplacement du Joueur 2



    if (this.playerj.x >= this.player.x){
    	this.tweens.add({
	    	targets: this.playerj,
	   	 	
	   	 	x : -100,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 6000,
	    	repeat: -1,            // -1: infinity
	    	yoyo: false
		});
		this.playerj.anims.play('leftj', true);
		this.playerj.setVelocityX(-100);
		this.playerj.setFlipX(false);
	}
	
	if (this.playerj.x <= this.player.x){
		this.tweens.add({
	    	targets: this.playerj,
	   	 	
	   	 	x : 1100,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 6000,
	    	repeat: 0,            // -1: infinity
	    	yoyo: false
		});
		this.playerj.anims.play('leftj', true);
		this.playerj.setFlipX(true);
		this.playerj.setVelocityX(100);

	}

	if (this.tard.x >= 90){
    	this.tweens.add({
	    	targets: this.tard,
	   	 	
	   	 	x : -100,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 8000,
	    	repeat: -1,            // -1: infinity
	    	yoyo: false
		});
		this.tard.anims.play('mvt_tard', true);
		this.tard.setVelocityX(-200);
		this.tard.setFlipX(true);
	}
	
	if (this.tard.x <= 5){
		this.tweens.add({
	    	targets: this.tard,
	   	 	
	   	 	x : 120,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 8000,
	    	repeat: 0,            // -1: infinity
	    	yoyo: false
		});
		this.tard.anims.play('mvt_tard', true);
		this.tard.setFlipX(false);
		this.tard.setVelocityX(200);

	}

	if (this.tard1.x >= 260){
    	this.tweens.add({
	    	targets: this.tard1,
	   	 	
	   	 	x : -100,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 8000,
	    	repeat: -1,            // -1: infinity
	    	yoyo: false
		});
		this.tard1.anims.play('mvt_tard', true);
		this.tard1.setVelocityX(-200);
		this.tard1.setFlipX(true);
	}
	
	if (this.tard1.x <= 180){
		this.tweens.add({
	    	targets: this.tard1,
	   	 	
	   	 	x : 520,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 8000,
	    	repeat: 0,            // -1: infinity
	    	yoyo: false
		});
		this.tard1.anims.play('mvt_tard1', true);
		this.tard1.setFlipX(false);
		this.tard1.setVelocityX(200);

	}

	//mvt skull

	if (this.skull.y >= 50){
    	this.tweens.add({
	    	targets: this.skull,
	   	 	
	   	 	y : 400,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 8000,
	    	repeat: -1,            // -1: infinity
	    	yoyo: false
		});
		this.skull.anims.play('mvt_skull', true);
		this.skull.setVelocityX(-400);
		this.skull.setFlipX(true);
	}
	
	if (this.skull.y <= 600){
		this.tweens.add({
	    	targets: this.skull,
	   	 	
	   	 	y : 400,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 8000,
	    	repeat: 1,            // -1: infinity
	    	yoyo: false
		});
		this.skull.anims.play('mvt_skull', true);
		this.skull.setFlipX(false);
		this.skull.setVelocityX(200);

	}

}



}