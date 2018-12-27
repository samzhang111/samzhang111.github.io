let test_div = document.getElementById('measure');
test_div.textContent = "x"
let char_width = test_div.clientWidth;
let char_height = test_div.clientHeight;
test_div.textContent = '';
let space_elem = document.getElementById("space");
let width = space_elem.clientWidth, height = space_elem.clientHeight;
let h_cells = width / char_width, v_cells = height / char_height;

let cubeheight = 2, cubewidth = cubeheight * 2;
let boardsize = Math.floor(h_cells / 2);
let halfboard = Math.floor(boardsize / 2);

let setcoord = (x, y, val) => {
    if (x >= halfboard || x <= -halfboard || y > halfboard || y <= -halfboard) {
    }
    else {
        board[halfboard - y][x + halfboard] = val;
    }
};

let board = Array(boardsize).fill().map( () => Array(boardsize).fill(0));

let errorfield = document.getElementById('error');
let eqnfield = document.getElementById('equation')
eqnfield.addEventListener('keyup', (e) => {
    if (e.key != 'Enter') return;

    eqnchange(eqnfield.value);
});

// handle changing of equations
eqnfield.addEventListener('blur', (e) => {
    eqnchange(eqnfield.value);
});

let eqnchange = (eqn) => {
    if (eqn===undefined || eqn.trim() == '') {
        eqn = eqnfield.getAttribute("placeholder");
    }

    try {
        compiled = math.compile(eqn);
        cubefunc = (x, y) => compiled.eval({x: x/20, y: y/20})

        erase();

        march(cubefunc);
    }
    catch (error)  {
        errorfield.textContent = error
    }
}

// marching cubes

function march(cubefunc) {
    for (var i = 0 - halfboard; i < halfboard; i+=2) {
        for (var j = 0 - halfboard; j < halfboard; j+=3) {
            let tl = cubefunc(i, j) >= 0 ? 1 : -1
            let bl = cubefunc(i, j + 3) >= 0 ? 1 : -1
            let tr = cubefunc(i + 2, j) >= 0 ? 1 : -1
            let br = cubefunc(i + 2, j + 3) >= 0 ? 1 : -1

            if (tl == bl && bl == tr && tr == br) {
                if (tl > 0) {
                    setcoord(i, j, [3, ' '])
                    setcoord(i, j + 1, [3, ' '])
                    setcoord(i, j + 2, [3, ' '])
                    setcoord(i, j + 3, [3, ' '])
                    setcoord(i + 1, j, [3, ' '])
                    setcoord(i + 1, j + 1, [3, ' '])
                    setcoord(i + 1, j + 2, [3, ' '])
                    setcoord(i + 1, j + 3, [3, ' '])
                }
            }
            else if (tl == bl && bl == br && br != tr) {
                setcoord(i, j, [1, 'o'])
                setcoord(i, j + 1, [3, ' '])
                setcoord(i, j + 2, [3, ' '])
                setcoord(i, j + 3, [3, ' '])
                setcoord(i + 1, j, [2, 'o'])
                setcoord(i + 1, j + 1, [3, 'o'])
                setcoord(i + 1, j + 2, [1, 'o'])
                setcoord(i + 1, j + 3, [3, ' '])
            }
            // top and bottom different
            else if (tl == tr && bl == br && tl != bl) {
                setcoord(i, j, [3, ' '])
                setcoord(i, j + 1, [3, 'o'])
                setcoord(i, j + 2, [3, 'o'])
                setcoord(i, j + 3, [3, ' '])
                setcoord(i + 1, j, [3, ' '])
                setcoord(i + 1, j + 1, [3, 'o'])
                setcoord(i + 1, j + 2, [3, 'o'])
                setcoord(i + 1, j + 3, [3, ' '])
            }
            // bl ooo
            else if (tl == tr && tr == br && br != bl) {
                setcoord(i, j, [3, ' '])
                setcoord(i, j + 1, [2, 'o'])
                setcoord(i, j + 2, [3, 'o'])
                setcoord(i, j + 3, [1, 'o'])
                setcoord(i + 1, j, [3, ' '])
                setcoord(i + 1, j + 1, [3, ' '])
                setcoord(i + 1, j + 2, [3, ' '])
                setcoord(i + 1, j + 3, [2, 'o'])
            }
            // tl ooo
            else if (tl != tr && tr == br && br == bl) {
                setcoord(i, j, [1, 'o'])
                setcoord(i, j + 1, [3, 'o'])
                setcoord(i, j + 2, [2, 'o'])
                setcoord(i, j + 3, [3, ' '])
                setcoord(i + 1, j, [2, 'o'])
                setcoord(i + 1, j + 1, [3, ' '])
                setcoord(i + 1, j + 2, [3, ' '])
                setcoord(i + 1, j + 3, [3, ' '])
            }
            // tr ooo
            else if (tl == bl && bl == br && br != tr) {
                setcoord(i, j, [1, 'o'])
                setcoord(i, j + 1, [3, ' '])
                setcoord(i, j + 2, [3, ' '])
                setcoord(i, j + 3, [3, ' '])
                setcoord(i + 1, j, [2, 'o'])
                setcoord(i + 1, j + 1, [3, 'o'])
                setcoord(i + 1, j + 2, [1, 'o'])
                setcoord(i + 1, j + 3, [3, ' '])

            }
            // br ooo
            else if (tl == bl && bl == tr && tr != br) {
                setcoord(i, j, [3, ' '])
                setcoord(i, j + 1, [3, ' '])
                setcoord(i, j + 2, [3, ' '])
                setcoord(i, j + 3, [1, 'o'])
                setcoord(i + 1, j, [3, ' '])
                setcoord(i + 1, j + 1, [1, 'o'])
                setcoord(i + 1, j + 2, [3, 'o'])
                setcoord(i + 1, j + 3, [2, 'o'])

            }
            // vert
            else if (tl == bl && tr == br && tl != tr) {
                setcoord(i, j, [1, 'o'])
                setcoord(i, j + 1, [1, 'o'])
                setcoord(i, j + 2, [1, 'o'])
                setcoord(i, j + 3, [1, 'o'])
                setcoord(i + 1, j, [2, 'o'])
                setcoord(i + 1, j + 1, [2, 'o'])
                setcoord(i + 1, j + 2, [2, 'o'])
                setcoord(i + 1, j + 3, [2, 'o'])
            }
            else {
            console.log(i, j, tl, bl, tr, br);

                setcoord(i, j, [3, 'o'])
                setcoord(i, j + 1, [3, 'o'])
                setcoord(i, j + 2, [3, 'o'])
                setcoord(i, j + 3, [3, 'o'])
                setcoord(i + 1, j, [3, 'o'])
                setcoord(i + 1, j + 1, [3, 'o'])
                setcoord(i + 1, j + 2, [3, 'o'])
                setcoord(i + 1, j + 3, [3, 'o'])
            }
        }
    }

    // draw axis

    for (var i = 0 - halfboard; i < halfboard; i++) {
        setcoord(0, i, [3, '+']);
        setcoord(i, 0, [3, '+']);
    }



    redraw(board);
}

function redraw(board) {
    let toChars = (line) => {
        return _.map(line, val => {
            let c = val[0];
            let chr = val[1];
            if (c == 1) {
                return ' ' + chr;
            }
            else if (c == 2) {
                return chr + ' ';
            }
            else if (c == 3) {
                return chr + chr;
            }

            return '  ';
        })
    }
    let raster = _.map(board, toChars)
    let boardlines = _.invokeMap(raster, Array.prototype.join, "")
    let boardstr = boardlines.join("\r\n")

    space_elem.textContent = boardstr;
}

function erase() {
    errorfield.textContent = '';

    board = Array(boardsize).fill().map( () => Array(boardsize).fill(0));
    redraw(board);
}

eqnchange();
console.log(h_cells, v_cells)

//aw: 6, ah: 12
//ww: 1920, wh: 943
//
// square:
// xxxx
// xxxx
