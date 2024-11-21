import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Trends = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    axios.get('/api/posts/trends/')
      .then(response => setTrends(response.data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <div>
      <h2>Trending Hashtags</h2>
      <ul>
        {trends.map((trend) => (
          <li key={trend.id}>
            <Link to={`/trendview/${trend.id}`}>
              #{trend.hashtag} ({trend.posts_count} posts)
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trends;
