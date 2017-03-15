var Plantera = inherit(Boss, function(x, y, controller) {
    this.base(x, y, "images/plantera.png", controller);
    this.life = this.MAX_LIFE;

    this.setMovements([{x:x,y:y}, {x:x+12,y:y-12}, {x:x+24,y:y}, {x:x+12,y:y+12} ]);
})

Plantera.prototype.extents = [[1,1,1,1],
                              [1,1,1,1],
                              [1,1,1,1],
                              [1,1,1,1]];

Plantera.prototype.MAX_LIFE = 90;

