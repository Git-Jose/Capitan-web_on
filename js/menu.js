huevo.Menu = function(game) {};
var ninjas;
huevo.Menu.prototype = {
	create: function() {
		this.add.image((huevo._WIDTH - 800), (huevo._HEIGHT - 600), 'fondomenu');
		this.add.image((huevo._WIDTH - 800), (huevo._HEIGHT -600), 'gluten');
		this.tituloJuego = this.add.image(huevo._WIDTH * 0.5, 40, 'titulo');
		
		this.tituloJuego.anchor.set(0.5, 0);
		this.botonInicio = this.add.button(huevo._WIDTH * 0.5, huevo._HEIGHT * 0.5, 'boton', this.inicioJuego, this, 2, 0, 1);
		this.botonInicio.anchor.set(0.5, 0);
		this.botonInicio.input.useHandCursor = true;
		this.capitulo = this.add.sprite((huevo._WIDTH - 400), (huevo._HEIGHT - 150), 'capitulo');
		this.capitulo.anchor.set(0.5, 0.5);
		ninjas = this.game.add.group();
		ninjas.enableBody = true;
		for (i = 0; i < 5; i++) {
			var ninja = ninjas.create(i * 70, 0, 'ninja');
			ninja.body.gravity.y = 0;
			ninja.body.bounce.y = 0.7 + Math.random() * 0.2;
			ninja.body.velocity.setTo(200, 200);
			ninja.body.collideWorldBounds = true;
			ninja.body.bounce.set(1);
			ninja.animations.add('rotar', [0, 1], 10, true);
			ninja.animations.play('rotar');
		}
		this.capitulo.animations.add('bailar', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14], 10, true);
		this.capitulo.animations.play('bailar');
		this.bandasonora = this.game.add.audio('musicafondo');
		this.bandasonora.loop = true;
		this.bandasonora.play();
	},
	inicioJuego: function() {
		this.bandasonora.stop();
		this.game.state.start('Juego5');
	}
};