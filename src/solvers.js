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























  // var solutionCount = 0;
  // var board = new Board({n: n});
  // // debugger;
  // var findAllNonConflicts = function(currentRow, currentBoard, numRooks) {
  //   //if at end of the decision tree, no more rooks
  //     //increment solution count

  //   if (numRooks === 0) {
  //     solutionCount++;
  //     console.log("current count: " + solutionCount + " for " + n + " rooks." )
  //     console.log(currentBoard.rows());
  //     return;
  //   }

  //   if (currentRow > currentBoard.rows().length - 1) {
  //     return;
  //   }

  //   var values = currentBoard.rows().slice();
  //   var newBoard = new Board(values);

  //   for(var i = 0; i < newBoard.rows().length; i++){
  //     //clear the row
  //     newBoard.togglePiece(currentRow, i);
  //     if(newBoard.hasColConflictAt(i)) {
  //       findAllNonConflicts(currentRow + 1, newBoard, numRooks);
  //     }

  //     if (!(newBoard.hasColConflictAt(i))) {
  //       numRooks--;
  //       findAllNonConflicts(currentRow + 1, newBoard, numRooks);
  //     }
  //     console.log(newBoard.rows)
  //     newBoard.togglePiece(currentRow, i);

  //     //if there is conflict with the column
  //       //

  //   }
  // };

  // findAllNonConflicts(0, board, n);

  // console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  // return solutionCount;
};



// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};


// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
