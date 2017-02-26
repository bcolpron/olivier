var Portal = inherit(Sprite, function(x, y, controller) {
    this.base(x, y, "images/portal.gif");
    this.controller = controller;
});

Portal.prototype.extents = [[0,1,0],
                            [1,1,1],
                            [1,1,1],
                            [0,1,0]];

Portal.prototype.hit = function(character) {
    if (character.position.x > this.position.x) {
        this.controller.levelDone();    
    }
    
}