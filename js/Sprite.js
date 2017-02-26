function Sprite(x, y, imageUri) {
    this.sprites = $('<div class="character"/>');
    var html = '<img class="sprite" src="' + imageUri + '" style="">';
    this.sprites.html(html);
    $(".main").append(this.sprites);
    this.setPosition(x,y);
}

Sprite.prototype.extents = [[1]];

Sprite.prototype.getPosition = function() {
    return {x: this.position.x, y: this.position.y};
}

Sprite.prototype.setPosition = function(x,y) {
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

function inherit(base, ctor){
    var derived = function() {
        var that = this;
        this.base = function() {
            base.apply(that, arguments);
        }
        ctor.apply(this, arguments);
    };
    derived.prototype = _.create(base.prototype, {
        'constructor': derived
    })
    return derived;
}

Sprite.prototype.hit = function() {
    // noop
}

Sprite.prototype.inflictDamage = function() {
    // noop
}

Sprite.prototype.swirl = function() {
    var i = 0;
    var timer = setInterval($.proxy(function() {
        if (i++ < 25) {
            var scale = 2-Math.pow(1-2*i/25,2);
            this.sprites.css({transform: "rotate("+360*i/25+"deg) scale(" + scale + "," + scale + ")"});
        } else {
            this.sprites.css({transform: ""});
            clearInterval(timer);
        }
    }, this), 40);
}

Sprite.prototype.remove = function() {
    this.sprites.remove();
    this.sprites = null;
}

