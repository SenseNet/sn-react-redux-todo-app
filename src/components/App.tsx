import * as React from 'react';
import { Footer } from './Footer'
import AddTodo from '../containers/AddTodo'
import VisibleTodoList from '../containers/VisibleTodoList'

const App = () => (
  <div>
    <AddTodo dispatch />
    <VisibleTodoList params />
    <Footer />
  </div>
);

export default App;