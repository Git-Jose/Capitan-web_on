var huevo = {
	_WIDTH: 800,
	_HEIGHT: 600
};
huevo.inicio = function(game) {};
huevo.inicio.prototype = {
	preload: function() {
		this.load.image('fondocarga', 'recursos/imagenes/fondocarga.png');
		this.load.image('fondomenu', 'recursos/imagenes/fondo.png');
		this.load.image('barracarga', 'recursos/imagenes/barracarga.png');
	},
	create: function() {
		this.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
		this.game.scale.pageAlignHorizontally = true;
		this.game.scale.pageAlignVertically = true;
	//	this.scale.setScreenSize(true);
		this.scale.updateLayout(true);
		this.game.state.start('Precarga');
	}
};