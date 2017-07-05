import * as React from 'react'
import { connect } from 'react-redux'
import { Button, Input, Icon } from 'react-materialize';
import { Actions } from 'sn-redux';
import { Content, ContentTypes, Enums } from 'sn-client-js';

let AddTodo = ({ dispatch }) => {
  let input

  return (
    <div>
      {/*<form onSubmit={e => {
        e.preventDefault()
        if (!input.value.trim()) {
          return
        }

        const url = '/Root/Sites/Default_Site/tasks';
        dispatch(Actions.CreateContent(url, ContentTypes.Task, {
          Name: input.value as string,
          DisplayName: input.value as string,
          DueDate: null,
          Status: 'active'
        } as any))
        input.value = ''
      }}>
        <Input className='textField' ref={node => {
          input = node
        }} />
        <Button type='submit'>Add Todo</Button>
      </form>*/}
      <Button floating fab='vertical' icon='add' className='red' large style={{ bottom: '45px', right: '24px' }}>
      </Button>
    </div>
  )
}
AddTodo = connect()(AddTodo)

export default AddTodo