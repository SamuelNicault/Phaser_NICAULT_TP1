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
	scene: {
		preload: preload,
		create: create,
		update: update
	}
};

var game = new Phaser.Game(config);
var score = 0;
var scorej = 0;
var vie = 3;
var viej = 3;
var saut = 2;
var sauveSaut = 1;
var attack = 1;
var direction = 'right';
var boutonFeu;

function init(){
	var platforms;
	var sol;
	var player;
	var playerj;
	var tard;
	var cursors;
	var glands;
	var scoreText;
	var gameOverText;
	var scoreTextj;
	var gameOverTextj;
	var bomb;
	var potions
}

function preload(){
	this.load.image('background','assets/back.png');
	this.load.image('platform', 'assets/platform.png');
	this.load.image('sol', 'assets/sol.png');
	this.load.image('glands', 'assets/gland.png');
	this.load.spritesheet('persoj','assets/RunPig.png', {frameWidth: 38, frameHeight: 26});
	this.load.spritesheet('perso','assets/Run.png', {frameWidth: 40, frameHeight: 28});
	this.load.spritesheet('jump','assets/Jump.png', {frameWidth: 39, frameHeight: 28});
	this.load.spritesheet('idle','assets/Idle.png', {frameWidth: 39, frameHeight: 28});
	this.load.spritesheet('attack','assets/Attack.png', {frameWidth: 59, frameHeight: 55});
	this.load.image('bombs','assets/bombs.png');
	this.load.image('vie_3','assets/vie_3.png');
	this.load.image('vie_2','assets/vie_2.png');
	this.load.image('vie_1','assets/vie_1.png');
	this.load.image('vie_0','assets/vie_0.png');
	this.load.image('potions','assets/potion.png');
	this.load.spritesheet('tard','assets/Tard.png', {frameWidth: 24, frameHeight: 22});

}

function create(){

	//Monde
	
	this.add.image(500,300,'background');

	platforms = this.physics.add.staticGroup();
	platforms.create(600,400, 'platform');
	platforms.create(500,300, 'platform');
	platforms.create(50,250, 'platform');
	platforms.create(900,150, 'platform');
	platforms.create(800,450, 'platform');
	platforms.create(220,480, 'platform');

	sol = this.physics.add.staticGroup();
	sol.create(500,582, 'sol');


	//Vie

	vie_0 = this.add.image(70,35,'vie_0');
	vie_1 = this.add.image(70,35,'vie_1');
	vie_2 = this.add.image(70,35,'vie_2');
	vie_3 = this.add.image(70,35,'vie_3');

	vie_0j = this.add.image(930,35,'vie_0');
	vie_0j.setFlipX(true);
	vie_1j = this.add.image(930,35,'vie_1');
	vie_1j.setFlipX(true);
	vie_2j = this.add.image(930,35,'vie_2');
	vie_2j.setFlipX(true);
	vie_3j = this.add.image(930,35,'vie_3');
	vie_3j.setFlipX(true);
	

	//Player 1

	player = this.physics.add.sprite(100,450,'perso');
	player.setCollideWorldBounds(true);
	player.setBounce(0.02);
	player.body.setGravityY(200);
	this.physics.add.collider(player,platforms);
	this.physics.add.collider(player,sol);


	//Récupération des curseurs
	keys = this.input.keyboard.addKeys('A,F,S,D');
	cursors = this.input.keyboard.createCursorKeys();


	//Animations Joueur 1

	this.anims.create({
		key: 'left',
		frames: this.anims.generateFrameNumbers('perso', {start: 0, end: 3}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: 'jump',
		frames: this.anims.generateFrameNumbers('jump', {start: 0, end: 1}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: 'ground',
		frames: this.anims.generateFrameNumbers('jump', {start: 2, end: 2}),
		frameRate: 5,
		repeat: -1
	});

	this.anims.create({
		key: 'pause',
		frames: this.anims.generateFrameNumbers('idle', {start: 0, end: 10}),
		frameRate: 8,
		repeat: -1
	});


	this.anims.create({
		key: 'attack',
		frames: this.anims.generateFrameNumbers('attack', {start: 0, end: 2}),
		frameRate: 5,
	});
	//Player 2


	playerj = this.physics.add.sprite(25,450,'persoj');
	playerj.setCollideWorldBounds(true);
	playerj.setBounce(0.02);
	playerj.body.setGravityY(200);
	this.physics.add.collider(playerj,platforms);
	this.physics.add.collider(playerj,sol);

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
	
	tard = this.physics.add.sprite(100,100,'tard');
	tard.setCollideWorldBounds(true);
	tard.setBounce(0.02);
	tard.body.setGravityY(200);
	this.physics.add.collider(tard,platforms);
	this.physics.add.collider(tard,sol);

	tard1 = this.physics.add.sprite(280,380,'tard');
	tard1.setCollideWorldBounds(true);
	tard1.setBounce(0.02);
	tard1.body.setGravityY(200);
	this.physics.add.collider(tard1,platforms);
	this.physics.add.collider(tard1,sol);
	
	
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


	
	
	

	//Glands

	glands = this.physics.add.group({
		key: 'glands',
		repeat: 0,
		setXY: {x: 12, y: 1, stepX: 70}
	});

	this.physics.add.collider(glands, platforms);
	this.physics.add.collider(glands, sol);
	this.physics.add.overlap(glands, player, collectGland, null, this);
	this.physics.add.overlap(glands, playerj, collectGlandj, null, this);
	
	//Texte

	scoreText = this.add.text(25,100, 'Score: 0', {fontsize: '32px', fill: '#000'});
	gameOverText = this.add.text(450, 250, "GAME OVER MAN", {fontsize: '128px', fill: '#000'});
	gameOverText.visible = false
	scoreTextj = this.add.text(900,100, 'Score: 0', {fontsize: '32px', fill: '#000'});
	gameOverTextj = this.add.text(450, 250, 'GAME OVER DIN DON', {fontsize: '128px', fill: '#000'});
	gameOverTextj.visible = false


	//Bombes

	bombs = this.physics.add.group();
	this.physics.add.collider(bombs, platforms);
	this.physics.add.collider(player, playerj);
	this.physics.add.collider(player, bombs, hitBomb, null, this);
	this.physics.add.collider(player, playerj, hitPlayerJ, null, this);
	this.physics.add.collider(bombs, sol);
	this.physics.add.collider(bombs, bombs, hitBombs, null, this);

	//Tirer

	boutonFeu = this.input.keyboard.addKey('F');

	//Potion

	potions = this.physics.add.group({
		key: 'potions',
		repeat: 0,
		setXY: {x: 750, y: 450, stepX: 70}
	});

	this.physics.add.collider(potions, platforms);
	this.physics.add.collider(potions, sol);
	this.physics.add.overlap(potions, player, collectPotion, null, this);
	this.physics.add.overlap(potions, playerj, collectPotionj, null, this);
}


//Fonction touché par la bombe

function hitBomb(player, bomb){
	vie --;
	bomb.destroy(true);
}

function hitBombs(bomb, bomb){
	
}

function hitPlayerJ(player, playerj){
	vie --;
}


function hitTard(player, tard){
	vie --;
}
//Fonction récupération Glands

function collectGland(player, gland){
	gland.disableBody(true,true);
	score += 10;
	scoreText.setText('Score: '+ score);
	if (glands.countActive(true) === 0){
		glands.children.iterate(function(child){
			child.enableBody(true,child.x,0, true, true);
		});
		var x = (player.x < 400) ? 
		Phaser.Math.Between(400,800):
		Phaser.Math.Between(0,400);
		var bomb = bombs.create(x, 16, 'bombs');
		bomb.setBounce(0.8);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	};
}

function collectGlandj(playerj, gland){
	gland.disableBody(true,true);
	scorej += 10;
	scoreTextj.setText('Score: '+ scorej);
	if (glands.countActive(true) === 0){
		glands.children.iterate(function(child){
			child.enableBody(true,child.x,0, true, true);
		});
		var x = (playerj.x < 400) ? 
		Phaser.Math.Between(400,800):
		Phaser.Math.Between(0,400);
		var bomb = bombs.create(x, 16, 'bombs');
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	};
}

//fonction tir

function tirer(player) {
        var coefDir;
	    if (player.direction == 'left') { 
	    	coefDir = -1; 
	    } 

	    else { 
	    	coefDir = 1; 
	    }
        // on crée la balle a coté du joueur
        var bullet = groupeBullets.create(player.x + (25 * coefDir), player.y - 4, 'bullet');
        // parametres physiques de la balle.
        bullet.setCollideWorldBounds(true);
        bullet.body.allowGravity =false;
        bullet.setVelocity(1000 * coefDir, 0); // vitesse en x et en y
}

//Fonction potion

function collectPotion(player, potion){
	potion.disableBody(true,true);
	vie ++;
	score += 10;
	scoreText.setText('Score: '+ score);
	if (potions.countActive(true) === 0){
		potions.children.iterate(function(child){
			child.enableBody(true,child.x,0, true, true);
		});
		var x = (player.x < 400) ? 
		Phaser.Math.Between(400,800):
		Phaser.Math.Between(0,400);
		var bomb = bombs.create(x, 16, 'bombs');
		bomb.setBounce(0.8);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	};
}

function collectPotionj(playerj, potion){
	potion.disableBody(true,true);
	scorej += 10;
	scoreTextj.setText('Score: '+ scorej);
	if (potions.countActive(true) === 0){
		potions.children.iterate(function(child){
			child.enableBody(true,child.x,0, true, true);
		});
		var x = (playerj.x < 400) ? 
		Phaser.Math.Between(400,800):
		Phaser.Math.Between(0,400);
		var bomb = bombs.create(x, 16, 'bombs');
		bomb.setBounce(1);
		bomb.setCollideWorldBounds(true);
		bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
	};
}


function update() {


	//Perte de vie

	if (vie == 2){
		vie_2 = this.add.image(70,35,'vie_2');
		vie_3.destroy(true);
	}
	else if (vie == 1){
		vie_1 = this.add.image(70,35,'vie_1');
		vie_2.destroy(true);
	}
	else if (vie == 0){
		vie_1.destroy(true);
		this.physics.pause();
		player.setTint(0xff0000);
		player.anims.play('turn');
		gameOverText.visible = true;
		gameOver = true;
		score = 0;
		vie = 3;
		scorej = 0;
		viej = 3;
	}
	if(vie == 3){
		vie_3 = this.add.image(70,35,'vie_3');
	}







	if (viej == 2){
		vie_3j.destroy(true);
	}
	else if (viej == 1){
		vie_2j.destroy(true);
	}
	else if (viej == 0){
		vie_1j.destroy(true);
		this.physics.pause();
		playerj.setTint(0xff0000);
		playerj.anims.play('turn');
		gameOverTextj.visible = true;
		gameOverj = true;
		scorej = 0;
		viej = 3;
		score = 0;
		vie = 3;
	}


	//Déplacement du Joueur 1

	if(player.body.deltaY() > 0 && player.body.onFloor()){
		if (!player.body.touching.down){        // while player's in the air
	        if (player.body.touching.down){     // when player hit the groud
	            player.setVelocityX(0);
	            player.anims.play('ground');      // play landing animation
	        }
	    }
	}

	if ((player.body.touching.down) && (cursors.up.isDown)){
		saut = 2;
	}

	if ((sauveSaut==1) && (saut > 0) && (cursors.up.isDown)){
		saut --;
		sauveSaut = 0;
		if (saut==1) {
			player.setVelocityY(-350);
			if (player.body.velocity.y < 0) {
				player.anims.play('jump', true);
			}
		}
		if (saut==0) {
			player.setVelocityY(-250);
			if (player.body.velocity.y < 0) {
				player.anims.play('jump', true);
			}
		}
	}

	if (cursors.up.isUp){
		sauveSaut = 1;
	}


	if (cursors.space.isDown){
		this.registry.destroy(); // destroy registry
		this.events.off();﻿ // disable all active events
		this.scene.restart();﻿﻿﻿﻿ // restart current scene
	}

	if (cursors.left.isDown){
		player.anims.play('left', true);
		player.setVelocityX(-200);
		player.setFlipX(true);
		player.direction = 'left';
	}
	else if (cursors.right.isDown){
		player.anims.play('left', true);
		player.setFlipX(false);
		player.setVelocityX(200);
		player.anims.play('right', true);
		player.direction = 'left';

	}

	else{

		if ((attack > 0) && (keys.A.isDown)){
			
			player.anims.play('attack', true);
			
		}

        else {
        	player.anims.play('pause', true);
			player.setVelocityX(0);
		}
	}


	

	if (keys.A.isUp){
		attack = 1;
	}

	
	if ( Phaser.Input.Keyboard.JustDown(boutonFeu)) {
		tirer(player, direction);
	}	
	

	//Déplacement du Joueur 2



    if (playerj.x >= player.x){
    	this.tweens.add({
	    	targets: playerj,
	   	 	
	   	 	x : 50,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 3000,
	    	repeat: -1,            // -1: infinity
	    	yoyo: false
		});
		playerj.anims.play('leftj', true);
		playerj.setVelocityX(-200);
		playerj.setFlipX(false);
	}
	
	if (playerj.x <= player.x){
		this.tweens.add({
	    	targets: playerj,
	   	 	
	   	 	x : 750,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 3000,
	    	repeat: 0,            // -1: infinity
	    	yoyo: false
		});
		playerj.anims.play('leftj', true);
		playerj.setFlipX(true);
		playerj.setVelocityX(200);

	}

	if (tard.x >= 90){
    	this.tweens.add({
	    	targets: tard,
	   	 	
	   	 	x : -100,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 8000,
	    	repeat: -1,            // -1: infinity
	    	yoyo: false
		});
		tard.anims.play('mvt_tard', true);
		tard.setVelocityX(-200);
		tard.setFlipX(true);
	}
	
	if (tard.x <= 5){
		this.tweens.add({
	    	targets: tard,
	   	 	
	   	 	x : 120,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 8000,
	    	repeat: 0,            // -1: infinity
	    	yoyo: false
		});
		tard.anims.play('mvt_tard', true);
		tard.setFlipX(false);
		tard.setVelocityX(200);

	}

	if (tard1.x >= 260){
    	this.tweens.add({
	    	targets: tard1,
	   	 	
	   	 	x : -100,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 8000,
	    	repeat: -1,            // -1: infinity
	    	yoyo: false
		});
		tard1.anims.play('mvt_tard', true);
		tard1.setVelocityX(-200);
		tard1.setFlipX(true);
	}
	
	if (tard1.x <= 180){
		this.tweens.add({
	    	targets: tard1,
	   	 	
	   	 	x : 520,
	    	// alpha: { start: 0, to: 1 },
	    	// alpha: 1,
	    	// alpha: '+=1',
	    	ease: 'Linear',       // 'Cubic', 'Elastic', 'Bounce', 'Back'
	    	duration: 8000,
	    	repeat: 0,            // -1: infinity
	    	yoyo: false
		});
		tard1.anims.play('mvt_tard1', true);
		tard1.setFlipX(false);
		tard1.setVelocityX(200);

	}

}