import React from 'react';
import MainFeed from './MainFeed';
export interface Post {
  id: string;
  profilePicture: string;
  username: string;
  type: string;
  content?: string;
  image?: string;
  likes: number;
}
const Homepage = () => {
  const posts:Post[] = [
    {
      id: "w",
      username: 'JohnDoe',
      profilePicture: 'profile1.jpg',
      type: 'text',
      content: 'This is a text post',
      likes:3
    },
    {
      id: "x",
      username: 'JaneSmith',
      profilePicture: 'profile2.jpg',
      type: 'image',
      image: 'image1.jpg',
      likes:4
    },
  ];

  return (
    <div>
      <h1>Welcome to Görüschack</h1>
      <p>
        Welcome to our website! We are committed to creating a safe space for all individuals,
        regardless of their gender, identity, or nationality. Our primary goal is to connect
        people, assist them in finding like-minded individuals, and provide support with bureaucratic
        matters. We strongly believe in fostering an environment free from hate and discrimination.
        Please note that while we encourage open dialogue, political discussions are not allowed on
        this platform. Together, let's build a community that promotes understanding, inclusivity,
        and respect for one another.
      </p>
      <MainFeed posts={posts} />
    </div>
  );
};

export default Homepage;
