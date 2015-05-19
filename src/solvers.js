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

window.findNRooksSolution = function(n) {

  var board = new Board({n: n});

  for(var i = 0; i < n; i++){
    for(var j = 0; j < n; j++){
      board.togglePiece(i, j);
      if(!board.hasColConflictAt(j)) {
        break;
      }
      board.togglePiece(i, j);
    }
  }
  var solution = board.rows();

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
  var foundSolution = false;
  if (n === 2 || n === 3) {
      return board.rows();
  }

  var findSolutions = function(currentBoard, currentRow, numQueens) {
    if(numQueens === 0){
      foundSolution = true;
      if(n === 0){
        currentBoard = new Board({n: 0});
      }
      solution = currentBoard.rows();
    }
    if (!foundSolution) {
      for(var i = 0; i < n; i++){
        currentBoard.togglePiece(currentRow, i);
        if(!currentBoard.hasAnyQueensConflicts() && !currentBoard.hasUpwardMajorDiagonalConflictAt(i, currentRow) && !currentBoard.hasUpwardMinorDiagonalConflictAt(i, currentRow)){
          findSolutions(currentBoard, currentRow+1, numQueens -1);
        }
        if (!foundSolution) {
          currentBoard.togglePiece(currentRow, i);
        }
      }
    }
  };

  findSolutions(board, 0, n);
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
