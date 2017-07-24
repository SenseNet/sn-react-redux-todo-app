import * as React from 'react';
import { connect } from 'react-redux';
import { Button, Input } from 'react-materialize';
import { Actions } from 'sn-redux';
import { Content, ContentTypes } from 'sn-client-js';
import { ShortText, Password, ReactControlMapper } from 'sn-controls-react';

const styles = {
  button: {
    marginTop: '20px'
  },
  container: {
    width: 500,
    margin: '0 auto',
    textAlign: 'center'
  }
};

let Login = ({ dispatch, handler, props }) => {
  let name, password;
  let user = ReactControlMapper.GetFullSchemaForContentType(ContentTypes.User, 'new');
  user.FieldMappings = user.FieldMappings
    .filter((FieldSettings) => FieldSettings.FieldSettings.Name === 'LoginName' || FieldSettings.FieldSettings.Name === 'Password');
  return (
    <div style={styles.container}>
      <form onSubmit={e => {
        e.preventDefault()
        const name = document.getElementsByClassName('LoginName')['LoginName'].value;
        const password = document.getElementsByClassName('Password')['Password'].value;

        dispatch(Actions.UserLogin(name, password))
        handler(e)
      }}>

        {
          user.FieldMappings.map(function (e, i) {
            return (
              React.createElement(
                user.FieldMappings[i].ControlType,
                {
                  ...user.FieldMappings[i].ClientSettings,
                  'data-actionName': 'new',
                  'data-fieldValue': '',
                  'className': user.FieldMappings[i].ClientSettings.key
                })
            )
          })
        }
        <Button style={styles.button} waves='light'>Login</Button>
      </form>
    </div>
  )
}

const LoginView = connect()(Login)

export default LoginView