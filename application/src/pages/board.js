import '../App.css';
import { useEffect, useState } from 'react';
import { Col, Box, Row} from '../components';
import PropTypes from 'prop-types';
import service from '../service';

const PLAYERS = ['X', 'O'];
const INITIAL_BOARD = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
];

const Board = (props) => {

    const [currentPlayer, setCurrentPlayer] = useState(PLAYERS[0]); 
    const [board, setBoard] = useState(INITIAL_BOARD);
    const [winner, setWinner] = useState();
    
    useEffect(() => {
        if (props.vscomputer) {
            var temp = JSON.parse(JSON.stringify(board));
            temp[0][0] = currentPlayer; 
            setBoard(temp);
            setCurrentPlayer(currentPlayer == PLAYERS[0] ? PLAYERS[1] : PLAYERS[0]);
        }
    }, [])

    const checkWinner = async (temp) => {
        var resp = await service.Board().checkWinner(temp)
        if (resp && resp.winner == -1) setWinner('Tie!');
        else if (resp && resp.winner == 0) return false;
        else setWinner(`${resp.winner} is the winner!`)   
    }

    const handleNextMove = async (temp) => {
        var nextplayer = currentPlayer == PLAYERS[0] ? PLAYERS[1] : PLAYERS[0];
        if (props.vscomputer) {
            var move = await service.Board().getNextMove(temp, nextplayer, currentPlayer);
            var tmp = JSON.parse(JSON.stringify(temp));
            tmp[move.i][move.j] = nextplayer; 
            setBoard(tmp);
            await checkWinner(tmp);
        } else setCurrentPlayer(nextplayer);
    }

    const handleClick = async (row, col) => {
        if (board[row][col] != '' || winner) return;
        var temp = JSON.parse(JSON.stringify(board));
        temp[row][col] = currentPlayer;
        setBoard(temp);
        if (!await checkWinner(temp)) handleNextMove(temp);
    }

    const handleRefresh = () => {
        if (props.vscomputer) {
            var temp = JSON.parse(JSON.stringify(INITIAL_BOARD));
            temp[0][0] = PLAYERS[0];
            setBoard(temp); 
        } else {
            setBoard(INITIAL_BOARD);
            setCurrentPlayer(PLAYERS[1])
        }
        setWinner();
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
            <Col className="board-col"> {renderBoard()} </Col>
            </Row>
            { winner && <> <br/> <center><h3 style={{color: 'green'}}>{winner}</h3></center> </>}
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
