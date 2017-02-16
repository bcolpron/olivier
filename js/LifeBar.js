function LifeBar() {
    this.container = $(".lifebar");
    this.total = 5;
    this.life = 4;
    this.update(0);
}

LifeBar.prototype.update = function(delta) {
    this.life = Math.max(0, this.life + delta);
    this.container.empty();
    for (var i=0; i != this.total; ++i) {
        if (i < this.total - this.life) {
            this.container.append($('<div class="lostheart"></div>'));
        } else {
            this.container.append($('<div class="heart"></div>'));
        }
    }
}

