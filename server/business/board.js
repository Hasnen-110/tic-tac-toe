import ApplicationError, { ERROR } from "../error/error";

class Board {
    constructor(options={board: []}) {
        this.board = options.board; 
    }

    /**
     * method to validate the board by check the length of 
     * rows and columns.
     */
    _validateBoard() {
        if (
            !this.board || 
            (this.board && this.board.length == 0) || 
            (this.board && this.board.length < 3)
        ) throw new ApplicationError(ERROR.INVALID_BOARD);
        for (var i = 0; i < this.board.length; i++) {
            if (this.board[i].length < 3) 
                throw new ApplicationError(ERROR.INVALID_BOARD);
        } 
    }

    /**
     * method for counting all the empty places.
     * @param {*} board - 3 X 3 game board.
     * @returns Number - empty places count.
     */
    _getEmptyCount( board=this.board ) {
        // return board.reduce((p,row) => {
        //     row.forEach(col => {
        //         return p + (col == '' ? 1 : 0);
        //     })
        // },0);
        var count = 0;
        board.forEach(row => {
            count += row.filter(e => e == '').length;
        })
        return count;
    }

    /**
     * Method to compare board positions.
     * @param {*} positions 
     * @return Boolean
     */
    _comparer( positions=[] ) {
        var p = positions;
        return (
            this.board[p[0][0]][p[0][1]] == this.board[p[1][0]][p[1][1]] && 
            this.board[p[1][0]][p[1][1]] == this.board[p[2][0]][p[2][1]] && 
            this.board[p[0][0]][p[0][1]] != ''            
        );
    }

    /**
     * method to check the diagnol positions of the board.
     * @param {*} board - 3 X 3 game board.
     * @returns Boolean - true if winner found
     */
    _checkDiagnols( board=this.board ) {
        var diagnol1 = [[0,0], [1,1], [2,2]],
            diagnol2 = [[0,2], [1,1], [2,0]];
        if (this._comparer(diagnol1) || this._comparer(diagnol2)) {
            this.gamewinner = board[1][1];
            return true;
        }
        return false;
    }

    checkWinner() {
        this._validateBoard();
        if (this._checkDiagnols()) return {winner: this.gamewinner};
        for (var i = 0; i < this.board.length; i++) {
            var horizontal = [[i, 0], [i, 1], [i, 2]],
                vertical   = [[0, i], [1, i], [2, i]];
            if (this._comparer(horizontal)) return {winner: this.board[i][0]};
            if (this._comparer(vertical)) return {winner: this.board[0][i]};
        }
        if (this._getEmptyCount() == 0 && !this.gamewinner)
            return {winner: -1}; // tie
        return {winner: 0} // not decided yet
    }
    
}


export default Board;