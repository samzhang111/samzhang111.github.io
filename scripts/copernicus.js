(() => {
    const xmax = 2;
    const ymax = 2;
    const numpoints = 10;

    JXG.Options.layer['polygon'] = 8;
    const board = JXG.JSXGraph.initBoard('copernicus', {
        boundingbox: [-xmax, ymax, xmax, -ymax],
        axis: true
    });

    let slider = board.create('slider', [[0.15,1.65],[1.25,1.65],[0,0,1]],{name:'Roll', size: 7, label: {fontSize: 15}});
    let offsetslider = board.create('slider', [[0.15,1.25],[1.25,1.25],[0,0,1]],{name:'Offset', size: 7, label: {fontSize: 15}});

    offsetslider.on('drag', reset);

    let origin = board.create('point', [0, 0], {visible: false})

    let circcenter = board.create('point', [function() {
        return 0.5 * Math.cos(2 * Math.PI * slider.Value())
    }, function() {
        return 0.5 * Math.sin(2 * Math.PI * slider.Value())
    }], {visible: false})

    let circpt2 = board.create('point', [
        function() { return circcenter.X() * 2; }, 
        function() { return circcenter.Y() * 2; },
    ], {visible: false});

    let circpt3 = board.create('point', [
        function() { return circcenter.X() + 0.5 * Math.sin(2 * Math.PI * (slider.Value() + offsetslider.Value())) },
        function() { return circcenter.Y() + 0.5 * Math.cos(2 * Math.PI * (slider.Value() + offsetslider.Value())) }
        ], {trace: true, fillOpacity: 0.8, strokeOpacity: 0.8, name: "K"})
    let smallcircle = board.create('circle', [circcenter, 0.5]);
        //let smallcircle = board.create('circumcircle', [origin, circpt2, circpt3]);


    let largecircle = board.create('circle', [origin, 1], {fixed: true, strokeColor: 'black', highlightStrokeColor: 'black'})
    //let smallcircle = board.create('circle', [smallcenter, 0.5])


    function reset() {
        circpt3.clearTrace();
    }
    let resetbutton = board.create('button', [0.95, 0.75, "Reset path", reset])

})();

(() => {
    const xmax = 2;
    const ymax = 2;
    const numpoints = 10;

    JXG.Options.layer['polygon'] = 8;
    const board = JXG.JSXGraph.initBoard('copernicusdetail', {
        boundingbox: [-xmax, ymax, xmax, -ymax],
        axis: true
    });

    let slider = board.create('slider', [[0.15,1.65],[1.25,1.65],[0,0,1]],{name:'Roll', size: 7, label: {fontSize: 15}});
    let offsetslider = board.create('slider', [[0.15,1.25],[1.25,1.25],[0,0,1]],{name:'Offset', size: 7, label: {fontSize: 15}});

    let origin = board.create('point', [0, 0], {visible: false})
    let xref = board.create('point', [1, 0], {visible: false})

    let circcenter = board.create('point', [function() {
        return 0.5 * Math.cos(2 * Math.PI * slider.Value())
    }, function() {
        return 0.5 * Math.sin(2 * Math.PI * slider.Value())
    }], {visible: false})

    let circpt2 = board.create('point', [
        function() { return circcenter.X() * 2; }, 
        function() { return circcenter.Y() * 2; }],
    {visible: false});

    let circpt3 = board.create('point', [
        function() { return circcenter.X() + 0.5 * Math.sin(2 * Math.PI * (slider.Value() + offsetslider.Value())) },
        function() { return circcenter.Y() + 0.5 * Math.cos(2 * Math.PI * (slider.Value() + offsetslider.Value())) }
    ], {trace: false, fillOpacity: 0.8, strokeOpacity: 0.8, name: "K"})

    let circptref = board.create('point', [
        function() { return  circcenter.X() + 0.5 * Math.sin(2 * Math.PI * (offsetslider.Value())); },
        function() { return  circcenter.Y() + 0.5 * Math.cos(2 * Math.PI * (offsetslider.Value())); },
    ], {visible: false})

    let circangle = board.create('angle', [xref, origin, circcenter])
    let circangle2 = board.create('angle', [circpt3, circcenter, circptref])
    let guideline = board.create('line', [origin, circpt3], {strokeColor: 'black', highlightStrokeColor: 'black'})


    let smallcircle = board.create('circle', [circcenter, 0.5]);
        //let smallcircle = board.create('circumcircle', [origin, circpt2, circpt3]);

    let largecircle = board.create('circle', [origin, 1], {fixed: true, strokeColor: 'black', highlightStrokeColor: 'black'})
})();


(() => {
    const xmax = 2;
    const ymax = 2;
    const numpoints = 10;

    JXG.Options.layer['polygon'] = 8;
    const board = JXG.JSXGraph.initBoard('copernicusradius', {
        boundingbox: [-xmax, ymax, xmax, -ymax],
        axis: true
    });

    let slider = board.create('slider', [[-1.25,1.75],[1.25,1.75],[0,0,5]],{name:'Roll', size: 7, label: {fontSize: 15}, snapWidth: 0.001});
    let offsetslider = board.create('slider', [[-1.25,1.5],[1.25,1.5],[0,0,1]],{name:'Offset', size: 7, label: {fontSize: 15}});
    let radiusslider = board.create('slider', [[-1.25,1.25],[1.25,1.25],[0.01,0.25,0.5]],{name:'Radius', size: 7, label: {fontSize: 15}, snapWidth: 0.01});

    offsetslider.on('drag', reset);
    radiusslider.on('drag', reset);

    let origin = board.create('point', [0, 0], {visible: false})

    let circpt2 = board.create('point', [
        function() { return Math.cos(2 * Math.PI * slider.Value())}, 
        function() { return Math.sin(2 * Math.PI * slider.Value())}, 
    ], {visible: false});

    let circcenter = board.create('point', [function() {
        return circpt2.X() - radiusslider.Value() * Math.cos(2 * Math.PI * slider.Value())
    }, function() {
        return circpt2.Y() - radiusslider.Value() * Math.sin(2 * Math.PI * slider.Value())
    }], {visible: false})


    let circpt3 = board.create('point', [
        function() { return circcenter.X() + radiusslider.Value() * Math.sin(2 * (1/radiusslider.Value() - 1)*Math.PI * (slider.Value() + offsetslider.Value())) },
        function() { return circcenter.Y() + radiusslider.Value() * Math.cos(2 * (1/radiusslider.Value() - 1)*Math.PI * (slider.Value() + offsetslider.Value())) }
        ], {trace: true, fillOpacity: 0.8, strokeOpacity: 0.8, name: "K"})

        let smallcircle = board.create('circle', [circcenter, function() {
            return radiusslider.Value()
        }]);
        //let smallcircle = board.create('circumcircle', [origin, circpt2, circpt3]);


    let largecircle = board.create('circle', [origin, 1], {fixed: true, strokeColor: 'black', highlightStrokeColor: 'black'})
    //let smallcircle = board.create('circle', [smallcenter, 0.5])


    function reset() {
        circpt3.clearTrace();
    }
    let resetbutton = board.create('button', [0.95, 0.75, "Reset path", reset])

})();
