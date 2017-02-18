function Character(x, y, class_, ext, collisionDetector) {
    this.collisionDetector = game.detector;
    this.sprites = $('<div class="character"/>');
    $(".main").append(this.sprites);

    ext = ext || "png";
    this.setClass(class_, ext);
    
    this.setPosition(x,y);
    this.setDirection(0);
    this.life = 30;
}

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

Character.prototype.getPosition = function() {
    return {x: this.position.x, y: this.position.y};
}

Character.prototype.setPosition = function(x,y) {
    if (this.life <= 0) return;
    
    if  (typeof x === "object") {
        y = x.y;
        x = x.x;
    }

    this.position = {x:x, y:y};
    
    var left = this.position.x * 8;
    var top = this.position.y * 8 + 96;

    this.sprites.each(function(i,e){
        e.style.left = left;
        e.style.top = top;
    });

};

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

Character.prototype.remove = function() {
    this.sprites.remove();
    this.sprites = null;
}

Character.prototype.hit = function(dommage) {
    this.life -= dommage;
    this.updateLifeLine();
    if (this.life <= 0) {
        this.collisionDetector.remove(this);
        this.remove();
    }
}

Character.prototype.updateLifeLine = function() {
    this.sprites.find(".remaining").width(100*this.life/30);
}

Character.prototype.showLifeLine = function() {
   this.sprites.append($('<div class="lifeline"><div class="total"><div class="remaining"></div></div></div>'));
   this.updateLifeLine();
}


function SkeletronEvolved(x, y) {
    Character.call(this, x, y, "SkeletronEvolved", "png");
}
SkeletronEvolved.prototype = _.create(Character.prototype, {
    'constructor': SkeletronEvolved
});

SkeletronEvolved.prototype.extents = [[0,0,1,0,0],
                                      [1,1,1,1,1],
                                      [1,1,1,1,1],
                                      [1,1,1,1,1]];

function Malecarbre(x, y) {
    Character.call(this, x, y, "malecarbre", "gif");
}
Malecarbre.prototype = _.create(Character.prototype, {
    'constructor': Malecarbre
});

Malecarbre.prototype.extents = [[1,1,1],
                                [1,1,1]];
