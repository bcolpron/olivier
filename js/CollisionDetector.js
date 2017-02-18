function CollisionDetector() {
    this.objects = [];
}

CollisionDetector.prototype.add = function(o) {
    this.objects.push(o);
}

CollisionDetector.prototype.remove = function(c) {
    _.remove(this.objects, function(x) { return x==c; });
}

CollisionDetector.prototype.collisions = function(a) {7
    var aX = Math.floor(a.position.x / 12);
    var aY = Math.floor(a.position.y / 12);
    return _.find(this.objects, function(b) {
        var bX = Math.floor(b.position.x / 12);
        var bY = Math.floor(b.position.y / 12);
        if (aX >= bX && aX < bX + b.extents[0].length
            && aY >= bY && aY < bY + b.extents.length)
        {
            return b.extents[aY - bY][aX - bX];
        }
        return false;
    });
}

