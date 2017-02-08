function Controller(character, map) {
    this.character = character;
    this.setMovementSpeed(1);
    this.loadWorld(map);
    
    this.boss = new Character(18,1, "SkeletronEvolved");
    this.boss.showLifeLine();
    this.bossPositions = [{x:18,y:1}, {x:16,y:0}, {x:18,y:0}, {x:17,y:1}, {x:18,y:2}, {x:16,y:2}, ];
    this.bossPositionsIndex = 1;
    setInterval($.proxy(function() {this.boss.setPosition(this.bossPositions[this.bossPositionsIndex]); this.bossPositionsIndex = (this.bossPositionsIndex + 1 ) %this.bossPositions.length}, this), 1000);
};

Controller.prototype.NONE  = 0;
Controller.prototype.UP    = 1;
Controller.prototype.DOWN  = 2;
Controller.prototype.LEFT  = 4;
Controller.prototype.RIGHT = 8;

Controller.prototype.loadWorld = function(world) {
    this.world = world;
    
    this.setScrollSpeed(0);
    setTimeout($.proxy(this.setScrollSpeed, this, 1), 10);
    
    var arena = $(".main")
    arena.css("background-color", world.color);
	this.map = world.map;
	this.character.setPosition(0,0);
}

Controller.prototype.startMove = function() {
    if (!this.moveTimer) {
        this.moveTimer = setInterval($.proxy(function() {
            this.move();
        }, this), this.movementTime);
        this.move();
    }
}

Controller.prototype.stopMove = function() {
    if (this.moveTimer) {
        clearInterval(this.moveTimer);
        this.moveTimer=null;
    }
}

Controller.prototype.setMovementSpeed = function(speed) {
    this.movementTime = 500/speed;
}

Controller.prototype.left = function() {
    this.direction = this.LEFT;
    this.startMove();
}
Controller.prototype.right = function() {
    this.direction = this.RIGHT;
    this.startMove();
}
Controller.prototype.up = function() {
    this.direction = this.UP;
    this.startMove();
}
Controller.prototype.down = function() {
    this.direction = this.DOWN;
    this.startMove();
}
Controller.prototype.stop = function() {
    this.direction = this.NONE;
}

Controller.prototype.move = function() {

    if (this.fireRequest) {
        this.fire();
        this.fireRequest = false;
    }

    var p = this.character.getPosition();
    switch (this.direction) {
        case this.LEFT:
            p.x--;
            this.character.moveLeft();
            break;
        case this.UP:
            p.y--;
            this.character.moveUp();
            break;
        case this.RIGHT:
            p.x++;
            this.character.moveRight();
            break;
        case this.DOWN:
            p.y++;
            this.character.moveDown();
            break;
        case this.NONE:
            this.character.stopMoving();
            this.stopMove();
        default:
            return;
    }
    
    if (p.x < 0 || p.x > 120 || p.y < 0 || p.y > 5
        || this.map[p.y][p.x] == 1 && this.direction == this.UP
        || this.map[this.character.position.y][this.character.position.x] == 1 && this.direction == this.DOWN
        )
    {
        this.character.stopMoving();
    } else {
        this.character.setPosition(p);
        
        var scroll = Math.min(0, -96*p.x + $("body").width()/2);
        $(".viewport").css({left: scroll});
    }
    
    if (this.map[p.y][p.x] == 2) {
        var to = this.world.name == "world1" ? worlds.world2 : worlds.world1;
        setTimeout($.proxy(this.loadWorld, this, to), 500);
        return;
    }
}

Controller.prototype.setClass = function(c) {
    this.character.setClass(c);
}

Controller.prototype.setScrollSpeed = function(speed) {
    var $element = $(".character");
    if (speed != 0) {
        $element.css({transition: "left " + 500/speed + "ms, top " + 500/speed + "ms",
                           "transition-timing-function": "linear"});
    } else {
        $element.css({transition: "left 0ms, top 0ms"});
    }
}

Controller.prototype.action = function() {
    if (!this.moveTimer) {
        this.fire();
    }
    else {
        this.fireRequest = true;
    }
}
Controller.prototype.fire = function() {
    if (!this.canonBusy) {
        pos = this.character.position;
        direction = (this.character.direction & 3) == Character.prototype.LEFT ? Bullet.prototype.LEFT : Bullet.prototype.RIGHT; 
        new Bullet(pos.x,pos.y, direction, this.boss);
        this.canonBusy = true;
        setTimeout($.proxy(function() { this.canonBusy = false; }, this), 500);
    }
}
