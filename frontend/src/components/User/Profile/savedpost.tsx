import React, { useEffect, useState } from "react";

interface SavedPost {
  _id: string;
  title?: string;
  content: string;
  image?: string;
  docName: string;
  createdAt: string;
}

function SavedPosts() {
  const [savedPosts, setSavedPosts] = useState<SavedPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSavedPosts = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/user/saved-posts", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Failed to fetch saved posts");

        const data = await response.json();
        setSavedPosts(data.savedPosts);
      } catch (error) {
        console.error("Error fetching saved posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSavedPosts();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100  p-4 sm:p-8">
      <h1 className="text-3xl font-extrabold text-center text-blue-800 mb-8">
         Saved Posts
      </h1>

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : savedPosts.length === 0 ? (
        <p className="text-center text-gray-500">No saved posts found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {savedPosts.map((post) => (
            <div
              key={post._id}
              className="bg-white border border-blue-200 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden flex flex-col"
            >
              {post.image && (
                <img
                  src={`http://localhost:5000/uploads/${post.image}`}
                  alt="Post"
                  className="w-full h-48 object-cover"
                />
              )}

              <div className="p-5 flex-1 flex flex-col justify-between">
               

                <p className="text-sm text-gray-700 mb-4 line-clamp-4">
                  {post.content || "No content available"}
                </p>

                <div className="mt-auto flex justify-between items-center text-xs text-gray-500 border-t pt-2">
                  <span className="font-medium">
                    🧑‍⚕️ {post.docName || "Doctor"}
                  </span>
                  <span className="bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SavedPosts;
