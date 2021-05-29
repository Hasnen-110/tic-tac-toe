import { useState } from 'react';
import './App.css';
import { Col, Row} from './components';
import Board from './pages/board';
import Menu from './pages/menu';

const GAME_TYPE = {
  VS_PLAYER: 'VS_PLAYER',
  VS_COMPUTER: 'VS_COMPUTER'
}

function App() {

  const [gametype, setGameType] = useState();

  return (
    <Row className="container" justify="center">
      <Col flex={"auto"} style={{width: '100%'}}>
        {
          !gametype ?
            <Menu setGameType={setGameType} /> : 
            <Board setGameType={setGameType}/>
        }
      </Col>
    </Row>
  );
}

export {GAME_TYPE};
export default App;
