import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import { reactControlMapper } from '@sensenet/controls-react/dist/ReactControlMapper'
import { Actions } from '@sensenet/redux'
import * as React from 'react'
import { connect } from 'react-redux'

const styles = {
  button: {
    marginTop: '20px',
    color: '#fff',
  },
  container: {
    maxWidth: 500,
    margin: '0 auto',
    textAlign: 'center',
  },
  buttonRow: {
    textAlign: 'right',
    width: '100%',
  },
}

const login = ({ dispatch, props }) => {
  const user = reactControlMapper.getFullSchemaForContentType('User', 'new')
  user.fieldMappings = user.fieldMappings
    .filter((fieldSettings) => fieldSettings.fieldSettings.Name === 'LoginName' || fieldSettings.fieldSettings.Name === 'Password')
  return (
    <div style={styles.container as any}>
      <form onSubmit={(e) => {
        e.preventDefault()
        // tslint:disable-next-line:no-string-literal
        const name = document.getElementById('LoginName')['value']
        // tslint:disable-next-line:no-string-literal
        const password = document.getElementById('Password')['value']
        dispatch(Actions.userLogin(name, password))
      }}>
        <Grid container>
          {
            user.fieldMappings.map((e, i) =>
              <Grid item sm={12} md={12} lg={12} key={i}>
                {React.createElement(
                  user.fieldMappings[i].controlType,
                  {
                    ...user.fieldMappings[i].clientSettings,
                    'data-actionName': 'new',
                    'data-fieldValue': '',
                    'className': user.fieldMappings[i].clientSettings.key,
                  } as any,
                )}
              </Grid>,
            )
          }
          <Grid item style={styles.buttonRow as any}>
            <Button type="submit" style={styles.button} variant="raised" color="primary">Login</Button>
          </Grid>
        </Grid>
      </form>
    </div>
  )
}

const loginView = connect()(login)

export default loginView
