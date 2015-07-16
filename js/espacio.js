huevo.naves = function(game) {};
var jugador;
//var estrellas;
var cursores;
var intervalobalas = 0;
var vencidas = 50;
var texto;
var cuenta;
var espacio;
var balas;
var balaenemiga;
var disparo;
var enemigos;
var explosiones;
var enemigosvivos = [];
var intervalofuego = 0;
var control = 0;
var irAr = false;
var irAb = false;
var irDisp = false;
huevo.naves.prototype = {
	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.sonidocoger = this.game.add.audio('ping');
		this.sonidosaltar = this.game.add.audio('boing');
		this.sonidopuf = this.game.add.audio('puf');
		this.sonido = this.game.add.audio('sonido');
		this.sonido.loop = true;
		this.sonido.play();
		espacio = this.game.add.tileSprite(0, 0, 800, 600, 'fondo');
		this.game.world.setBounds(0, 0, 800, 600);
		this.game.physics.arcade.enable(espacio, Phaser.Physics.ARCADE);
		balas = game.add.group();
		balas.enableBody = true;
		balas.physicsBodyType = Phaser.Physics.ARCADE;
		balas.createMultiple(30, 'bala');
		balas.setAll('anchor.x', 0.5);
		balas.setAll('anchor.y', 0.5);
		balas.setAll('outOfBoundsKill', true);
		balas.setAll('checkWorldBounds', true);
		balaenemigas = game.add.group();
		balaenemigas.enableBody = true;
		balaenemigas.physicsBodyType = Phaser.Physics.ARCADE;
		balaenemigas.createMultiple(30, 'balas');
		balaenemigas.setAll('anchor.x', 0.5);
		balaenemigas.setAll('anchor.y', 1);
		balaenemigas.setAll('outOfBoundsKill', true);
		balaenemigas.setAll('checkWorldBounds', true);
		enemigos = this.game.add.group();
		enemigos.enableBody = true;
		jugador = this.game.add.sprite(10, (this.game.world.height / 2) - 32, 'nave');
		this.game.physics.arcade.enable(jugador, Phaser.Physics.ARCADE);
		jugador.body.collideWorldBounds = true;
		jugador.animations.add('arriba', [2], 10, true);
		jugador.animations.add('abajo', [0], 10, true);
		this.game.camera.follow(jugador);
		cursores = this.game.input.keyboard.createCursorKeys();
		disparo = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		//estrellas = this.game.add.group();
		//estrellas.enableBody = true;
		explosiones = game.add.group();
		explosiones.createMultiple(30, 'boom');
		frito = this.game.add.group();
		
		// botones de toque
		botonArriba = game.add.button(2, this.game.world.height - 40, 'flechaar', null, this);
		botonArriba.events.onInputDown.add(function() {
			irAr = true;
		});
		botonArriba.events.onInputUp.add(function() {
			irAr = false;
		});
		botonAbajo = game.add.button(66, this.game.world.height - 40, 'flechaab', null, this);
		botonAbajo.events.onInputDown.add(function() {
			irAb = true;
		});
		botonAbajo.events.onInputUp.add(function() {
			irAb = false;
		});
		botonDisparo = game.add.button(this.game.world.width - 36, this.game.world.height - 40, 'disp', null, this);
		botonDisparo.events.onInputDown.add(function() {
			irDisp = true;
		});
		botonDisparo.events.onInputUp.add(function() {
			irDisp = false;
		});
		
		this.cuentavidas();
		puntuacion = this.game.add.text(10, this.game.world.height - 590, 'Puntos: ' + puntos, {
			font: '34px Arial',
			fill: '#fff'
		});
		for (var x = 1000; x > 0; x = x - 100) {
			for (var i = 0; i < 9; i++) {
				var enemigo = enemigos.create(900 + (i * x), i * 70, 'enemigo');
				enemigo.enableBody = true;
				this.game.physics.arcade.enable(enemigo);
				enemigo.body.velocity.setTo(-100, 0);
				enemigo.animations.add('rotar', [0, 1, 2, 3, 4, 5, 6, 7], 10, true);
				enemigo.animations.play('rotar');
			}
		}

	},
	update: function() {
		//		this.game.physics.arcade.overlap(jugador, estrellas, cogeEstrellas, null, this);
		this.game.physics.arcade.overlap(jugador, enemigos, chocaEnemigos, null, this);
		this.game.physics.arcade.overlap(balas, enemigos, pum, null, this);
		this.game.physics.arcade.overlap(jugador, balaenemigas, chocaEnemigos, null, this);
		espacio.tilePosition.x -= 2;
	
		if (cursores.up.isDown || irAr === true) {
			jugador.body.velocity.y = -150;
			jugador.animations.play('arriba');
		} else if (cursores.down.isDown || irAb === true) {
			jugador.body.velocity.y = 150;
			jugador.animations.play('abajo');
		} else {
			jugador.body.velocity.y = 0;
			jugador.frame = 1;
		}
		if (control === 0) {
			if (disparo.isDown || irDisp === true) {
				this.disparar();
			}
		}

		if (game.time.now > intervalofuego) {
			disparoenemigo();
		}

		function chocaEnemigos(jugador, enemigo) {
			this.sonidopuf.play();
			enemigo.kill();
			jugador.kill();
			hfrito = frito.getFirstAlive();
			if (hfrito) {
				hfrito.kill();
			}
			vidas -= 1;
			if (vidas > 0) {
				jugador.revive();
			} else {
				texto = this.game.add.text(400, 300, 'Game Over', {
					fill: 'white'
				});
				texto.anchor.setTo(0.5, 0.5);
				vidas = 3;
				vencidas = 50;
				//puntos = 0;
				game.input.onDown.addOnce(gameover, this);
				control = 1;
			}
			var explosion = explosiones.getFirstExists(false);
			explosion.reset(enemigo.body.x, enemigo.body.y);
			explosion.animations.add('boom', [0, 1, 2, 3, 4, 5], 10, false);
			explosion.play('boom', 30, false, true);
			var explosion = explosiones.getFirstExists(false);
			explosion.reset(jugador.x, jugador.y);
			explosion.animations.add('boom', [0, 1, 2, 3, 4, 5], 10, false);
			explosion.play('boom', 30, false, true);
		}

		function pum(bala, enemigo) {
			this.sonidopuf.play();
			enemigo.kill();
			bala.kill();
			var explosion = explosiones.getFirstExists(false);
			explosion.reset(enemigo.body.x, enemigo.body.y);
			explosion.animations.add('boom', [0, 1, 2, 3, 4, 5], 10, false);
			explosion.play('boom', 30, false, true);
			vencidas = vencidas - 1;
			puntos += 10;
			puntuacion.text = 'Puntos: ' + puntos;
			if (vencidas < 1) {
				enemigos.callAll('kill');
				balaenemigas.callAll('kill');
				texto = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Enhorabuena', {
					fill: 'white'
				});
				texto.anchor.setTo(0.5, 0.5);
				vencidas = 50;
				this.sonido.stop();
				game.input.onDown.addOnce(continuar, this);
			}
		}

		function gameover() {
			puntos = 0;
			this.sonido.stop();
			this.game.state.start('Menu');
			control = 0;
		}

		function continuar() {
			this.sonido.stop();
			this.game.state.start('Juego');
		}

		function disparoenemigo() {
			balaenemiga = balaenemigas.getFirstExists(false);
			enemigosvivos.length = 0;
			enemigos.forEachAlive(function(enemigo) {
				enemigosvivos.push(enemigo);
			});

			if (balaenemiga && enemigosvivos.length > 0) {
				var random = game.rnd.integerInRange(0, enemigosvivos.length - 1);
				var tirador = enemigosvivos[random];
				if (tirador.x > 10) {
					balaenemiga.reset(tirador.body.x, tirador.body.y);
				}
				game.physics.arcade.moveToObject(balaenemiga, jugador, 120);
				intervalofuego = game.time.now + 2000;
			}
		}
	},
	disparar: function() {
		if (game.time.now > intervalobalas) {
			bala = balas.getFirstExists(false);
			if (bala) {
				bala.reset(jugador.x + 32, jugador.y + 32);
				bala.body.velocity.x = 400;
				intervalobalas = game.time.now + 200;
			}
		}
	},
	cuentavidas: function() {
		frito.callAll('kill');
		for (i = 0; i < vidas; i++) {
			var hfrito = frito.create(650 + (30 * i), this.game.world.height - 590, 'frito');
		}
	}
};