(() => {
    const xmax = 2;
    const ymax = 2;
    const numpoints = 10;

    JXG.Options.layer['polygon'] = 8;
    const board = JXG.JSXGraph.initBoard('treasure', {
        boundingbox: [-xmax, ymax, xmax, -ymax],
        axis: true,
        pan: false,
    });

    let tree1 = board.create('point', [-1, 0], {name: "Tree 1", color: "green"})
    let tree2 = board.create('point', [1, 0], {name: "Tree 2", color: "green"})
    let gallows = board.create('point', [0, -0.5], {name: 'Gallows', color: "blue"})

    let gtree1 = board.create('segment', [gallows, tree1])
    let gtree2 = board.create('segment', [tree2, gallows])

    let perp1 = board.create('perpendicularsegment', [gtree1, tree1], {dash: 2})
    let perp2op = board.create('perpendicularsegment', [gtree2, tree2], {visible: false})
    let reflected = board.create('reflection', [perp2op.point, gtree2], {name: 'Q'})
    let perp2 = board.create('segment', [tree2, reflected], {color: 'black', dash: 2})

    perp1.point.setAttribute({visible: true, name: 'P', withLabel: true})

    let angle1 = board.create('angle', [perp1.point, tree1, gallows], {radius: 0.3})
    let angle2 = board.create('angle', [gallows, tree2, reflected], {radius: 0.3})

    

    let treasureline = board.create('segment', [perp1.point, reflected], {color: 'green'})
    let treasure = board.create('midpoint', [perp1.point, reflected], {name: "Treasure"})

})();

