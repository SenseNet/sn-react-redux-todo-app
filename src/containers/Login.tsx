import { reactControlMapper } from '@sensenet/controls-react/dist/ReactControlMapper'
import { Actions } from '@sensenet/redux'
import Button from 'material-ui/Button'
import * as React from 'react'
import { connect } from 'react-redux'

const styles = {
  button: {
    marginTop: '20px',
  },
  container: {
    maxWidth: 500,
    margin: '0 auto',
    textAlign: 'center',
  },
}

const login = ({ dispatch, props }) => {
  const user = reactControlMapper.getFullSchemaForContentType('User', 'new')
  user.fieldMappings = user.fieldMappings
    .filter((fieldSettings) => fieldSettings.fieldSettings.Name === 'LoginName' || fieldSettings.fieldSettings.Name === 'Password')
  return (
    <div style={styles.container}>
      <form onSubmit={(e) => {
        e.preventDefault()
        // tslint:disable-next-line:no-string-literal
        const name = document.getElementsByClassName('LoginName')['LoginName'].value
        // tslint:disable-next-line:no-string-literal
        const password = document.getElementsByClassName('Password')['Password'].value
        dispatch(Actions.userLogin(name, password))
      }}>

        {
          user.fieldMappings.map((e, i) => {
            return (
              React.createElement(
                user.fieldMappings[i].controlType,
                {
                  ...user.fieldMappings[i].clientSettings,
                  'data-actionName': 'new',
                  'data-fieldValue': '',
                  'className': user.fieldMappings[i].clientSettings.key,
                })
            )
          })
        }
        <Button style={styles.button} variant="raised">Login</Button>
      </form>
    </div>
  )
}

const loginView = connect()(login)

export default loginView
