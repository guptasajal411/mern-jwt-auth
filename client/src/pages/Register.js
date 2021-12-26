import React, { useState } from 'react'

export default function Register() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");

    async function submitRegisterForm(event) {
        event.preventDefault();
        setIsFetching(true);
        const response = await fetch("http://localhost:3001/register", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                username, email, password
            })
        })
        .then(response => response.json())
        .then(jsondata => {
            console.log(jsondata.message);
            setIsFetching(false);
            setResponseMessage(jsondata.message);
        });
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
                <button type="submit" disabled={isFetching}>
                    {isFetching ? <p>Submitting...</p> : <p>Submit</p>}
                </button>
                <p>{responseMessage}</p>
            </form>
        </div>
    )
}
