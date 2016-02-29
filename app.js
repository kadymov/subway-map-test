function createAllVertexes(svgDoc) {
    var stations = svgDoc.querySelectorAll('.station'),
        stationVertexMap = new Map(),
        nameVertexMap = new Map();

    Array.prototype.slice.call(stations).forEach(function(el) {
        var sname = el.getAttribute('sname'),
            x = parseInt(el.getAttribute('cx'), 10),
            y = parseInt(el.getAttribute('cy'), 10),
            lineColor,
            vertex;

        if (!sname || !x || !y) return;
            
        lineColor = el.className.baseVal.match(/blue|green|red|violet|gray/)[0];

        var vertex = new Vertex(sname, el, lineColor, x, y);

        stationVertexMap.set(el, vertex);
        nameVertexMap.set(sname, vertex);
    });

    return {
        stationVertexMap : stationVertexMap,
        nameVertexMap : nameVertexMap
    };
}

function linkAllVertexes(stationVertexMap, nameVertexMap) {
    stationVertexMap.forEach(function(vertex, station) {
        var nghbrs = station.getAttribute('nghbrs');
        if (!nghbrs) return;

        nghbrs.split(/\s*,\s*/).forEach(function(el){
            vertex.addNeighbor(nameVertexMap.get(el));
        });
    });
}


var map = document.getElementById('map');

map.addEventListener('load', function() {
    var svgDoc = map.contentDocument,
        maps = createAllVertexes(svgDoc),

        startVertex;

    linkAllVertexes(maps.stationVertexMap, maps.nameVertexMap);

    svgDoc.addEventListener('click', function(e) {
        if (!e.target.classList.contains('station')) return;

        var vertex = maps.stationVertexMap.get(e.target);

        if (!startVertex) {
            startVertex = vertex;
        } else {
            //var path = aStar(startVertex, vertex).map(function(el) {return el.id()});
            var path = aStar(startVertex, vertex);
            
            path.forEach(function(el) {
                el.htmlEl().classList.add('sel');
            });
            
            //console.log(path);
            startVertex = null;
        }
    });


});