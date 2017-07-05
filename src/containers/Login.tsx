import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'react-materialize';
import { Actions } from 'sn-redux';
import { Content } from 'sn-client-js';

const styles = {
  button: {
    marginTop: '20px'
  }
};

let Login = ({ dispatch, handler, props }) => {
  let name, password;
  return (
    <div>
      <form onSubmit={e => {
        e.preventDefault()
        dispatch(Actions.UserLogin(name.state.value, password.state.value))
        handler(e)
      }}>
        <Input type='text' id='name' label='username' className='textField' ref={node => {
          name = node
        }} />
        <Input type='password' id='password' label='password' className='textField' ref={node => {
          password = node
        }} />
        <Button style={styles.button} waves='light'>Login</Button>
      </form>
    </div>
  )
}

Login = connect()(Login)

export default Login