function CollisionDetector() {
    this.objects = [];
}

CollisionDetector.prototype.add = function(o) {
    this.objects.push(o);
}

CollisionDetector.prototype.remove = function(c) {
    _.remove(this.objects, function(x) { return x==c; });
}

CollisionDetector.prototype.collisions = function(o) {
    return _.find(this.objects, function(i) {
        console.log(i.position);
        if (o.position.x >= i.position.x && o.position.x < i.position.x + 5
            && o.position.y >= i.position.y && o.position.y < i.position.y + 4)
        {
            if (o.position.y == i.position.y && o.position.x < i.position.x + 2) {
                return false
            }
            return true;
        }
        return false;
    });
}

