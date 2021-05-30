const { default: Board } = require("./board");

class Computer {
    constructor(options={board: [], maximizer: '', minimizer: ''}) {
        this.board      = options.board;
        this.maximizer  = options.maximizer;
        this.minimizer  = options.minimizer;
    }

    _minmaxAlgo(board=this.board, depth, initialscore, turn, picker) {
        var Score = initialscore;
        var {winner} = new Board({board}).checkWinner();
        if (winner != 0) return winner == this.maximizer ? 1 : (winner == -1) ? 0 : -1;
        for (var i = 0; i < 3; i++) {
            for (var j = 0; j < 3; j++) {
                if (board[i][j] != '') continue;
                board[i][j] = turn;
                var score = this._minmaxAlgo(
                    board,
                    depth + 1, 
                    initialscore == -Infinity ? Infinity : -Infinity, 
                    turn == this.maximizer ? this.minimizer : this.maximizer,
                    turn == this.maximizer ? Math.min : Math.max
                );
                board[i][j] = '';
                Score = picker(score, Score);
            }
        }
        return Score;
    }

    nextMove(board=this.board) {
        var finalScore = -Infinity, nextmove=undefined;
        for (var i = 0; i < this.board.length; i++) {
            for (var j = 0; j < this.board[i].length; j++) {
                if (board[i][j] != '') continue;
                board[i][j] = this.maximizer;
                let score = this._minmaxAlgo(board, 0, Infinity, this.minimizer, Math.min);
                board[i][j] = '';
                if (score > finalScore) {
                    finalScore = score;
                    nextmove = { i, j };
                }
            }
        }
        return nextmove;
    }
}

export default Computer;