huevo.Precarga = function(game) {};
huevo.Precarga.prototype = {
	preload: function() {
		this.preloadBg = this.add.image((huevo._WIDTH - 800), (huevo._HEIGHT - 600), 'fondocarga');
		this.preloadBar = this.add.sprite((huevo._WIDTH - 600), (huevo._HEIGHT - 50) * 0.5, 'barracarga');
		this.load.setPreloadSprite(this.preloadBar);
		this.load.audio('musicafondo', 'recursos/audio/musica.ogg');
		this.load.audio('ping', 'recursos/audio/coger.ogg');
		this.load.audio('boing', 'recursos/audio/botar.ogg')
		this.load.audio('puf', 'recursos/audio/puf.ogg');
		this.load.audio('sonido', 'recursos/audio/sonido.ogg');
		this.load.audio('musicafondo', 'recursos/audio/musica.mp3');
		this.load.audio('ping', 'recursos/audio/coger.mp3');
		this.load.audio('boing', 'recursos/audio/botar.mp3')
		this.load.audio('puf', 'recursos/audio/puf.mp3');
		this.load.audio('sonido', 'recursos/audio/sonido.mp3');
		//this.load.image('espacio', 'recursos/imagenes/espacio.png');//ultima
		this.load.image('fondo', 'recursos/imagenes/fondo.png');
		this.load.image('fondo2', 'recursos/imagenes/fondo2.png');
		this.load.image('fondo3', 'recursos/imagenes/fondo3.png');
		this.load.image('fondo4', 'recursos/imagenes/fondo4.png');
		this.load.image('fondo5', 'recursos/imagenes/fondo5.png');
		this.load.image('fondo6', 'recursos/imagenes/fondo6.png');
		this.load.image('fondo7', 'recursos/imagenes/fondo7.png');
		this.load.image('cohete', 'recursos/imagenes/cohete.png');
		this.load.image('suelo', 'recursos/imagenes/suelo.png');
		this.load.image('titulo', 'recursos/imagenes/titulo.png');
		this.load.image('boton', 'recursos/imagenes/boton.png');
		this.load.image('estrella', 'recursos/imagenes/estrella.png');
		this.load.image('plataforma', 'recursos/imagenes/plataforma.png');
		this.load.image('phelada', 'recursos/imagenes/phelada.png');
		this.load.image('pmini', 'recursos/imagenes/pmini.png');
		this.load.image('pared', 'recursos/imagenes/pared.png');
		//this.load.image('piedra', 'recursos/imagenes/piedra.png');
		this.load.spritesheet('prota', 'recursos/imagenes/prota.png', 80.6, 31);
		this.load.spritesheet('vextra', 'recursos/imagenes/extra.png', 80.6, 31);
		this.load.spritesheet('capitulo', 'recursos/imagenes/capitulo.png', 800, 90);
		this.load.spritesheet('nave', 'recursos/imagenes/nave.png', 64, 64);
		this.load.image('frito', 'recursos/imagenes/frito.png');
		this.load.spritesheet('ninja', 'recursos/imagenes/ninj.png', 32, 24);
		this.load.image('gluten', 'recursos/imagenes/gluten.png');
		this.load.image('bala', 'recursos/imagenes/bala.png');
		this.load.image('balas', 'recursos/imagenes/balaenemiga.png');
		this.load.image('disp', 'recursos/imagenes/disp.png');
		this.load.spritesheet('enemigo', 'recursos/imagenes/enemigo.png', 52, 40);
		this.load.spritesheet('boom', 'recursos/imagenes/explosionar.png', 112, 84);
		this.load.image('planeta', 'recursos/imagenes/planeta.png');
		this.load.image('flechaiz', 'recursos/imagenes/flechaiz.png');
		this.load.image('flechade', 'recursos/imagenes/flechade.png');
		this.load.image('flechaar', 'recursos/imagenes/flechaar.png');
		this.load.image('flechaab', 'recursos/imagenes/flechaab.png');
		this.load.image('saltar', 'recursos/imagenes/saltar.png');
		//this.load.image('crash', 'recursos/imagenes/crash.png', 409, 272);
	},
	create: function() {
		this.game.state.start('Menu');
	}
};