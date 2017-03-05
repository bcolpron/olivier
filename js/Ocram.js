var Ocram = inherit(Ennemy, function(x, y, controller) {
    this.base(x, y, "images/ocram.gif", controller);
    this.life = this.MAX_LIFE;

    this.setMovements([{x:x,y:y}, {x:x+12,y:y}, {x:x+24,y:y}, {x:x+36,y:y}, {x:x+48,y:y},
                       {x:x+24,y:y+12}, {x:x,y:y-12}, {x:x+24,y:y} ]);
})

Ocram.prototype.extents = [[1,1]];

Ocram.prototype.MAX_LIFE = 20;
