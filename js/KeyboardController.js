function KeyboardController(controller) {
    this.controller = controller;

    var that = this;
    document.onkeyup = function(e) {
        that.onkeyup(e);
    };
    document.onkeydown = function(e) {
        that.onkeydown(e);
    };
};

KeyboardController.prototype.UP    = 1;
KeyboardController.prototype.DOWN  = 2;
KeyboardController.prototype.LEFT  = 4;
KeyboardController.prototype.RIGHT = 8;

KeyboardController.prototype.onkeyup = function(e) {
    switch (e.keyCode) {
        case 37:
            this.mask &= 11; 
            break;
        case 38:
            this.mask &= 14; 
            break;
        case 39:
            this.mask &= 7; 
            break;
        case 40:
            this.mask &= 13; 
            break;
    }
    
    if (this.mask & this.LEFT && ! (this.mask & this.RIGHT)) this.controller.left();
    else if (this.mask & this.RIGHT && ! (this.mask & this.LEFT)) this.controller.right();
    else if (this.mask & this.UP && ! (this.mask & this.DOWN)) this.controller.up();
    else if (this.mask & this.DOWN && ! (this.mask & this.UP)) this.controller.down();
    else this.controller.stop();
};

KeyboardController.prototype.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37:
            this.mask |= this.LEFT;
            this.controller.left();
            break;
        case 38:
            this.mask |= this.UP;
            this.controller.up();
            break;
        case 39:
            this.mask |= this.RIGHT;
            this.controller.right();
            break;
        case 40:
            this.mask |= this.DOWN;
            this.controller.down();
            break;
        case 32:
            this.controller.action();
            break;
    }
};
