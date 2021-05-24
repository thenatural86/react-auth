import { useState } from 'react'

import classes from './AuthForm.module.css'

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true)
  const [emailInput, setEmailInput] = useState('')
  const [passwordInput, setPasswordInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState)
  }

  const submitFormHandler = (e) => {
    e.preventDefault()

    const enteredEmail = emailInput
    const enteredPassword = passwordInput

    setIsLoading(true)
    if (isLogin) {
    } else {
      fetch(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBR1IcrFFLsrP3RqI2WqCRnwFkRdsQzSiY',
        {
          method: 'POST',
          body: JSON.stringify({
            email: enteredEmail,
            password: enteredPassword,
            returnSecureToken: true,
          }),
          headers: {
            'Content-Type': 'application/json',
          },
        }
      ).then((res) => {
        setIsLoading(false)
        if (res.ok) {
          // ...
        } else {
          return res.json().then((data) => {
            // show an error modal
            let errorMessage = 'Authentication failed!'
            if (data && data.error && data.error.message) {
              errorMessage = data.error.message
            }
            alert(errorMessage)
          })
        }
      })
    }
  }

  const emailChangeHandler = (e) => {
    setEmailInput(e.target.value)
  }

  const passwordChangeHandler = (e) => {
    setPasswordInput(e.target.value)
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submitFormHandler}>
        <div className={classes.control}>
          <label htmlFor='email'>Your Email</label>
          <input
            type='email'
            id='email'
            required
            value={emailInput}
            onChange={emailChangeHandler}
          />
        </div>
        <div className={classes.control}>
          <label htmlFor='password'>Your Password</label>
          <input
            type='password'
            id='password'
            required
            value={passwordInput}
            onChange={passwordChangeHandler}
          />
        </div>
        <div className={classes.actions}>
          {!isLoading && (
            <button>{isLogin ? 'Login' : 'Create Account'}</button>
          )}
          {isLoading && <p>Sending request...</p>}
          <button
            type='button'
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm
