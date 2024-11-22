import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const PeopleYouMayKnow = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const response = await axios.get('/api/friends/suggested/');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching friend suggestions:', error);
      }
    };

    fetchSuggestions();
  }, []);

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg">
      <h3 className="text-xl">People you may know</h3>

      <div className="space-y-4">
        {users.map((user) => (
          <div
            key={user.id}
            className="flex items-center justify-between"
          >
            <div className="flex items-center space-x-2">
              <img
                src={user.get_avatar}
                alt="User Avatar"
                className="w-[40px] rounded-full"
              />
              <p className="text-xs">
                <strong>{user.name}</strong>
              </p>
            </div>
            <Link
              to={`/profile/${user.id}`}
              className="py-2 px-3 bg-theme text-white text-xs rounded-lg"
            >
              Show
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PeopleYouMayKnow;
