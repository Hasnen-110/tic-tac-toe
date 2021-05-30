import Board from './board';
import spinner from './spinner';

class Service {
    Board() {
        return new Board(spinner);
    }

    Spinner() {
        return spinner;
    }
}

export default new Service();