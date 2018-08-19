import React from 'react'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibileTodoList'
import Footer from './Footer'

const App = ({ match: { params }}) => (
    <div>
        <AddTodo />
        <VisibleTodoList filter={params.filter || 'SHOW_ALL'} />
        <Footer />
    </div>
);

export default App;