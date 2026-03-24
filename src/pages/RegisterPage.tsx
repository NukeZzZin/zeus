import React, { useState } from "react"

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (event: React.SubmitEvent) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Username" value={username} onChange={(event) => setUsername(event.target.value)} />
        <input type="text" placeholder="Display Name" value={displayName} onChange={(event) => setDisplayName(event.target.value)} />
        <input type="text" placeholder="Email" value={email} onChange={(event) => setEmail(event.target.value)} />
        <input type="text" placeholder="Password" value={password} onChange={(event) => setPassword(event.target.value)} />
        <button type="submit">Register</button>
      </form>
    </React.Fragment>
  )
}

export default LoginPage
