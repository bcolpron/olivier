var Character = inherit(Sprite, function(x, y, class_, collisionDetector) {
    this.base(x,y,"images/" + class_ + ".png");
    this.collisionDetector = game.detector;

    this.setClass(class_, "png");
    this.setDirection(0);
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
        game.lifeBar.update(-1);
        if (game.lifeBar.life == 0) {
            alert("Game Over");
            window.location.reload();
        }
        this.immunity = true;
        setTimeout($.proxy(function(){
            this.immunity = false;
        },this), 600);
    }
}




var Ennemy = inherit(Sprite, function(){
    this.base.apply(this, arguments);
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
        game.controller.collisionDetector.remove(this);
        this.remove();
    }
}

var SkeletronEvolved = inherit(Ennemy, function(x, y) {
    this.base(x, y, "images/SkeletronEvolved.png");
});

SkeletronEvolved.prototype.extents = [[0,0,1,0,0],
                                      [1,1,1,1,1],
                                      [1,1,1,1,1],
                                      [1,1,1,1,1]];

var Malecarbre = inherit(Ennemy, function(x, y) {
    this.base(x, y, "images/malecarbre.gif");
})

Malecarbre.prototype.extents = [[1,1,1],
                                [1,1,1]];
