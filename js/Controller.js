function Controller(world, game) {
    this.character = new Character(0,0, "blastoise");
    this.lifeBar = new LifeBar();
    this.collisionDetector = new CollisionDetector();
    this.game = game;
    this.gamePad = game.gamePad;
    this.loadWorld(world);
    
    this.timer = setInterval($.proxy(this.update, this), 40);
};

Controller.prototype.loadWorld = function(world) {
    var arena = $(".main")
    arena.css("background-color", world.color);
	this.map = world.map;
    this.monsters = [];

    for (var y=0; y != this.map.length; ++y) {
        for (var x=0; x != this.map[y].length; ++x) {
            if (this.map[y][x] == 1) {
                m.append($('<div class="tile" style="top: ' + y*96 + 'px; left: ' + x*96 + 'px"/>'));
            } else if (this.map[y][x] != 0) {
                var o = new (this.map[y][x])(x*12, y*12, this);
                o.showLifeLine();
                this.collisionDetector.add(o);
                this.monsters.push(o);
            }
        }
    }
    world.init(game);


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

        var contact = this.collisionDetector.collisions(this.character);
        if (contact) {
            contact.hit(this.character);
        }
        
        var scroll = Math.min(0, -8*p.x + $("body").width()/2);
        $(".viewport").css({left: scroll});
    }
}

Controller.prototype.setClass = function(c) {
    this.character.setClass(c);
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

Controller.prototype.pause = function() {
    if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
    }
}

Controller.prototype.close = function() {
    this.pause();
    this.character.remove();
    this.portal.remove();
    _.each(this.monsters, function(m) {
        m.remove();
    })
}

Controller.prototype.ennemyDefeated = function(ennemy) {
    if (ennemy instanceof SkeletronEvolved) {
        this.portal = new Portal(ennemy.position.x,ennemy.position.y, this.game);
        this.collisionDetector.add(this.portal);
   }
   this.collisionDetector.remove(ennemy);
   _.remove(this.monsters, _.identity(ennemy));
}