import React from 'react'

const Auth = () => {
  return (
      <div>
          <div className="registration">
                <h1>Registration</h1>
                <form>
                    <label>
                        Email:
                        <input type="text" name="username" />
                    </label>
                    <label>
                        Password:
                        <input type="password" name="password" />
                    </label>
                    <input type="submit" value="Register" />
                </form>
          </div>
    </div>
  )
}

export default Auth