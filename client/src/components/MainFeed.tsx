import React from 'react';
import { Post } from './Homepage';



interface MainFeedProps {
  posts: Post[];
}



const MainFeed: React.FC<MainFeedProps> = ({ posts }) => {
  return (
    <div className="main-feed">
      {posts.map((post) => (
        <div className="post" key={post.id}>
          <div className="user-info">
            <img src={post.profilePicture} alt="Profile" className="profile-picture" />
            <p className="username">{post.username}</p>
          </div>
          <div className="post-content">
            {post.type === 'text' ? (
              <p>{post.content}</p>
            ) : (
              <img src={post.image} alt="Post" className="post-image" />
            )}
          </div>
          <div className="like-section">
            <button className="like-button">{post.likes} Likes</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MainFeed;
