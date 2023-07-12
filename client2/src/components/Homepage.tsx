import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import MainFeed from './MainFeed';
import checkUserStatus from '../utils/checkUserStatus';
import './Homepage.css'

interface Post {
  id: string;
  profilePicture?: string;
  username: string;
  type?: string;
  content: string;
  image?: string;
  likes?: number;
}

const Homepage: React.FC = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newPost, setNewPost] = useState<Post>({
    id: '',
    profilePicture: '',
    username: '',
    type: '',
    content: '',
    likes: 0
  });

  useEffect(() => {
    fetch('http://localhost:5000/api/posts/getall')
      .then(response => response.json())
      .then((response: Post[]) => setPosts(response))
      .catch(error => {
        console.log('Error', error);
      });
  }, []);

  const handlePostSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // get token
    const token = checkUserStatus();
    console.log('token', token);
    if (token) {
      const data = JSON.stringify(newPost);
      console.log('JSON.stringify(newPost) ', JSON.stringify(newPost));
      fetch('http://localhost:5000/api/posts/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: data
      })
        .then(res => res.json())
        .then(res => console.log('res', res))
        .catch(error => {
          console.log('Error creating post', error);
        });
    } else {
      console.log('you need to log in');
    }
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleDelete = async (postId: string) => {
    try {
      await fetch(`http://localhost:5000/api/posts/delete/${postId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
        //  body: JSON.stringify(postId)
       
      });

      // Remove the deleted post from the posts array
      const updatedPosts = posts.filter(post => post.id !== postId);
      setPosts(updatedPosts);
    } catch (error) {
      console.log('Error deleting post', error);
    }
  };

  return (
    <div className="homepage">
      <h1>Welcome to Görüschack</h1>
      {/* Display the main feed */}
      {console.log('posts', posts)}
      <MainFeed posts={posts} handleDelete={handleDelete} />

      {/* Create a new post */}
      <div className="new-post">
        <h2>Create a New Post</h2>
        <form onSubmit={handlePostSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={newPost.username}
              onChange={handleInputChange}
              required
            />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea
              id="content"
              name="content"
              value={newPost.content}
              onChange={handleInputChange}
              required
            ></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Homepage;
