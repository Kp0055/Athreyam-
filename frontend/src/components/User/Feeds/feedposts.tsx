import React, { useEffect, useState } from "react";
import Profile from "../../Reusable/profile";

function FeedPosts() {
  const [posts, setPosts] = useState<any[]>([]);
  const [selectedPostId, setSelectedPostId] = useState<string | null>(null);
  const [comments, setComments] = useState<any[]>([]);
  const [newComment, setNewComment] = useState("");
  
  useEffect(() => {
    const fetchAllPost = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/feed", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) throw new Error("Fetching failed");

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchAllPost();
  }, []);

  const handleLike = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${postId}/like`, {
        method: "PUT",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to like post");

      const updatedPost = await response.json();

      setPosts((prevPosts) =>
        prevPosts.map((post) => (post._id === postId ? updatedPost : post))
      );
    } catch (error) {
      console.error("Like error:", error);
    }
  };

  const handleSavedPost = async (postId: string) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${postId}/save`, {
        method: "PUT",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to save/unsave post");

      const updatedUser = await response.json();
      console.log(updatedUser.message);
    } catch (error) {
      console.error("Save post error:", error);
    }
  };

  const openCommentModal = async (postId: string) => {
    setSelectedPostId(postId);
    setNewComment("");

    try {
      const response = await fetch(`http://localhost:5000/api/${postId}/comments`, {
        method: "GET",
        credentials: "include",
      });

      if (!response.ok) throw new Error("Failed to fetch comments");

      const data = await response.json();

      // ✅ Use `data.comments` directly
      setComments(data.comments || []);
    } catch (error) {
      console.error("Fetch comments error:", error);
      setComments([]);
    }
  };

  const closeCommentModal = () => {
    setSelectedPostId(null);
    setComments([]);
  };

  const handlePostComment = async () => {
    if (!newComment.trim()) return;

    try {
      const response = await fetch(`http://localhost:5000/api/${selectedPostId}/comment`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: newComment }),
      });

      if (!response.ok) throw new Error("Failed to post comment");

      const comment = await response.json();
      setComments((prev) => [...prev, comment]);
      setNewComment("");
    } catch (error) {
      console.error("Post comment error:", error);
    }
  };

  return (
    <div>
      {posts.map((post: any) => (
        <div
          key={post._id}
          className="w-full h-auto p-3 mt-4 rounded-xl border shadow-md bg-white"
        >
          {/* Profile */}
          <Profile
            className="w-[55px] mb-3"
            flexDirection="row"
            name={post?.docName}
            profession=""
            imgSrc="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
          />

          {/* Post Image */}
          {post.image && (
            <img
              src={`http://localhost:5000/uploads/${post.image}`}
              alt="Post"
              className="w-full rounded-md"
            />
          )}

          {/* Content */}
          <div className="bg-white p-4 border-t border-b border-blue-200">
            <p className="text-gray-700">{post?.content}</p>
          </div>

          {/* Action Buttons */}
          <div className="bg-gray-100 p-1 flex justify-between items-center rounded-b-xl border-b border-blue-200">
            <div className="flex items-center gap-2">
              <div
                className="p-2 hover:cursor-pointer hover:bg-blue-200 rounded-md transition duration-200"
                onClick={() => handleLike(post._id)}
              >
                👍 Like {post.likes?.length || 0}
              </div>
              <div
                className="p-2 hover:cursor-pointer hover:bg-blue-200 rounded-md transition duration-200"
                onClick={() => openCommentModal(post._id)}
              >
                💬 Comment {post.comments?.length || 0}
              </div>
            </div>
            <div
              className="p-2 hover:cursor-pointer hover:bg-blue-200 rounded-md transition duration-200"
              onClick={() => handleSavedPost(post._id)}
            >
              💾 Save
            </div>
          </div>
        </div>
      ))}

      {/* COMMENT MODAL */}
      {selectedPostId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white w-full max-w-md p-4 rounded-lg shadow-lg relative">
            <button
              onClick={closeCommentModal}
              className="absolute top-2 right-2 text-gray-600 hover:text-black"
            >
              ✖
            </button>
            <h2 className="text-lg font-semibold mb-2">Comments</h2>

            <div className="max-h-60 overflow-y-auto mb-3">
              {comments.length > 0 ? (
                comments.map((c, i) => (
                  <div key={i} className="mb-2 border-b pb-1">
                    <p className="text-sm font-semibold">{c.username || "User"}</p>
                    <p className="text-sm text-gray-700">{c.content}</p>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">No comments yet.</p>
              )}
            </div>

            <div className="flex gap-2">
              <input
                type="text"
                className="border rounded w-full px-3 py-1 text-sm"
                placeholder="Add a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handlePostComment}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600"
              >
                Post
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default FeedPosts;
