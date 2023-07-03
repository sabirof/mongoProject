import React, { ChangeEvent, FormEvent, useState } from "react";

type Props = {};



const Register = (props: Props) => {
  const [selectedFile, setSelectedFile] = useState<File | string>("");
  const [newUser, setNewUser] = useState<RegisterCredentials>({
    userName: "",
    email: "",
    password: "",
    avatar: "",
  });

  const handleAttachFile = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setSelectedFile(file || "");
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewUser({ ...newUser, [e.target.name]: e.target.value });
  };

  const submitPicture = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (selectedFile instanceof File) {
      const formdata = new FormData();
      formdata.append("image", selectedFile);

      try {
        const response = await fetch(
          "http://localhost:5173/api/users/imageUpload",
          {
            method: "POST",
            body: formdata,
          }
        );

        if (response.ok) {
          const result = await response.json();
          setNewUser({ ...newUser, avatar: result.avatar });
        }
      } catch (error) {
        console.log("Error uploading picture:", error);
      }
    }
  };

  const register = async () => {
    console.log('Register button clicked');
    try {
      const response = await fetch(
        "http://localhost:5173/api/users/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newUser),
        }
      );

      if (response.ok) {
        const result = await response.json();
        console.log("Registration successful:", result);
      } else {
        console.log("Registration failed");
      }
    } catch (error) {
      console.log("Error registering user:", error);
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <div>
        <div className="input-container">
          <input
            type="text"
            name="userName"
            id="userName"
            onChange={handleInputChange}
          />
          <label htmlFor="userName">User Name</label>
          <input
            type="email"
            name="email"
            id="email"
            onChange={handleInputChange}
          />
          <label htmlFor="email">Email</label>
          <input
            type="password"
            name="password"
            id="password"
            onChange={handleInputChange}
          />
          <label htmlFor="password">Password</label>
        </div>
        <form onSubmit={submitPicture}>
          <input
            type="file"
            name="file"
            id="file"
            onChange={handleAttachFile}
          />
          <button type="button" onClick={register}>Register</button>
          <button type="submit">Upload Picture</button>
        </form>
        
      </div>
      <div>User Info</div>
      {newUser.avatar && (
        <div>
          <img src={newUser.avatar} alt="avatar" className="avatar-picture" />
        </div>
      )}
    </div>
  );
};

export default Register;
