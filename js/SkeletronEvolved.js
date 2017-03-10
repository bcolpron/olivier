var SkeletronEvolved = inherit(Boss, function(x, y, controller) {
    this.base(x, y, "images/SkeletronEvolved.png", controller);
    this.life = this.MAX_LIFE;

    this.setMovements([{x:x+60,y:y+12}, {x:x+36,y:y+0},  {x:x+24,y:y+0},  {x:x+12,y:y+12}, {x:x+0, y:y+0},
                       {x:x+12,y:y+12}, {x:x+24,y:y+24}, {x:x+36,y:y+12}, {x:x+48,y:y+0},  {x:x+60,y:y+0},
                       {x:x+48,y:y+12}, {x:x+60,y:y+24}, {x:x+48,y:y+12}, {x:x+36,y:y+24}, {x:x+48,y:y+12} ]);
});

SkeletronEvolved.prototype.MAX_LIFE = 100;

SkeletronEvolved.prototype.extents = [[0,0,1,0,0],
                                      [1,1,1,1,1],
                                      [1,1,1,1,1],
                                      [1,1,1,1,1]];
