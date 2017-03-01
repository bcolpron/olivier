var Portal = inherit(Sprite, function(x, y, game) {
    this.base(x, y, "images/portal.gif");
    this.game = game;
});

Portal.prototype.extents = [[0,1,0],
                            [1,1,1],
                            [1,1,1],
                            [0,1,0]];

Portal.prototype.hit = function(character) {
    if (character.position.x > this.position.x) {
        character.swirl();
        this.game.loadWorld("world1");
    }
}