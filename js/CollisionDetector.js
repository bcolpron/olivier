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
    var aX1 = Math.floor(a.position.x / 12);
    var aX2 = Math.ceil(a.position.x / 12) + a.extents.length;
    var aY1 = Math.floor(a.position.y / 12);
    var aY2 = Math.ceil(a.position.y / 12) + a.extents.length;
    return _.find(this.objects, function(b) {
        if (a==b) return false;

        var bX1 = Math.floor(b.position.x / 12);
        var bX2 = Math.ceil(b.position.x / 12) + b.extents[0].length;
        var bY1 = Math.floor(b.position.y / 12);
        var bY2 = Math.ceil(b.position.y / 12) + b.extents.length;
        if (aX2 >= bX1 && aX1 < bX2
            && aY2 >= bY1 && aY1 < bY2)
        {
            return b.extents[aY1 - bY1][aX1 - bX1];
        }
        return false;
    });
}

