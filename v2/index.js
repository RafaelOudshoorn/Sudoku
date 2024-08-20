var numSelected = null;
var tileSelected = null;
var gameBoard = [];
var board = [];
var solution = [];

var errors = 0;

var boards = [
    "--74916-52---6-3-9-----7-1--586----4--3----9---62--1879-4-7---267-83----81--45---",
    "49-----2-----2-61-2----793-1--8----2-7-94-5835--2----1-54162-7-9-37-81--7613-4258",
    "-2-------7---9-21--6---84-59-7---54-45-----8--8145-6-3---83275---2-45168-9-7-1---",
    "--395-64221-48---765--7-89--876291---2-8-----93--47--634----7--59----46--6829--15",
    "-183-597--769-14352----94---53-96718174-3-569--6157---89--63-24-3--4-8-5-----2-37",
];
var solutions = [
    "387491625241568379569327418758619234123784596496253187934176852675832941812945763",
    "495613827387529614216487935149835762672941583538276491854162379923758146761394258",
    "529614837748593216163278495937186542456327981281459673614832759372945168895761324",
    "873951642219486537654372891487629153126835974935147286341568729592713468768294315",
    "418325976769814352325679481253496718174238569986157243897563124632741895541982637",
];
const x = Math.floor(Math.random() * boards.length);
var boardId = x;

function setErrors(err) {
    document.getElementById("errors").innerText = err + "/3";
}

window.onload = function () {
    document.getElementById("game_status").innerText = "Waiting";
    setGame();
}

function setGame() {
    setErrors(errors);
    // #digits
    for (let i = 1; i <= 9; i++){
        let number = document.createElement('div');
        number.id = i;
        number.innerText = i;
        number.addEventListener("click", selectNumber);
        number.classList.add('number');
        document.getElementById("digits").appendChild(number);
    }

    // #board
    boardRearange(boardId);
    for (let r = 0; r < 9; r++){
        for (let c = 0; c < 9; c++){
            let tile = document.createElement("div");
            tile.id = r.toString() + "-" + c.toString();
            if (board[r][c] != "-") {
                tile.innerText = board[r][c];
                tile.classList.add("tile-start");
            }
            if (r == 2 || r == 5) {
                tile.classList.add("horizontal-line");
            }
            if (c == 2 || c == 5) {
                tile.classList.add("vertical-line");
            }
            tile.addEventListener("click", selectTile);
            tile.classList.add("tile");
            document.getElementById("board").append(tile);
        }       
    }
}
function boardRearange(id) {
    var i = 0;
    for (let r = 0; r < 9; r++){
        var b = "";
        var s = "";
        for (let c = 0; c < 9; c++){
            b += boards[id][i];
            s += solutions[id][i];
            i++;
        }
        gameBoard.push(b);
        board.push(b);
        solution.push(s);
    }
}
function selectNumber() {
    document.getElementById("game_status").innerText = "Playing";
    if (numSelected != null) {
        numSelected.classList.remove("number-selected");
    }
    numSelected = this;
    numSelected.classList.add("number-selected");
}
function selectTile() {
    if (numSelected) {
        if (this.innerText != "") {
            return;
        }
        let coords = this.id.split("-");
        let r = parseInt(coords[0]);
        let c = parseInt(coords[1]);
        if (solution[r][c] == numSelected.id) {
            this.innerText = numSelected.id;
            this.classList.add("tile-placed");
        } else {
            errors += 1;
            setErrors(errors);
            if (errors >= 3) {
                document.getElementById("game_status").innerText = "Game Over";
                document.getElementById("board").style.visibility = 'hidden';
                setInterval(() => {
                    location.reload();
                }, 1000);
            }
        }
    }
}