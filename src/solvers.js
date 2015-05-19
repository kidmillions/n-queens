/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

window.findBoards = function(currentRow, currentBoard, n, validator, callback) {
   if (currentRow === n) {
      return callback();
    }

    for (var i = 0; i < n; i++) {
      currentBoard.togglePiece(currentRow, i);
      if (!currentBoard[validator]()) {
        var result = findBoards(currentRow+1, currentBoard, n, validator, callback);
        if(result) {
          return result;
        }
      }
      currentBoard.togglePiece(currentRow, i);
    }
  };


window.findNRooksSolution = function(n) {

  var board = new Board({n: n});
  var solution = findBoards(0, board, n, "hasAnyRooksConflicts", function(){
    return _.map(board.rows(), function(row){
        return row.slice();
      });
});

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;

};



// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var counter = 0;
  var board = new Board({n: n});
  var countBoards = function(currentRow, currentBoard) {
    for (var i = 0; i < n; i++) {
      currentBoard.togglePiece(currentRow, i);
      if (!currentBoard.hasColConflictAt(i)) {
        if (currentRow === (n - 1)) {
          counter++;
          currentBoard.togglePiece(currentRow, i);
          return;
        }
        countBoards(currentRow+1, currentBoard);
      }
      currentBoard.togglePiece(currentRow, i);
    }
  };
  countBoards(0, board);
  return counter;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {

  var board = new Board({n: n});
  var solution = findBoards(0, board, n, "hasAnyQueensConflicts", function(){
    return _.map(board.rows(), function(row){
      return row.slice();
    });
  }) || board.rows();
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = 0;
  var board = new Board({n: n});

  var findSolutions = function(currentBoard, currentRow, numQueens) {
    if (n === 0) {
      solutionCount++;
      return;
    }
    if (currentRow === n) {
      return;
    }
    for (var i = 0; i < n; i++) {
      currentBoard.togglePiece(currentRow, i);
      // debugger;
      if (!currentBoard.hasAnyQueensConflicts() && !currentBoard.hasUpwardMajorDiagonalConflictAt(i, currentRow) && !currentBoard.hasUpwardMinorDiagonalConflictAt(i, currentRow)) {
        if (numQueens - 1 === 0) {
          solutionCount++;
          // debugger;
          currentBoard.togglePiece(currentRow, i);
          return;
        }
        findSolutions(currentBoard, currentRow + 1, numQueens - 1);
      }
      currentBoard.togglePiece(currentRow, i);
    }
  };

  findSolutions(board, 0, n);
  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
