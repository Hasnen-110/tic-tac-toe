import '../App.css';
import { useState } from 'react';
import { Col, Box, Row} from '../components';
import PropTypes from 'prop-types';

const PLAYERS = ['X', 'O'];
const INITIAL_BOARD = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const Board = (props) => {

    const [currentPlayer, setCurrentPlayer] = useState(PLAYERS[0]); 
    const [board, setBoard] = useState(INITIAL_BOARD);

    const handleClick = (row, col) => {
        if (board[row][col] != '') return;
        var temp = JSON.parse(JSON.stringify(board));
        temp[row][col] = currentPlayer;
        setBoard(temp);
        setCurrentPlayer(currentPlayer == PLAYERS[0] ? PLAYERS[1] : PLAYERS[0]);
    }

    const handleRefresh = () => {
        setBoard(INITIAL_BOARD);
    }

    const renderBoard = (props) => {
        return board.map((row, rowIndex) => {
        return (
            <Row>
            {
                row.map((col, colIndex) => (
                <Box value={col} onClick={() => handleClick(rowIndex, colIndex)} />))
            }
            </Row>
        )
        })
    }

    return (
        <>
        <Row justify="center"><h1>Tic-Tac-Toe</h1></Row>
        <Row className="board-container" justify="center">
        <Col className="board-col">
            {renderBoard()}
        </Col>
        </Row>
        <br/>
        <Row justify="center">
            <button onClick={handleRefresh} style={{width: 235}} className="menu-btn-green">Restart</button>
        </Row>
        <Row justify="center">
            <button onClick={() => props.setGameType()} style={{width: 235}} className="menu-btn-danger">Back</button>
        </Row>
        </>
    );
}

Board.propTypes = {
    setGameType: PropTypes.func.isRequired
}

export default Board;
