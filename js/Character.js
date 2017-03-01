var Character = inherit(Sprite, function(x, y, class_, collisionDetector) {
    this.base(x,y,"images/" + class_ + ".png");
    this.collisionDetector = game.detector;

    this.setClass(class_, "png");
    this.setDirection(0);
    this.sprites.css({'z-index': 1000});
})

Character.prototype.extents = [[1]];

Character.prototype.setClass = function(class_, ext) {
    this.class_ = class_;
    var html = '<img class="sprite" src="images/' + this.class_ + '.' + ext + '" style="">\
        <img class="sprite" src="images/' + this.class_ + '-up.' + ext + '" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-left.' + ext + '" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-right.' + ext + '" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-ani.' + ext + '" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-aniup.' + ext + '" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-anileft.' + ext + '" style="display: none">\
        <img class="sprite" src="images/' + this.class_ + '-aniright.' + ext + '" style="display: none">';
    this.sprites.html(html);
}

Character.prototype.DOWN  = 0;
Character.prototype.UP    = 1;
Character.prototype.LEFT  = 2;
Character.prototype.RIGHT = 3;
Character.prototype.ANIM  = 4;

Character.prototype.setDirection = function(direction) {
    this.direction = direction;
    this.sprites.find(".sprite").hide().eq(direction).show();
}

Character.prototype.moveLeft = function() {
    this.setDirection(this.LEFT | this.ANIM);
};

Character.prototype.moveUp = function() {
    this.setDirection(this.direction | this.ANIM);
};

Character.prototype.moveRight = function() {
    this.setDirection(this.RIGHT | this.ANIM);
};

Character.prototype.moveDown = function() {
    this.setDirection(this.direction | this.ANIM);
};

Character.prototype.setMoving = function() {
    this.setDirection(this.direction | this.ANIM);
};

Character.prototype.stopMoving = function() {
    this.setDirection(this.direction & 0x3);
};

Character.prototype.inflictDamage = function(damage) {
    if (!this.immunity) {
        game.controller.lifeBar.update(-1);
        if (game.controller.lifeBar.life == 0) {
            alert("Game Over");
            window.location.reload();
        }
        this.immunity = true;
        setTimeout($.proxy(function(){
            this.immunity = false;
        },this), 600);
    }
}




var Ennemy = inherit(Sprite, function(x,y,imageUri,controller){
    this.base(x,y,imageUri);
    this.controller = controller;
    this.life = 30;
});

Ennemy.prototype.updateLifeLine = function() {
    this.sprites.find(".remaining").width(100*this.life/30);
}

Ennemy.prototype.showLifeLine = function() {
   this.sprites.append($('<div class="lifeline"><div class="total"><div class="remaining"></div></div></div>'));
   this.updateLifeLine();
}

Ennemy.prototype.hit = function(character) {
    character.inflictDamage(1);
}

Ennemy.prototype.inflictDamage = function(damage) {
    this.life -= damage;
    this.updateLifeLine();
    if (this.life <= 0) {
        this.remove();
        this.controller.ennemyDefeated(this);
    }
}

var SkeletronEvolved = inherit(Ennemy, function(x, y, controller) {
    this.base(x, y, "images/SkeletronEvolved.png", controller);

    this.positions = [{x:18*12,y:12}, {x:16*12,y:0}, {x:15*12,y:0}, {x:14*12,y:12}, {x:13*12,y:0},
                      {x:14*12,y:12}, {x:15*12,y:24}, {x:16*12,y:12}, {x:17*12,y:0}, {x:18*12,y:0},
                      {x:17*12,y:12}, {x:18*12,y:24}, {x:17*12,y:12}, {x:16*12,y:24}, {x:17*12,y:12}, ];
    this.positionsIndex = 1;
    this.movementsTimer = setInterval($.proxy(function() {
        var current = this.getPosition();
        var dst = this.positions[this.positionsIndex];
        current.x += Math.sign(dst.x - current.x);
        current.y += Math.sign(dst.y - current.y);
        this.setPosition(current);
        if (current.x == dst.x && current.y == dst.y) {
            this.positionsIndex = (this.positionsIndex + 1 ) % this.positions.length;
        }
    }, this), 40);
});

SkeletronEvolved.prototype.remove = function() {
    clearInterval(this.movementsTimer);
    Ennemy.prototype.remove.call(this);
}

SkeletronEvolved.prototype.extents = [[0,0,1,0,0],
                                      [1,1,1,1,1],
                                      [1,1,1,1,1],
                                      [1,1,1,1,1]];

var Malecarbre = inherit(Ennemy, function(x, y, controller) {
    this.base(x, y, "images/malecarbre.gif", controller);
})

Malecarbre.prototype.extents = [[1,1,1],
                                [1,1,1]];
