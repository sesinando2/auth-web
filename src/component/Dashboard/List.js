import React, {Component} from 'react'
import PropTypes from 'prop-types'

class List extends Component {

    render() {
        let {title, items} = this.props;

        return (
            <div className="card">
                <div className="card-header">{title}</div>

                <div className="list-group">{items}</div>
            </div>
        )
    }
}

List.propTypes = {
    title: PropTypes.string.isRequired,
    items: PropTypes.arrayOf(PropTypes.element).isRequired
};

export default List;