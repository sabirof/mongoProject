// api.js

export async function fetchPosts() {
    try {
      const response = await fetch('/api/posts'); 
      if (!response.ok) {
        throw new Error('Failed to fetch posts.');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log('Error', error);
      throw error;
    }
  }
  