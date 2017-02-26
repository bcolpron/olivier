function Bullet(x, y, direction, targets) {
    this.sprites = $('<div class="bullet"/>');
    $(".main").append(this.sprites);

    this.setClass("waterblast");
    this.setPosition(x,y);
    this.setDirection(direction);
    this.targets = targets;

    this.distance = 240;
    this.timer = setInterval($.proxy(this.travel, this), 20);
    setTimeout($.proxy(this.travel, this), 100);
}

Bullet.prototype.extents = [[1]];

Bullet.prototype.setClass = function(class_) {
    this.class_ = class_;
    var html = '<img class="sprite" src="images/' + this.class_ + '-left.png" style="">\
        <img class="sprite" src="images/' + this.class_ + '-right.png" style="display: none">';
    this.sprites.html(html);
}

Bullet.prototype.LEFT  = 0;
Bullet.prototype.RIGHT = 1;

Bullet.prototype.setPosition = function(x,y) {
    if (!this.sprites) return;

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

Bullet.prototype.setDirection = function(direction) {
    this.direction = direction;
    this.sprites.find(".sprite").hide().eq(direction).show();
}

Bullet.prototype.travel = function() {
    var hit = this.targets.collisions(this);
    if (hit) {
        hit.inflictDamage(1);
        this.remove();
        return;
    }

    offset = this.direction * 2 - 1;
    this.setPosition(this.position.x + offset, this.position.y);
    if (--this.distance == 0) {
        this.remove();
    }
}

Bullet.prototype.remove = function() {
    if (this.sprites) {
        clearInterval(this.timer);
        this.sprites.remove();
        this.sprites = null;
    }
}
