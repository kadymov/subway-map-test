var Vertex = (function(window, undefined) {
    'use strict';

    function Vertex(name, htmlEl, lineColor, x, y) {
        this._name = name;
        this._htmlEl = htmlEl;
        this._lineColor = lineColor;
        this._x = x;
        this._y = y;

        this._neighbors = new Set();
        this._parent = null;
        this._g = 0;
        this._h = 0;
        this._f = 0;
    }

    Vertex.prototype.name = function () {
        return this._name;
    };
    
    Vertex.prototype.htmlEl = function () {
        return this._htmlEl;
    };
    
    Vertex.prototype.lineColor = function () {
        return this._lineColor;
    };

    Vertex.prototype.x = function () {
        return this._x;
    };

    Vertex.prototype.y = function () {
        return this._y;
    };

    Vertex.prototype.calcFGH = function (goalVertex) {
        var parentVert = this._parent,
            dx = this.x() - goalVertex.x(),
            dy = this.y() - goalVertex.y(),
            px = parentVert.x(),
            py = parentVert.y(),
            gK = this.lineColor() === parentVert.lineColor() ? 1.5 : 1;

        this._g = parentVert.g() + Math.sqrt(px*px + py*py) * gK;
        this._h = Math.sqrt(dx*dx + dy*dy);
        this._f = this._g + this._h;
    };

    Vertex.prototype.parent = function (parentVertex) {
        if (arguments.length) {
            this._parent = parentVertex;
            return this;
        } else {
            return this._parent;
        }
    };

    Vertex.prototype.g = function () {
        return this._g;
    };

    Vertex.prototype.h = function () {
        return this._h;
    };

    Vertex.prototype.f = function () {
        return this._f;
    };

    Vertex.prototype.forEachNeighbors = function (fn) {
        this._neighbors.forEach(function(id, neighbor) {
            fn(neighbor);
        });

        return this;
    };

    Vertex.prototype.addNeighbor = function (vertex) {
        if (this._neighbors.has(vertex)) return;

        this._neighbors.add(vertex);
        vertex.addNeighbor(this);
    };

    return Vertex;

})(window);