import PropTypes from 'prop-types';

const Col = (props) => {

   var styles = {}   
   var className = props.className ? `tic-col ${props.className}` : `tic-col`;

   styles.flex =  props.flex ? `0 0 ${props.flex}` : null;

   props.style && (styles = {...props.style, ...styles});

    return (
        <div hidden={props.hidden} onClick={props.onClick} className={className} style={styles}>
            {props.children}
        </div>
    )
}

Col.propTypes = {
    flex: PropTypes.string,
    className: PropTypes.string,
    onClick: PropTypes.func,
    hidden: PropTypes.bool,
    style: PropTypes.object
}

export default Col;