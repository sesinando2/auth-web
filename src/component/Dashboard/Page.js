import React, {Component} from 'react'
import PropTypes from 'prop-types'

export default class Page extends Component {

    render() {

        let {children, title} = this.props;

        return (
            <main role="main" className="col-md-9 ml-sm-auto col-lg-10 px-4">
                <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
                    <h1 className="h2">{title}</h1>
                </div>

                {children}
            </main>
        )
    }
}

Page.propTypes = {
  title: PropTypes.string.isRequired
};
