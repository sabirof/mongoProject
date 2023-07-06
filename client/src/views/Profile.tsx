import React, { useState } from "react";
import checkUserStatus from "../utils/checkUserStatus";

type Props = {};

interface User {
  userName: string;
  email: string;
  avatar: string;
}

const Profile = (props: Props) => {
  const [userProfile, setuserProfile] = useState<User>({
    userName: "",
    email: "",
    avatar: "",
  });

  const [error, setError] = useState<ResponseError | null>(null);

  const getProfile = async () => {
    const token = checkUserStatus();

    if (token) {
      const myHeaders = new Headers();
      myHeaders.append("Authorization", `Bearer ${token}`);

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
      };

      try {
        const response = await fetch(
          "http://localhost:5173/api/users/profile",
          requestOptions
        );

        if (response.ok) {
          const result: FetchProfileResult = await response.json();
          setuserProfile(result.user);
          setError(null);
        } else if (!response.ok && response.status === 401) {
          setError(response.statusText);
        } else {
          const result: FetchError = await response.json();
          setError(result.error);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      setError("please login first");
      setuserProfile({ userName: "", email: "", avatar: "" });
    }
  };

  return (
    <div>
      <h1>User Profile</h1>
      {error && <h3>{error}</h3>}
      <button style={{ backgroundColor: "blue" }} onClick={getProfile}>
        See Profile
      </button>

      {userProfile && (
        <div>
          <p>{userProfile.userName}</p>
          <p>{userProfile.email}</p>
          <img src={userProfile.avatar} alt="" style={{ width: "200px" }} />
        </div>
      )}
    </div>
  );
};

export default Profile;
