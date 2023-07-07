import React, { useEffect, useState } from 'react';

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
    fetch('/api/posts')
      .then(response => response.json())
      .then(data => {
        setPosts(data);
      })
      .catch(error => {
        console.log('Error fetching posts', error);
      });
  }, []);

  const handlePostSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Here you can make a fetch request to the backend to create a new post
    // Use the data from the newPost state to send the post details to the server
    // After successful creation, you can update the posts state with the newly created post
    console.log('New post:', newPost);
    // Reset the form after submission
    setNewPost({
      id: '',
      profilePicture: '',
      username: '',
      type: '',
      content: '',
      likes: 0
    });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setNewPost(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  return (
    <div>
      <h1>Welcome to Görüschack</h1>
      <p>
        Welcome to our website! We are committed to creating a safe space for all individuals, regardless of their gender, identity, or nationality. Our primary goal is to connect people, assist them in finding like-minded individuals, and provide support with bureaucratic matters. We strongly believe in fostering an environment free from hate and discrimination. Please note that while we encourage open dialogue, political discussions are not allowed on this platform. Together, let's build a community that promotes understanding, inclusivity, and respect for one another.
      </p>
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
      <div>
        {posts.map(post => (
          <div key={post.id}>
            <h3>{post.username}</h3>
            <p>{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
