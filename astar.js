var aStar = (function(window, undefined) {
    'use strict';

    function getBestVertex(open) {
        var bestV,
            bestF = Number.POSITIVE_INFINITY;
        for (let v of open) {
            if (v.f() < bestF) {
                bestV = v;
                bestF = v.f();
            }
        }
        return bestV;
    }

    function aStar(startVertex, goalVertex) {
        var open = new Set(),
            closed = new Set(),
            currentVertex;

        open.add(startVertex);

        while(open.size) {
            currentVertex = getBestVertex(open);

            closed.add(currentVertex);
            open.delete(currentVertex);

            currentVertex.forEachNeighbors(function(neighbor) {
                if (closed.has(neighbor)) return;

                if (!open.has(neighbor)) {
                    open.add(neighbor);
                    neighbor.parent(currentVertex);
                    neighbor.calcFGH(goalVertex);
                    if (neighbor === goalVertex) return false;
                } else {
                    if (neighbor.g() < currentVertex.g()) {
                        neighbor.parent(currentVertex);
                        neighbor.calcFGH(goalVertex);
                    }
                }
            });

        }

        if (!goalVertex.parent()) return false;

        var path = [],
            currPoint = goalVertex;

        while(currPoint) {
            path.push(currPoint);
            currPoint = currPoint.parent();
        }

        return path.reverse();
    }

    return aStar;

})(window);
