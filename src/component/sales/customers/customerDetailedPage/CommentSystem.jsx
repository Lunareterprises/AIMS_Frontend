import React, { useState } from 'react';
import { Trash2, CheckCircle, AlertTriangle } from 'lucide-react';

const CommentSystem = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [commentToDelete, setCommentToDelete] = useState(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  const addComment = () => {
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        text: newComment,
        author: 'accounts',
        timestamp: new Date().toLocaleString('en-GB', {
          day: '2-digit',
          month: 'short',
          year: 'numeric',
          hour: '2-digit',
          minute: '2-digit',
          hour12: true
        }).toUpperCase()
      };
      setComments([...comments, comment]);
      setNewComment('');
      setShowSuccessToast(true);
      setTimeout(() => setShowSuccessToast(false), 3000);
    }
  };

  const handleDeleteClick = (commentId) => {
    setCommentToDelete(commentId);
    setShowDeleteModal(true);
  };

  const confirmDelete = () => {
    setComments(comments.filter(c => c.id !== commentToDelete));
    setShowDeleteModal(false);
    setCommentToDelete(null);
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
    setCommentToDelete(null);
  };

  return (
    <div className="min-h-screen ">


      {/* Success Toast */}
      {showSuccessToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-white border border-gray-200 rounded-lg shadow-lg p-4 flex items-center gap-3 z-50">
          <CheckCircle className="w-5 h-5 text-green-500" />
          <span className="text-gray-700">Comments added.</span>
        </div>
      )}

      {/* Comment Input */}
      <div className="bg-white border border-gray-200 rounded-lg mb-6">
        <div className="border-b border-gray-200 p-3">
          <div className="flex gap-2">
            <button className="px-2 py-1 text-sm font-bold text-gray-700 hover:bg-gray-100 rounded">B</button>
            <button className="px-2 py-1 text-sm italic text-gray-700 hover:bg-gray-100 rounded">I</button>
            <button className="px-2 py-1 text-sm underline text-gray-700 hover:bg-gray-100 rounded">U</button>
          </div>
        </div>
        <div className="p-3">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Add Comment"
            className="w-full min-h-[100px] resize-none border-none outline-none text-gray-700 placeholder-gray-400"
          />
          <button
            onClick={addComment}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700 transition-colors"
          >
            Add Comment
          </button>
        </div>
      </div>

      {/* Comments Section */}
      <div>
        <h3 className="text-gray-600 font-medium mb-4 flex items-center gap-2">
          ALL COMMENTS 
          {comments.length > 0 && (
            <span className="bg-blue-500 text-white text-xs px-2 py-1 rounded-full">
              {comments.length}
            </span>
          )}
        </h3>

        {comments.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500">No comments yet.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {comments.map((comment) => (
              <div key={comment.id} className="bg-white border border-gray-200 rounded-lg p-4">
                <div className="flex items-start justify-between">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm">💬</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-medium text-gray-900">{comment.author}</span>
                        <span className="text-gray-500 text-sm">• {comment.timestamp}</span>
                      </div>
                      <p className="text-gray-700">{comment.text}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteClick(comment.id)}
                    className="text-gray-400 hover:text-red-500 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black/20 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex items-center gap-3 mb-4">
              <AlertTriangle className="w-6 h-6 text-orange-500" />
              <h3 className="text-lg font-medium text-gray-900">Do you want to delete this comment?</h3>
            </div>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelDelete}
                className="px-4 py-2 text-gray-700 bg-gray-100 rounded hover:bg-gray-200 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 transition-colors"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CommentSystem;