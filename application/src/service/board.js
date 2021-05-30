import Axios from 'axios';
import constants from '../constants';

class Board {
    constructor(spinner) {
        this.spinner = spinner;
    }

    checkWinner(board) {
        return new Promise((resolve, reject) => {
            this.spinner.fireEvent( this.spinner.SPINNER.LOADING_START, {});
            Axios.post(constants.URI+'/checkwinner', {board})
            .then(response => {
                this.spinner.fireEvent( this.spinner.SPINNER.LOADING_STOP, {});
                console.log(response.data);
                resolve(response.data);
            })
            .catch((err) => {
                this.spinner.fireEvent( this.spinner.SPINNER.LOADING_STOP, {});
                console.log(err);
            })
        })
    }

    getNextMove(board, computer, player) {
        return new Promise((resolve, reject) => {
            this.spinner.fireEvent( this.spinner.SPINNER.LOADING_START, {});
            Axios.post(constants.URI+'/nextmove', {board, computer, player})
            .then(response => {
                this.spinner.fireEvent( this.spinner.SPINNER.LOADING_STOP, {});
                console.log(response.data);
                resolve(response.data);
            })
            .catch((err) => {
                this.spinner.fireEvent( this.spinner.SPINNER.LOADING_STOP, {});
                console.log(err);
            })
        })
    }

}

export default Board;