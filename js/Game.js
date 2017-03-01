function Game(worlds) {
    this.worlds = worlds;
    this.gamePad = new KeyboardController();
    this.curtain = new Curtain();
}

Game.prototype.loadWorld = function(name) {
    if (this.controller) {
        this.closeWorld().then($.proxy(function(){
            this.controller.close();
            this.controller = null;
            this.loadWorld(name);
        },this));
    } else {
        this.controller = new Controller(worlds[name], this);
        this.curtain.open();
    }
}

Game.prototype.closeWorld = function(name) {
    this.controller.pause();
    return this.curtain.close();
}



