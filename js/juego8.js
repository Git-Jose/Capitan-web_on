huevo.Juego8 = function(game) {};
var plataformas;
var jugador;
var estrellas;
var ninjas;
var cursores;
var cogidas = 12;
var texto;
var puntos = 0;
var puntuacion;
var vidas = 3;
var frito;
var irIz = false;
var irDer = false;
var saltar = false;
huevo.Juego8.prototype = {
	create: function() {
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.sonidocoger = this.game.add.audio('ping');
		this.sonidosaltar = this.game.add.audio('boing');
		this.sonidopuf = this.game.add.audio('puf');
		this.sonido = this.game.add.audio('sonido');
		this.sonido.loop = true;
		this.sonido.play();
		this.game.add.image(0, 0, 'fondocarga'); //********************************Imagen de fondo
		this.game.add.image(this.game.world.width - 803, this.game.world.height - 200, 'cohete');
		plataformas = this.game.add.group(); //********************************Crea un grupo para las plataformas y el suelo
		plataformas.enableBody = true; //*********************************Activa las físicas para los objetos del grupo
		var repisa = plataformas.create(400, 350, 'plataforma'); //*******Coloca las repisas
		repisa.body.immovable = true; //**********************************Convierte la repisa en inmóvil al caer sobre ellas
		repisa = plataformas.create(-150, 250, 'plataforma'); //**********Coloca otra repisa
		repisa.body.immovable = true; //**********************************La hace inmóvil
		repisa = plataformas.create(370, 350, 'pared');
		repisa.body.immovable = true; //**********************************La hace inmóvil
		var suelo = plataformas.create(0, this.game.world.height - 64, 'suelo'); //Coloca el suelo
		suelo.body.immovable = true; //**************************************Lo hace inmóvil
		jugador = this.game.add.sprite(97, this.game.world.height - 150, 'prota'); //**Coloca el jugador
		this.game.physics.arcade.enable(jugador, Phaser.Physics.ARCADE); //******************************Activa las físicas al jugador
		jugador.body.bounce.y = 0.2; //**************************************Rebote del jugador
		jugador.body.gravity.y = 300; //*************************************Gravedad para el jugador
		jugador.body.collideWorldBounds = true; //***************************El jugador rebota en los bordes de la ventana
		jugador.animations.add('izquierda', [0, 1], 10, true); //************Añadiendo la animación izquierda, las imágenes una y dos del spritesheet
		jugador.animations.add('derecha', [3, 4], 10, true); //**************Añadiendo la animación derecha al jugador
		cursores = this.game.input.keyboard.createCursorKeys(); //****************Los cursores del teclado a la variable cursores
		estrellas = this.game.add.group(); //*************************************Crea un grupo para las estrellas
		estrellas.enableBody = true; //**************************************Activa las físicas para el grupo estrellas
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
		for (var i = 0; i < 12; i++) { //***********************************Bucle que crea doce estrellas
			var estrella = estrellas.create(i * 70, 0, 'estrella');
			estrella.body.gravity.y = 300; //*********************************Gravedad para las estrellas
			estrella.body.bounce.y = 0.7 + Math.random() * 0.2; //************Rebote para las estrellas
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
		this.game.physics.arcade.collide(jugador, plataformas); //***************Colisión entre el jugador y las plataformas
		this.game.physics.arcade.collide(estrellas, plataformas); //*************Colisión entre las estrellas y las plataformas
		this.game.physics.arcade.collide(ninjas, plataformas);
		this.game.physics.arcade.overlap(jugador, estrellas, cogeEstrellas, null, this); //Si el jugador se solapa con alguna estrella se llama a la función cogeEstrellas
		this.game.physics.arcade.overlap(jugador, ninjas, chocaEstrellas, null, this);
		jugador.body.velocity.x = 0; //*************************************Velocidad lateral del jugador a cero
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
				vidas = 3;
				cogidas = 12;
				puntos = 0;
				texto = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Game Over', {
					fill: 'white'
				});
				texto.anchor.setTo(0.5, 0.5);
				game.input.onDown.addOnce(gameover, this);
			}
		}

		function cogeEstrellas(jugador, estrella) {
			this.sonidocoger.play();
			estrella.kill();
			cogidas -= 1;
			puntos += 10;
			puntuacion.text = 'Puntos: ' + puntos;
			if (puntos === 100) {
				vidas++;
				this.cuentavidas();
			}
			if (cogidas < 1) {
				ninjas.callAll('kill');
				texto = this.game.add.text(this.game.world.centerX, this.game.world.centerY, 'Has ganado', {
					fill: 'white'
				});
				texto.anchor.setTo(0.5, 0.5);
				cogidas = 12;
				this.sonido.stop();
				this.game.state.start('Juego2');
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
	},
	toqueIz: function(sprite, event) {
		irIz = true;
		console.log(irIz + " " + event);


	}
	//	render: function() {
	//this.game.debug.bodyInfo(jugador, 24, 24);
	//}
};
