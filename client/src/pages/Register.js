import React, { useState } from 'react'

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function submitRegisterForm(event) {
        event.preventDefault();
        const response = await fetch("http://localhost:3001/register", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username, email, password
            })
        });
        const data = await response;
        console.log(data);
    }

    return (
        <div>
            <h1>Register</h1>
            <hr />
            <form onSubmit={submitRegisterForm}>
                <input
                    value={username}
                    onChange={(event) => { setUsername(event.target.value) }}
                    type="text"
                    placeholder="Username"
                />
                <br />
                <input
                    value={email}
                    onChange={(event) => { setEmail(event.target.value) }}
                    type="email"
                    placeholder="Email address"
                />
                <br />
                <input
                    value={password}
                    onChange={(event) => { setPassword(event.target.value) }}
                    type="password"
                    placeholder="Password"
                />
                <br />
                <button type="submit">Submit</button>
            </form>
        </div>
    )
}
