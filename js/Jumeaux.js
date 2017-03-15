var Jumeaux = inherit(Boss, function(x, y, controller) {
    this.base(x, y, "images/jumeaux.gif", controller);
    this.life = this.MAX_LIFE;

    this.setMovements([{x:x,y:y}, {x:x+12,y:y-12}, {x:x+24,y:y}, {x:x+12,y:y+12} ]);
})

Jumeaux.prototype.extents = [[1,1],
                             [1,1],
                             [1,1]];

Jumeaux.prototype.MAX_LIFE = 70;

