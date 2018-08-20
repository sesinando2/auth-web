import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'

import {
    selectSubreddit,
    fetchPostsIfNeeded,
    invalidateSubreddit
} from "../actions"
import Picker from '../components/Picker'
import Posts from '../components/Posts'

class AsyncApp extends Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleRefreshClick = this.handleRefreshClick.bind(this);
    }

    componentDidMount() {
        const { dispatch, selectedSubreddit } = this.props;
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }

    componentDidUpdate(prevPops) {
        if (this.props.selectedSubreddit !== prevPops.selectedSubreddit) {
            const { dispatch, selectedSubreddit } = this.props;
            dispatch(fetchPostsIfNeeded(selectedSubreddit));
        }
    }

    handleChange(nextSubreddit) {
        this.props.dispatch(selectSubreddit(nextSubreddit));
        this.props.dispatch(fetchPostsIfNeeded(nextSubreddit));
    }

    handleRefreshClick(e) {
        e.preventDefault();

        const { dispatch, selectedSubreddit } = this.props;
        dispatch(invalidateSubreddit(selectedSubreddit));
        dispatch(fetchPostsIfNeeded(selectedSubreddit));
    }

    render() {
        const { selectedSubreddit, posts, isFetching, lastUpdated } = this.props;
        return (
            <di>
                <Picker options={['reactjs', 'frontend']} value={selectedSubreddit} onChange={this.handleChange}/>
                <p>
                    {lastUpdated && <span>Last update at {new Date(lastUpdated).toLocaleTimeString()}</span>}
                    {!isFetching && <button onClick={this.handleRefreshClick}>Refresh</button>}
                </p>
                {isFetching && posts.length === 0 && <h2>Loading...</h2>}
                {!isFetching && posts.length === 0 && <h2>Empty.</h2>}
                {posts.length > 0 && <div style={{opacity: isFetching ? 0.5 : 1}}><Posts posts={posts}/></div>}
            </di>
        );
    }
}

AsyncApp.propTypes = {
  selectedSubreddit: PropTypes.string.isRequired,
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
    const { selectedSubreddit, postsBySubreddit } = state;
    const {
        isFetching, lastUpdated, items: posts
    } = postsBySubreddit[selectedSubreddit] || {
        isFetching: true,
        items: []
    };

    return {
        selectedSubreddit,
        posts,
        isFetching,
        lastUpdated
    }
}

export default connect(mapStateToProps)(AsyncApp);