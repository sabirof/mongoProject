import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import MainFeed from './MainFeed';

interface Post {
  id: string;
  profilePicture: string;
  username: string;
  type: string;
  content?: string;
  image?: string;
  likes: number;
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
    fetch('/api/posts/new')
      .then(response => response.json())
      .then((data: Post[]) => {
        setPosts(data);
      })
      .catch(error => {
        console.log('Error', error);
      });
  }, []);

  const handlePostSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    fetch('/api/posts/create', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newPost)
    })
      .then(response => response.json())
      .then(_ => {
        setNewPost({
          id: '',
          profilePicture: '',
          username: '',
          type: '',
          content: '',
          likes: 0
        });
      })
      .catch(error => {
        console.log('Error creating post', error);
      });
  };

  const handleInputChange = (event: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Welcome to Görüschack</h1>
      {/* Display the main feed */}
      <MainFeed posts={posts} />

      {/* Create a new post */}
      <div>
        <h2>Create a New Post</h2>
        <form onSubmit={handlePostSubmit}>
          <div>
            <label htmlFor="username">Username</label>
            <input type="text" id="username" name="username" value={newPost.username} onChange={handleInputChange} required />
          </div>
          <div>
            <label htmlFor="content">Content</label>
            <textarea id="content" name="content" value={newPost.content} onChange={handleInputChange} required></textarea>
          </div>
          <button type="submit">Submit</button>
        </form>
      </div>
    </div>
  );
};

export default Homepage;
