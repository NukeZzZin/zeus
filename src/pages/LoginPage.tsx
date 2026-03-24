import React, { useState } from "react"

const LoginPage = () => {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username or Email" value={identifier} onChange={(event) => setIdentifier(event.target.value)} />
        <input type="text" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button type="submit">Login</button>
      </form>
    </React.Fragment>
  )
}

export default LoginPage
