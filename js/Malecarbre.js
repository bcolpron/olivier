var Malecarbre = inherit(Ennemy, function(x, y, controller) {
    this.base(x, y, "images/malecarbre.gif", controller);
    this.life = this.MAX_LIFE;

    this.setMovements([{x:x,y:y}, {x:x+12,y:y}, {x:x+24,y:y}, {x:x+12,y:y+12} ]);
})

Malecarbre.prototype.extents = [[1,1,1],
                                [1,1,1]];

Malecarbre.prototype.MAX_LIFE = 15;

