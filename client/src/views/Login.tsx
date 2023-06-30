import React, { ChangeEvent, FormEvent, useState } from "react";
// import { URLSearchParams } from "url";

type Props = {};
interface loginCredentials {
  email: string;
  password: string;
}

const Login = (props: Props) => {
  const [loginCredentials, setloginCredentials] = useState<loginCredentials>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setloginCredentials({
      ...loginCredentials,
      [e.target.name]: e.target.value,
    });
    // setloginCredentials([e.target.name])
  };

  const submitLogin = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const myHeader = new Headers();
    myHeader.append("Content-Type", "application/x-www-form-urlencoded");

    const urlencoded = new URLSearchParams();
    urlencoded.append("email", loginCredentials.email);
    urlencoded.append("password", loginCredentials.password);

    const requestOptions = {
      method: "POST",
      headers: myHeader,
      body: urlencoded,
      
    };
    try {
      const response = await fetch(
        "http://localhost:5173/api/users/login",
        requestOptions);

console.log("response", response)
        
        if(response.ok) {
const result = await response.json();

console.log('result', result);
        }
    } catch (error) {
        console.log('error during login', error);
    }

    console.log("loginCredentials", loginCredentials);
  };
  return (
    <div>
      {" "}
      <h1>Login</h1>
      <div>
        <form onSubmit={submitLogin}>
          <input
            type="email"
            name="email"
            id="login-email"
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="password"
            name="password"
            id="login-password"
            onChange={handleInputChange}
          />
          <label htmlFor="password">Password</label>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};
export default Login;
