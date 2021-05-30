import { useEffect, useState } from 'react';
import './App.css';
import { Col, Row} from './components';
import Board from './pages/board';
import Menu from './pages/menu';
import service from './service';
import HashLoader from 'react-spinners/HashLoader';

const GAME_TYPE = {
  VS_PLAYER: 'VS_PLAYER',
  VS_COMPUTER: 'VS_COMPUTER'
}

function App() {

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    service.Spinner().registerEvent(service.Spinner().SPINNER.LOADING_START, () => setLoading(true));
    service.Spinner().registerEvent(service.Spinner().SPINNER.LOADING_STOP, () => setLoading(false));
  }, [])

  const [gametype, setGameType] = useState();

  return (
    <>
    <Row style={{pointerEvents: loading ? 'none' : 'auto'}} className="container" justify="center">
      <Col className="spinner-wrap"><HashLoader loading={loading}  /></Col>
      <Col flex={"auto"} style={{width: '100%'}}>
        {
          !gametype ?
            <Menu setGameType={setGameType} /> : 
            <Board vscomputer={gametype == GAME_TYPE.VS_COMPUTER} setGameType={setGameType}/>
        }
      </Col>
    </Row>
    </>
  );
}

export {GAME_TYPE};
export default App;
