var Portal = inherit(Sprite, function(x, y) {
    this.base(x, y, "images/portal.gif");
});

Portal.prototype.extents = [[1,1,1],
                            [1,1,1]];

Portal.prototype.hit = function(character) {
    console.log("level done!");
}