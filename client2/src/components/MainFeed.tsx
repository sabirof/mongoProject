import React from 'react';
import './Homepage.css'

interface Post {
  id: string;
  profilePicture: string;
  username: string;
  type: string;
  content?: string;
  image?: string;
  likes: number;
}

interface MainFeedProps {
  posts: Post[];
  handleDelete: (postId: string) => void;
}

const MainFeed: React.FC<MainFeedProps> = ({ posts, handleDelete }) => {
  // Step 1: Output the `posts` array
  console.log(posts);

  // Step 2: Collect `id` values into a separate array
  const ids = posts.map(post => post.id);

  // Step 3: Create a new array with unique `id` values
  const uniqueIds = Array.from(new Set(ids));

  // Step 4: Compare the lengths
  if (ids.length === uniqueIds.length) {
    console.log('All `id` values are unique.');
  } else {
    console.log('Duplicate `id` values found.');
  }

  return (
    <div className="main-feed">
      {posts.map(post => (
        <div className="post" key={post.id}>
          <div className="user-info">
            <img src={post.profilePicture} alt="Profile" className="profile-picture" />
            <p className="username">{post.username}</p>
          </div>
          <div className="post-content">
            {post.type === 'text' ? <p>{post.content}</p> : <img src={post.image} alt="Post" className="post-image" />}
          </div>
          <div className="like-section">
            <button className="like-button">{post.likes} Likes</button>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainFeed;
