import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
// import { URLSearchParams } from "url";

type Props = {};

const Login = (props: Props) => {
  const [loginCredentials, setloginCredentials] = useState<loginCredentials>({
    email: "",
    password: "",
  });
  //This should belong to the context
  const [user, setUser] = useState<User | null>({
    userName: "",
    email: "",
    avatar: "",
  });
  const [error, setError] = useState<ResponseError>(null);
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
        requestOptions
      );

      console.log("response", response);

      if (response.ok) {
        const result: FetchLoginResult = await response.json();
        const { token, user, msg } = result;
        //store token
        if (token) {
          localStorage.setItem("token", token);
          setUser(result.user);
        }

        console.log("result", result);
      }
      if (response.status === 404) {
        const result:FetchError = await response.json();
        setError(result.error);
      }
    } catch (error) {
      console.log("error during login", error);
    }

    // console.log("loginCredentials", loginCredentials);
  };

  const checkUserStatus = () => {
    const token = localStorage.getItem("token");
    if (token) {
      console.log("%cuser is logged in", "color:green");
    } else {
      console.log("%cuser is logged out", "color:red");
    }
  };
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  useEffect(() => {
    checkUserStatus();
  }, [user]);
  return (
    <div>
      {" "}
      <h1>Login</h1>
      {error && <h2>{error}</h2>}
      <button style={{ backgroundColor: "red" }} onClick={logout}>
        Logout
      </button>
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
