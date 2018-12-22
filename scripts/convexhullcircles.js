document.addEventListener("DOMContentLoaded", function() {

    const xmax = 5;
    const ymax = 5;
    const numpoints = 5;

    JXG.Options.layer['polygon'] = 8;
    const board = JXG.JSXGraph.initBoard('jxgbox', {
                                    boundingbox: [-xmax, xmax, ymax, -ymax],
                      axis: true,
                      pan: false,
                  });

    let points = [];

    function redraw(points) {
        let hull = JXG.Math.Geometry.GrahamScan(points);
        let hullpts = []

        _.each(hull, (c) => {
            _.each(points, (p) => {
                if (_.isEqual(c, p.coords.usrCoords)) {
                    hullpts.push(p);
                    p.setAttribute({color: '#ff0000', fillColor: '#ff0000'});

                    return false;
                }
            });
        });

        for (var i=1; i<hullpts.length - 1; i++) {
            let line = board.create('line', [hullpts[i], hullpts[i + 1]], {visible: false});
            board.create('perpendicularSegment', [line, center]);

            line = board.create('line', [hullpts[i - 1], hullpts[i]], {visible: false});
            board.create('perpendicularSegment', [line, center]);
        }

        let line = board.create('line', [hullpts[0], hullpts[hullpts.length - 1]], {visible: false});
        board.create('perpendicularSegment', [line, center]);

        board.create('polygon', hullpts, {fillColor: "#000000"});
    }

    let center = board.create('point', [0, 0], {visible: false});

    for (var i = 0; i<numpoints; i++) {
        let x = Math.random() * xmax*1.5 - xmax/1.5;
        let y = Math.random() * ymax*1.5 - ymax/1.5;

        let p = board.create('point', [x, y], {color: "#0000ff", fillColor: "#0000ff"})
        midpoint = board.create('midpoint', [p, center], {visible: false});

        let circle = board.create('circle', [
            midpoint,
            function() { return p.Dist(center)/2;  },
        ], {fillColor: "#ffff00", fillOpacity: 1, strokeWidth: 1});

        points.push(p);
    }

    redraw(points);
});
