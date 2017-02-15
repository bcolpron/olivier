function CollisionDetector() {
    this.objects = [];
}

CollisionDetector.prototype.add = function(o) {
    this.objects.push(o);
}

CollisionDetector.prototype.remove = function(c) {
    _.remove(this.objects, function(x) { return x==c; });
}

CollisionDetector.prototype.collisions = function(a) {
    return _.find(this.objects, function(b) {
        if (a.position.x >= b.position.x && a.position.x < b.position.x + b.extents[0].length
            && a.position.y >= b.position.y && a.position.y < b.position.y + b.extents.length)
        {
            return b.extents[a.position.y - b.position.y][a.position.x - b.position.x];
        }
        return false;
    });
}

