import React, { useState } from 'react'

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isFetching, setIsFetching] = useState(false);
    const [responseMessage, setResponseMessage] = useState("");
    const [isError, setIsError] = useState(true);

    async function submitLoginForm(event) {
        event.preventDefault();
        setIsFetching(true);
        await fetch("http://localhost:3001/login", {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify({
                email, password
            })
        })
            .then(response => response.json())
            .then(jsondata => {
                console.log(jsondata);
                if (jsondata.token) {
                    // add json web token to local storage
                    localStorage.setItem("token", jsondata.token);
                    setIsFetching(false);
                    // json web token exists, so login is successful
                    setIsError(false);
                    setResponseMessage(jsondata.message);
                    // successful login redirects to success page
                    setTimeout(() => {
                        window.location.replace("/success");
                    }, 1500);
                } else {
                    setIsFetching(false);
                    // json web token does not exist, so login is unsuccessful
                    // delete pre-existing json web token, if exists
                    localStorage.removeItem("token");
                    setIsError(true);
                    setResponseMessage(jsondata.message);
                }
            });
    }

    return (
        <div>
            <h1>Login</h1>
            <hr />
            <form onSubmit={submitLoginForm}>
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
                    {isFetching ? <p>Logging you in...</p> : <p>Login</p>}
                </button>
                <p style={{ color: isError ? "red" : "green" }}>{responseMessage}</p>
            </form>
        </div>
    )
}