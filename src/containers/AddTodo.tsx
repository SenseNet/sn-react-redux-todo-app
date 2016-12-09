import * as React from 'react'
import { connect } from 'react-redux'
import { TextField } from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import { Actions } from 'sn-redux';
import { Content } from 'sn-client-js';

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }
        const content = Content.Create('Task', {
          Type: 'Task',
          DisplayName: input.value
        });
        content['Status'] = 'active';
        const url = '/workspaces/Project/budapestprojectworkspace/Tasks';
        dispatch(Actions.CreateContent(url, content))
        input.value = ''
      } }>
        <input className='textField' ref={node => {
          input = node
        } } />
        <RaisedButton type='submit' primary={true} label='Add Todo' />
      </form>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo