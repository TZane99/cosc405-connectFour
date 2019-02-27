// Constructor for the game board
class GameBoard {
    constructor(selector) {
        this.ROWS = 6;
        this.COLUMNS = 7;
        this.selector = selector;
        this.createGrid();
        this.setupEventListener();
    }

    createGrid() {
        const $gameBoard = $(this.selector);

        // For loop to generate 6 rows in the game board
        for (var rows = 0; rows < this.ROWS; rows++) {
            const $rows = $('<div />', {
                'class': 'row'
            });

            // For loop to generate 7 columns within the 6 rows in the game board
            for (var columns = 0; columns < this.COLUMNS; columns++) {
                const $columns = $('<div />', {
                    'class': 'empty column',                    
                })
                    .attr('data-coloumns', columns)  // Attribute to track what column position data is in
                    .attr('data-rows', rows);    // Attribute to track what row position data is in
                $rows.append($columns);
            }
            $gameBoard.append($rows);
        }
    }
    setupEventListener(){
        const $board = $(this.selector);

        function findLastEmpty(columns){
            const cell = $(`.columns[data-columns='${columns}']`);
            for (var i = cell.length - 1; i >= 0; i--){
                const $cells = $(cell[i]);
                if($cells.hasClass('empty')){
                    return $cells;
                }
                return null;
            }
        }
        //When hovering over the board it will show where you are going to place the piece
        $board.on('mouseenter', '.columns.empty', function() {
            const columns = $(this).data('columns');
            const $lastEmpty = findLastEmpty(columns);
            $lastEmpty.addClass('next-red-piece');

        });

        $board.on('mouseleave', '.columns', function() {
            $('.columns').removeClass('next-red-piece');
        });

        $board.on('click', '.columns.empty', function() {
            const columns = $(this).data('columns');
            const rows = $(this).data('rows');
            const $lastEmpty = findLastEmpty(columns);
            $lastEmpty.removeClass('empty');
            $lastEmpty.addClass('red');

        })
    }
}





// // Game Parameters
// const GRID_ROWS = 6;    // Number of game rows
// const GRID_COLS = 7;    // Number of game columns

// // JQuery to see if the document is ready and if it is, create the game
// $(document).ready(function() {
//     createBoard();

//     $(".newGame").click(function() {
//         refreshBoard();
//     })
// })

// function newGame() {

// }

// // Function to create the board, as well as a new game button
// function createBoard(columns, rows) {
//     for (var columns = 0; columns < GRID_COLS; columns++) {
//         for (var rows = 0; rows < GRID_ROWS; rows++) {
//             $(".container").append("<div class = 'cell'></div>");
//         }
//     }
//     $(".cell").width(840/GRID_COLS);
//     $(".cell").height(840/GRID_ROWS)

//     $(".container").append(
//         $('<button/>', {
//             'text': "New Game",
//             'class': 'newGame',
//         })
//     );


// }

// // Function to invoke other methods to clear and create a new board
// function refreshBoard() {
//     alert("Starting a new game!");
//     clearBoard();

//     createBoard();
// }

// function clearBoard() {
//     $(".cell").remove();
//     $(".newGame").remove();
// }