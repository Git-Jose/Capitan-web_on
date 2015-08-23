huevo.Juego6 = function(game) {};
var plataformas;
var jugador;
var estrellas;
var ninjas;
var cursores;
var cogidas = 12;
var texto;
var cuenta;
var irIz = false;
var irDer = false;
var saltar = false;
huevo.Juego6.prototype = {
	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.sonidocoger = this.game.add.audio('ping');
		this.sonidosaltar = this.game.add.audio('boing');
		this.sonidopuf = this.game.add.audio('puf');
		this.sonido = this.game.add.audio('sonido');
		this.sonido.loop = true;
		this.sonido.play();
		this.game.add.image(0, 0, 'fondo6');
		plataformas = this.game.add.group();
		plataformas.enableBody = true;
		var repisa = plataformas.create(200, 200, 'plataforma');
		repisa.body.immovable = true;
		var movil = plataformas.create(300, 390, 'pmini');
		game.add.tween(movil).to({
			x: [0, 0, 600, 600, 300],
			y: [390, 90, 90, 390, 390]
		}, 50000, Phaser.Easing.Linear.None, true, 6000, - 1, false);
		movil.body.immovable = true;
		var suelo = plataformas.create(0, this.game.world.height - 64, 'suelo');
		suelo.body.immovable = true;
		jugador = this.game.add.sprite(97, this.game.world.height - 150, 'prota');
		this.game.physics.arcade.enable(jugador, Phaser.Physics.ARCADE);
		jugador.body.bounce.y = 0.2;
		jugador.body.gravity.y = 300;
		jugador.body.collideWorldBounds = true;
		jugador.animations.add('izquierda', [0, 1], 10, true);
		jugador.animations.add('derecha', [3, 4], 10, true);
		cursores = this.game.input.keyboard.createCursorKeys();
		estrellas = this.game.add.group();
		estrellas.enableBody = true;
		ninjas = this.game.add.group();
		frito = this.game.add.group();
		// botones de toque
		botonIzquierda = game.add.button(2, this.game.world.height - 40, 'flechaiz', null, this);
		botonIzquierda.events.onInputDown.add(function() {
			irIz = true;
		});
		botonIzquierda.events.onInputUp.add(function() {
			irIz = false;
		});
		botonDerecha = game.add.button(66, this.game.world.height - 40, 'flechade', null, this);
		botonDerecha.events.onInputDown.add(function() {
			irDer = true;
		});
		botonDerecha.events.onInputUp.add(function() {
			irDer = false;
		});
		botonSaltar = game.add.button(this.game.world.width - 36, this.game.world.height - 40, 'saltar', null, this);
		botonSaltar.events.onInputDown.add(function() {
			saltar = true;
		});
		botonSaltar.events.onInputUp.add(function() {
			saltar = false;
		});
		this.cuentavidas();
		puntuacion = this.game.add.text(this.game.world.width - 790, this.game.world.height - 590, 'Puntos: ' + puntos, {
			font: '34px Arial',
			fill: '#fff'
		});

		for (var i = 0; i < 12; i++) {
			var estrella = estrellas.create(i * 70, 0, 'estrella');
			estrella.body.gravity.y = 300;
			estrella.body.bounce.y = 0.7 + Math.random() * 0.2;
		}
		for (var ii = 0; ii < 3; ii++) {
			var ninja = ninjas.create(ii * 380, 0, 'ninja');
			this.game.physics.arcade.enable(ninja);
			ninja.enableBody = true;
			ninja.body.velocity.setTo(200, 200);
			ninja.body.collideWorldBounds = true;
			ninja.body.bounce.set(1);
			ninja.animations.add('rotar', [0, 1], 10, true);
			ninja.animations.play('rotar');
		}
	},
	update: function() {
		this.game.physics.arcade.collide(jugador, plataformas);
		this.game.physics.arcade.collide(estrellas, plataformas);
		this.game.physics.arcade.collide(ninjas, plataformas);
		this.game.physics.arcade.overlap(jugador, estrellas, cogeEstrellas, null, this);
		this.game.physics.arcade.overlap(jugador, ninjas, chocaEstrellas, null, this);
		jugador.body.velocity.x = 0;
		if (cursores.left.isDown || irIz === true) { //**************************************Comprobación de cursores pulsados para el movimiento
			jugador.body.velocity.x = -150;
			jugador.animations.play('izquierda');
		} else if (cursores.right.isDown || irDer === true) {
			jugador.body.velocity.x = 150;
			jugador.animations.play('derecha');
		} else {
			jugador.animations.stop();
			jugador.frame = 2; //*******************************************Imagen del sprite si el jugador no se mueve
		}
		if ((cursores.up.isDown || saltar === true) && jugador.body.touching.down) { //*********Salto
			jugador.body.velocity.y = -350;
			this.sonidosaltar.play();
		}

		function chocaEstrellas(jugador, ninja) {
			this.sonidopuf.play();
			ninja.kill();
			jugador.kill();
			hfrito = frito.getFirstAlive();
			if (hfrito) {
				hfrito.kill();
			}
			vidas -= 1;
			if (vidas > 0) {
				jugador.revive();
			} else {
				//cuenta.text = 'Vidas: ' + vidas;
				texto = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Game Over', {
					fill: 'white'
				});
				texto.anchor.setTo(0.5, 0.5);
				vidas = 3;
				cogidas = 12;
				puntos = 0;
				game.input.onDown.addOnce(gameover, this);
			}
		}

		function cogeEstrellas(jugador, estrella) {
			this.sonidocoger.play();
			estrella.kill();
			cogidas = cogidas - 1;
			puntos += 10;
			puntuacion.text = 'Puntos: ' + puntos;
			if (cogidas < 1) {
				ninjas.callAll('kill');
				texto = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Has ganado', {
					fill: 'white'
				});
				texto.anchor.setTo(0.5, 0.5);
				cogidas = 12;
				this.sonido.stop();
				this.game.state.start('Juego7');
			}
		}

		function gameover() {
			this.sonido.stop();
			this.game.state.start('Menu');
		}
	},
	cuentavidas: function() {
		frito.callAll('kill');
		for (i = 0; i < vidas; i++) {
			var hfrito = frito.create(this.game.world.width - 150 + (30 * i), this.game.world.height - 590, 'frito');
		}
	}
};
