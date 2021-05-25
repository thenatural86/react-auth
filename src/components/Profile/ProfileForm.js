import classes from './ProfileForm.module.css'
import { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import AuthContext from '../../store/auth-context'

const ProfileForm = () => {
  const [newPasswordInput, setNewPasswordInput] = useState('')
  const history = useHistory()

  const authCtx = useContext(AuthContext)

  const newPasswordHandler = (e) => {
    setNewPasswordInput(e.target.value)
  }

  const submitHandler = (e) => {
    e.preventDefault()
    const enteredNewPassword = newPasswordInput

    // add validation

    fetch(
      'https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyBR1IcrFFLsrP3RqI2WqCRnwFkRdsQzSiY',
      {
        method: 'POST',
        body: JSON.stringify({
          idToken: authCtx.token,
          password: enteredNewPassword,
          returnSecureToken: false,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      }
    ).then((res) => {
      // assumption: always succeeds! yeah right
      history.replace('/')
    })
  }

  return (
    <form className={classes.form} onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='new-password'>New Password</label>
        <input
          type='password'
          id='new-password'
          minLength='7'
          value={newPasswordInput}
          onChange={newPasswordHandler}
        />
      </div>
      <div className={classes.action}>
        <button>Change Password</button>
      </div>
    </form>
  )
}

export default ProfileForm
