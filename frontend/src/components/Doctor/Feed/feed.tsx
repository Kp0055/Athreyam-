import React, { useEffect, useState } from "react";
import Post from "../Post/post";

interface Comment {
  _id: string;
  author: string;
  content: string;
  createdAt: string;
}

interface PostType {
  _id: string;
  docName: string;
  content: string;
  image?: string;
  doctorId: string;
  createdAt: string;
  likes: string[];
  comments?: Comment[]; // added comments array
}

function Feed() {
  const [posts, setPosts] = useState<PostType[]>([]);

  const handleFetchPost = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/doctor/post", {
        method: "GET",
        credentials: "include",
      });
      if (!response.ok) throw new Error("Failed to fetch posts");
      const resData = await response.json();
      console.log("POSTS:", resData);
      setPosts(resData);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    handleFetchPost();
  }, []);

  const handleLike = (postId: string) => {
    // Placeholder for like functionality
    console.log("Like clicked on post:", postId);
  };

  return (
    <div className="bg-blue-200 min-h-screen p-6">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Post Input Section */}
        <Post />

        {/* Post Cards */}
        {posts.length === 0 ? (
          <p className="text-center text-gray-600">No posts to display.</p>
        ) : (
          posts.map((post) => (
            <div
              key={post._id}
              className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-200"
            >
              {/* Header */}
              <div className="flex justify-between items-start mb-6">
                <div className="flex items-center">
                  <img
                    src="https://imgs.search.brave.com/nwTrFcQh2znPv4BND6D6uQlSOzm1kLizS9qx6AEmuBo/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMjA3/NjU5Ni9wZXhlbHMt/cGhvdG8tMjA3NjU5/Ni5qcGVnP2F1dG89/Y29tcHJlc3MmY3M9/dGlueXNyZ2ImZHBy/PTEmdz01MDA"
                    alt="User profile"
                    className="h-14 w-14 rounded-full mr-5 object-cover border-2 border-blue-500"
                  />
                  <div>
                    <strong className="block text-gray-900 text-xl font-semibold">
                      {post.docName}
                    </strong>
                    <div className="text-xs text-gray-400 mt-1">
                      Posted on {new Date(post.createdAt).toLocaleDateString()}
                    </div>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-gray-700 text-2xl font-bold cursor-pointer">
                  &#x22EE;
                </button>
              </div>

              {/* Post Content */}
              <article>
                {post.image && (
                  <img
                    src={`http://localhost:5000/uploads/${post.image}`}
                    alt="Post content"
                    className="w-full max-h-96 rounded-lg mb-6 object-cover shadow"
                  />
                )}
                <h3 className="text-2xl mb-3 text-gray-900 font-semibold">
                  Content Details
                </h3>
                <p className="mb-6 text-gray-700 leading-relaxed">{post.content}</p>

                {/* Like Button */}
                <button
                  onClick={() => handleLike(post._id)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-5 py-2 rounded-md transition-colors duration-200 mb-6"
                >
                  Like {post.likes?.length || 0}
                </button>

                {/* Display Comments */}
                {post.comments && post.comments.length > 0 ? (
                  <div className="border-t pt-4">
                    <h4 className="text-lg font-semibold mb-3 text-gray-800">Comments</h4>
                    <ul className="space-y-3 max-h-48 overflow-y-auto">
                      {post.comments.map((comment) => (
                        <li key={comment._id} className="bg-gray-50 p-3 rounded shadow-sm">
                          <p className="text-sm text-gray-700">{comment.content}</p>
                          <div className="mt-1 text-xs text-gray-400 flex justify-between">
                            <span>— {comment.author}</span>
                            <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-500 italic">No comments yet.</p>
                )}
              </article>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Feed;
