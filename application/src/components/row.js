import PropTypes from 'prop-types';

const Row = (props) => {

    var styles = {}
    var className = props.className ? `tic-row ${props.className}` : `tic-row`;

    styles.alignItems = props.align ? props.align : null;
    styles.justifyContent = props.justify ? props.justify : null;
    props.hidden && (styles.display = "none"); 

    props.style && (styles = {...props.style, ...styles});

    return (
        <div onClick={props.onClick} className={className} style={styles}>
            {props.children}
        </div>
    )
}

Row.propTypes = {
    className: PropTypes.string,
    align: PropTypes.string,
    justify: PropTypes.string,
    onClick: PropTypes.func,
    hidden: PropTypes.bool,
    style: PropTypes.object
}

export default Row;