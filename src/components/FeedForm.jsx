// import React, { useState } from 'react';
// import axios from 'axios';
// import { FaPaperclip } from "react-icons/fa6";

// const FeedForm = ({ user, posts, setPosts }) => {
//   const [body, setBody] = useState('');
//   const [url, setUrl] = useState(null);
//   const [file, setFile] = useState(null);
//   const [isPrivate, setIsPrivate] = useState(false);

//   const onFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setFile(selectedFile);

//     const reader = new FileReader();
//     reader.onloadend = () => setUrl(reader.result);
//     if (selectedFile) reader.readAsDataURL(selectedFile);
//   };

//   const submitForm = (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     formData.append('image', file);
//     formData.append('body', body);
//     formData.append('is_private', isPrivate);

//     axios
//       .post('/api/posts/create/', formData, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       })
//       .then((response) => {
//         setPosts([response.data, ...posts]);
//         setBody('');
//         setIsPrivate(false);
//         setFile(null);
//         setUrl(null);
//         if (user) user.posts_count += 1;
//       })
//       .catch((error) => {
//         console.error('Error:', error);
//       });
//   };

//   return (
//     <form onSubmit={submitForm}>
//       <div className="p-4 ">
//         {/* <textarea
//           value={body}
//           onChange={(e) => setBody(e.target.value)}
//           className="p-4 w-full bg-gray-100 rounded-lg outline-none"
//           placeholder="What are you thinking about?"
//         /> */}

//         {url && <div id="preview"><img src={url} className="w-[100px] mt-3 rounded-xl" alt="preview" /></div>}
//       </div>

//       <div className="p-4 border-t border-gray-100 flex justify-between">
//         <label className="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg cursor-pointer flex items-center">
//           <input
//             type="file"
//             onChange={onFileChange}
//             className="hidden"
//           />
//           <FaPaperclip /> <span className='pl-2'>Upload</span>
//         </label>
//         <button type="submit" className="inline-block py-4 px-6 bg-theme text-white rounded-lg bg-theme">
//           Post
//         </button>
//       </div>
//     </form>
//   );
// };

// export default FeedForm;



import React, { useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import { FaPaperclip } from "react-icons/fa6";

const FeedForm = ({ user, posts, setPosts }) => {
  const [body, setBody] = useState(""); // Stores formatted text (HTML)
  const [url, setUrl] = useState(null); // For image preview
  const [file, setFile] = useState(null); // For uploaded files
  const [isPrivate, setIsPrivate] = useState(false); // Privacy toggle

  const onFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onloadend = () => setUrl(reader.result);
    if (selectedFile) reader.readAsDataURL(selectedFile);
  };

  const submitForm = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", file);
    formData.append("body", body); // Formatted text (HTML)
    formData.append("is_private", isPrivate);

    axios
      .post("/api/posts/create/", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        setPosts([response.data, ...posts]); // Add new post to feed
        setBody(""); // Reset text editor
        setIsPrivate(false);
        setFile(null);
        setUrl(null);
        if (user) user.posts_count += 1; // Increment user post count
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  return (
    <form onSubmit={submitForm}>
      {/* Rich Text Editor */}
      <div className="p-4">
        <ReactQuill
          value={body}
          onChange={setBody}
          placeholder="What are you thinking about?"
          theme="snow"
        />
        {url && (
          <div id="preview">
            <img
              src={url}
              className="w-[100px] mt-3 rounded-xl"
              alt="preview"
            />
          </div>
        )}
      </div>

      {/* File Upload & Submit Button */}
      <div className="p-4 border-t border-gray-100 flex justify-between">
        <label className="inline-block py-4 px-6 bg-gray-600 text-white rounded-lg cursor-pointer flex items-center">
          <input
            type="file"
            onChange={onFileChange}
            className="hidden" // Hides the default input
          />
          <FaPaperclip /> <span className="pl-2">Upload</span>
        </label>
        <button
          type="submit"
          className="inline-block py-4 px-6 bg-theme text-white rounded-lg"
        >
          Post
        </button>
      </div>
    </form>
  );
};

export default FeedForm;
