import React, { useEffect, useState } from 'react';

export default function Success() {
    const [message, setMessage] = useState("your JSON web token is being verified...");
    const [isError, setIsError] = useState(true);
    const token = localStorage.getItem("token");
    
    useEffect(() => {
        async function verify(){
            await fetch("http://localhost:3001/verify", {
                headers: { 'x-access-token': localStorage.getItem("token") },
                method: "POST"
            })
            .then(response => response.json())
            .then((jsonData) => {
                if (jsonData.status === "ok") {
                    // json web token was successfully verified
                    setIsError(false);
                    setMessage(jsonData.message);
                } else {
                    // json web token was not verified
                    setIsError(true);
                    setMessage(jsonData.message);
                    if (token == null){
                        setMessage("please login before accessing this page");
                        setIsError(true);
                    }
                }
            });
        }
        verify();
    }, []);

    return (
        <div>
            <h3 style={{ color: isError ? "red" : "green" }}>{message}</h3>
        </div>
    )
}
