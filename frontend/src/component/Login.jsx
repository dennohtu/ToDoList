import React from 'react'

const Login = () => {
    return (
      <div>
        <div className="registration">
          <h1>Login</h1>
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
    );
}

export default Login