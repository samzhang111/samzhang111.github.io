(() => {
    const xmax = 1.5;
    const ymax = 1.5;
    const numpoints = 10;

    JXG.Options.layer['polygon'] = 8;
    const board = JXG.JSXGraph.initBoard('multicat', {
        boundingbox: [-xmax, xmax, ymax, -ymax],
        axis: true,
        pan: false,
    });

    let slider = board.create('slider', [[0.75,1],[1.25,1],[0,0,1]],{name:'Ladder'});
    let catslider = board.create('slider', [[0.75,1.25],[1.25,1.25],[0,0.5,1]],{name:'Cat'});

    catslider.on('drag', function() {
        reset();
        cat1.moveTo([0, catslider.Value()])
        cat2.moveTo([0, catslider.Value()])
        cat3.moveTo([0, -catslider.Value()])
        cat4.moveTo([0, -catslider.Value()])
    })

    let ladder1 = board.create('curve', [
        function(t) { 
            let x = t * slider.Value(); 

            if (x >= 0 && x <= 1) {
                return x;
            }
        },
        function(t) { 
            let y = (1 - t) * Math.sqrt(1 - slider.Value() * slider.Value()); 

            if (y >= 0 && y <= 1) {
                return y;
            }
        }
        ], { strokewidth: 4});
    var cat1 = board.create('glider', [0, 0.5, ladder1], {trace: true, name: 'Cat', fixed: true})

    let ladder2 = board.create('curve', [
        function(t) { 
            let x = t * slider.Value(); 

            if (x >= 0 && x <= 1) {
                return -x;
            }
        },
        function(t) { 
            let y = (1 - t) * Math.sqrt(1 - slider.Value() * slider.Value()); 

            if (y >= 0 && y <= 1) {
                return y;
            }
        }
        ], { strokewidth: 4});
    var cat2 = board.create('glider', [0, 0.5, ladder2], {trace: true, name: 'Cat', fixed: true})

    let ladder3 = board.create('curve', [
        function(t) { 
            let x = t * slider.Value(); 

            if (x >= 0 && x <= 1) {
                return -x;
            }
        },
        function(t) { 
            let y = (1 - t) * Math.sqrt(1 - slider.Value() * slider.Value()); 

            if (y >= 0 && y <= 1) {
                return -y;
            }
        }
        ], { strokewidth: 4});
    var cat3 = board.create('glider', [0, -0.5, ladder3], {trace: true, name: 'Cat', fixed: true})

    let ladder4 = board.create('curve', [
        function(t) { 
            let x = t * slider.Value(); 

            if (x >= 0 && x <= 1) {
                return x;
            }
        },
        function(t) { 
            let y = (1 - t) * Math.sqrt(1 - slider.Value() * slider.Value()); 

            if (y >= 0 && y <= 1) {
                return -y;
            }
        }
        ], { strokewidth: 4});
    var cat4 = board.create('glider', [0, -0.5, ladder4], {trace: true, name: 'Cat', fixed: true})

    function reset() {
        cat1.clearTrace();
        cat2.clearTrace();
        cat3.clearTrace();
        cat4.clearTrace();
        slider.setValue(0);
    }

    var resetbutton = board.create('button', [0.75, 0.75, "Reset path", reset])
})();

( () => {
    const xmax = 1.5;
    const ymax = 1.5;
    const numpoints = 10;

    JXG.Options.layer['polygon'] = 8;
    const board = JXG.JSXGraph.initBoard('solocat', {
        boundingbox: [-xmax/5, xmax, ymax, -ymax/5],
        axis: true,
        pan: false,
    });

    let slider = board.create('slider', [[0.75,1],[1.25,1],[0,0,1]],{name:'Ladder'});
    let catslider = board.create('slider', [[0.75,1.25],[1.25,1.25],[0,0.5,1]],{name:'Cat'});

    catslider.on('drag', function() {
        reset();
        cat1.moveTo([0, catslider.Value()])
    })

    let ladder1 = board.create('curve', [
        function(t) { 
            let x = t * slider.Value(); 

            if (x >= 0 && x <= 1) {
                return x;
            }
        },
        function(t) { 
            let y = (1 - t) * Math.sqrt(1 - slider.Value() * slider.Value()); 

            if (y >= 0 && y <= 1) {
                return y;
            }
        }
        ], { strokewidth: 4});
    var cat1 = board.create('glider', [0, 0.5, ladder1], {trace: true, name: 'Cat', fixed: true})


    function reset() {
        cat1.clearTrace();
        slider.setValue(0);
    }

    var resetbutton = board.create('button', [0.75, 0.75, "Reset path", reset])
})();
