function Controller(character, collisionDetector,map, gamePad) {
    this.character = character;
    this.collisionDetector = collisionDetector;
    this.gamePad = gamePad;
    this.loadWorld(map);
    
    this.monster = new Malecarbre(9*12,0);
    this.monster.showLifeLine();
    this.collisionDetector.add(this.monster);
    
    this.boss = new SkeletronEvolved(18*12,12);
    this.boss.showLifeLine();
    this.collisionDetector.add(this.boss);

    this.bossPositions = [{x:18*12,y:12}, {x:16*12,y:0}, {x:15*12,y:0}, {x:14*12,y:12}, {x:13*12,y:0},
                          {x:14*12,y:12}, {x:15*12,y:24}, {x:16*12,y:12}, {x:17*12,y:0}, {x:18*12,y:0},
                          {x:17*12,y:12}, {x:18*12,y:24}, {x:17*12,y:12}, {x:16*12,y:24}, {x:17*12,y:12}, ];
    this.bossPositionsIndex = 1;
    setInterval($.proxy(function() {this.boss.setPosition(this.bossPositions[this.bossPositionsIndex]); this.bossPositionsIndex = (this.bossPositionsIndex + 1 ) %this.bossPositions.length}, this), 1000);

    this.timer = setInterval($.proxy(this.update, this), 40);
};

Controller.prototype.loadWorld = function(world) {
    this.world = world;
    
    this.setScrollSpeed(0);
    setTimeout($.proxy(this.setScrollSpeed, this, 1), 10);
    
    var arena = $(".main")
    arena.css("background-color", world.color);
	this.map = world.map;
	this.character.setPosition(0,0);
}

Controller.prototype.update = function() {

    if (this.fireRequest) {
        this.fire();
        this.fireRequest = false;
    }

    var p = this.character.getPosition();
    if (this.gamePad.left()) {
        p.x--;
        this.character.moveLeft();
    }
    if (this.gamePad.up()) {
        p.y--;
        this.character.moveUp();
    }
    if (this.gamePad.right()) {
        p.x++;
        this.character.moveRight();
    }
    if (this.gamePad.down()) {
        p.y++;
        this.character.moveDown();
    }
    if (this.gamePad.fire()) {
        this.fire();
    }
    
    if (p.x < 0 || p.x > 120*12 || p.y < 0 || p.y > 60 
        || this.map[Math.floor(p.y/12)][Math.floor(p.x/12)] == 1)
    {
        this.character.stopMoving();
    } else {
        this.character.setPosition(p);

        if (this.collisionDetector.collisions(this.character)) {
            game.lifeBar.update(-1);
            if (game.lifeBar.life == 0) {
                alert("Game Over");
                window.location.reload();
            }
        }
        
        var scroll = Math.min(0, -8*p.x + $("body").width()/2);
        $(".viewport").css({left: scroll});
    }
}

Controller.prototype.setClass = function(c) {
    this.character.setClass(c);
}

Controller.prototype.setScrollSpeed = function(speed) {
    var $element = $(".character");
    if (speed != 0) {
        //$element.css({transition: "left " + 500/speed + "ms, top " + 500/speed + "ms",
        //                   "transition-timing-function": "linear"});
    } else {
        //$element.css({transition: "left 0ms, top 0ms"});
    }
}

Controller.prototype.fire = function() {
    if (!this.canonBusy) {
        pos = this.character.position;
        direction = (this.character.direction & 3) == Character.prototype.LEFT ? Bullet.prototype.LEFT : Bullet.prototype.RIGHT; 
        new Bullet(pos.x,pos.y, direction, this.collisionDetector);
        this.canonBusy = true;
        setTimeout($.proxy(function() { this.canonBusy = false; }, this), 300);
    }   
}
