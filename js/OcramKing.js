var OcramKing = inherit(Boss, function(x, y, controller) {
    this.base(x, y, "images/ocram-king.gif", controller);
    this.life = this.MAX_LIFE;

    this.setMovements([ ]);
})

OcramKing.prototype.extents = [[1,1,1,1],
                           [1,1,1,1],
                           [1,1,1,1],
                           [1,1,1,1]];

OcramKing.prototype.MAX_LIFE = 90;
