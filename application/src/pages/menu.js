import { useState } from "react";
import { Col, Row } from "../components";
import PropTypes from 'prop-types';
import { GAME_TYPE } from "../App";

const VIEW_TYPE = {
    MAIN: 'MAIN',
    NEW_MATCH: 'NEW_MATCH',
    JOIN_MATCH: 'JOIN_MATCH'
}

const Menu = (props) => {

    const [view, setView] = useState(VIEW_TYPE.MAIN);
    const [code, setCode] = useState();
    const [error, setError] = useState();

    const handleJoinClick = () => {
        if(!code || (code && code.toString().trim().length == 0)) 
            return setError("'code' is required.");
        if (code.toString().length != 4) return setError("Invalid code!");
        props.setGameType(GAME_TYPE.VS_COMPUTER);
    }

    const handleCodeChange = (event) => {
        if (error) setError();
        setCode(event.target.value);
    }

    const handleBackClick = () => {
        setView(VIEW_TYPE.MAIN);
        setError();
        setCode('');
    }

    return (
        <Row className="menu-row" justify="center" style={{width: '100%'}} align="center">
            <Col className="menu-col" flex={"auto"}>
                <Row><h1>Tic-Tac-Toe</h1></Row>
                <Row hidden={view != VIEW_TYPE.MAIN} >
                    <button onClick={() => setView(VIEW_TYPE.NEW_MATCH)} className="menu-btn">
                        Start New Match
                    </button>
                </Row>
                <Row onClick={() => setView(VIEW_TYPE.JOIN_MATCH)} hidden={view != VIEW_TYPE.MAIN} >
                    <button className="menu-btn">Join Match</button>
                </Row>
                <Row hidden={view != VIEW_TYPE.NEW_MATCH} >
                    <button className="menu-btn" onClick={() => props.setGameType(GAME_TYPE.VS_PLAYER)}>
                        Vs Player
                    </button>
                </Row>
                <Row hidden={view != VIEW_TYPE.NEW_MATCH} >
                    <button className="menu-btn" onClick={() => props.setGameType(GAME_TYPE.VS_COMPUTER)}>
                        Vs Computer
                    </button>
                </Row>
                <Row hidden={view != VIEW_TYPE.JOIN_MATCH} >
                    <Col flex="auto">
                        {/* <Row><b>Match Code</b></Row> */}
                        <input 
                            className="menu-input" 
                            type="tel" 
                            placeholder="Enter Code"
                            value={code}
                            onChange={handleCodeChange}
                            maxLength={4}
                        />
                        {<Row hidden={!error} style={{color: 'red', marginTop: -6, marginBottom: 8}}>{error}</Row>}
                    </Col>
                </Row>
                <Row hidden={view != VIEW_TYPE.JOIN_MATCH} >
                    <button onClick={handleJoinClick} className="menu-btn">Join Match</button>
                </Row>
                <Row onClick={handleBackClick} hidden={view == VIEW_TYPE.MAIN} >
                    <button className="menu-btn-danger">Back</button>
                </Row>
            </Col>
        </Row>
    ) 
}

Menu.propTypes = {
    setGameType: PropTypes.func.isRequired
}

export default Menu;