var Golem = inherit(Ennemy, function(x, y, controller) {
    this.base(x, y, "images/golem.png", controller);
    this.life = this.MAX_LIFE;

    this.setMovements([{x:x,y:y}, {x:x+24,y:y}, {x:x+24,y:y+24}, {x:x,y:y+24}, ]);
})

Golem.prototype.extents = [[1,1],
                           [1,1],];

Golem.prototype.MAX_LIFE = 50;
