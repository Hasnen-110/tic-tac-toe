import Col from "./col";
import PropTypes from 'prop-types';

const Box = (props) => {
    return (
        <Col className="board-box" onClick={props.onClick}>
            <b>{props.value}</b>
        </Col>
    )
}

Box.propTypes = {
    value: PropTypes.string,
    onClick: PropTypes.func.isRequired
}

export default Box;