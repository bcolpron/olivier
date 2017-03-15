var Moonlord = inherit(Boss, function(x, y, controller) {
    this.base(x, y, "images/moonlord.gif", controller);
    this.life = this.MAX_LIFE;

    this.setMovements([{x:x,y:y}, {x:x+12,y:y-12}, {x:x+24,y:y}, {x:x+12,y:y+12} ]);
})

Moonlord.prototype.extents = [[0,0,0,0,0,0,0,0],
                              [0,0,0,1,1,0,0,0],
                              [0,1,1,1,1,1,1,0],
                              [0,0,0,1,1,0,0,0],
                              [0,0,0,1,1,0,0,0],
                              [0,0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0,0],
                              [0,0,0,0,0,0,0,0]];

Moonlord.prototype.MAX_LIFE = 170;

