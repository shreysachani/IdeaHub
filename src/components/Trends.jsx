import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Trends = () => {
  const [trends, setTrends] = useState([]);

  useEffect(() => {
    axios
      .get("/api/posts/trends/")
      .then((response) => setTrends(response.data))
      .catch((error) => console.error("Error:", error));
  }, []);

  return (
    <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-lg fixed min-w-72">
      <h3 className="mb-4 text-lg font-bold">Trends</h3>
      <ul className="space-y-4">
        {trends.map((trend) => (
          <li
            key={trend.id}
            className="flex items-center justify-between text-sm"
          >
            <div>
              <span className="font-medium text-gray-800">
                #{trend.hashtag}
              </span>
              <p className="text-gray-500">{trend.occurences} posts</p>
            </div>
            <Link
              to={`/trends/${trend.hashtag}`}
              className="px-4 py-2 text-white bg-theme rounded-lg hover:bg-theme"
            >
              Explore
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Trends;
