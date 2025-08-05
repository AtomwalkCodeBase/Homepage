import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import { db } from '../Blogs/firebase';

export const useBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    const unsubscribe = onSnapshot(
      collection(db, 'blogs'),
      (snapshot) => {
        const blogsData = snapshot.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            title: data.title || 'Untitled',
            coverImage: data.coverImage || 'https://via.placeholder.com/350x200',
            category: data.category || 'Uncategorized',
            author: data.author || 'Atomwalk Team',
            date: data.date || null, // String date (YYYY-MM-DD)
            tagline: data.tagline || '',
          };
        });
        // Sort by date (newest first), handling null dates
        const sortedBlogs = blogsData.sort((a, b) => {
          const dateA = a.date ? new Date(a.date).getTime() : 0;
          const dateB = b.date ? new Date(b.date).getTime() : 0;
          return dateB - dateA;
        });
        setBlogs(sortedBlogs);
        setLoading(false);
      },
      (err) => {
        console.error('Error fetching blogs:', err);
        setError(err.message || 'Failed to fetch blogs');
        setLoading(false);
      }
    );

    return () => unsubscribe();
  }, []);

  return { blogs, loading, error };
};