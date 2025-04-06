import React, { useContext, useState, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import "./EventosInfo.css";
import userimg from "../assets/img/userimg.jpg";

const CommentInput = ({ eventId }) => {
  const { isAuthenticated, name, avatar } = useContext(UserContext);
  const [newComment, setNewComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const savedComments = JSON.parse(localStorage.getItem(`comments-${eventId}`));
    if (savedComments) {
      setComments(savedComments);
    }
  }, [eventId]);

  useEffect(() => {
    if (comments.length > 0) {
      localStorage.setItem(`comments-${eventId}`, JSON.stringify(comments));
    }
  }, [comments, eventId]);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const newCommentData = {
        id: Date.now(),
        user: name,
        avatar: avatar || userimg,
        comment: newComment,
        date: new Date().toLocaleString(),
      };
      const updatedComments = [...comments, newCommentData];
      setComments(updatedComments);
      setNewComment("");
    }
  };

  const handleCancel = () => {
    setNewComment("");
  };

  const handleDeleteComment = (id, user) => {
    if (isAuthenticated && user === name) {
      const updatedComments = comments.filter((comment) => comment.id !== id);
      setComments(updatedComments);
    } else {
      alert("No tienes permiso para borrar este comentario.");
    }
  };

  return (
    <div className="container-comment mt-5 pt-5">
      {isAuthenticated ? (
        <>
          <h1>Comentarios</h1>
          <div className="d-flex align-items-start my-3 px-4 pt-4">
            <img
              src={avatar || userimg}
              alt="Avatar"
              className="rounded-circle me-3"
              style={{ width: "50px", height: "50px" }}
            />
            <div className="container-textarea w-100">
              <textarea
                className="custom-textarea"
                placeholder="Agregar comentario..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                rows="2"
              ></textarea>
              <div className="d-flex justify-content-end mt-2">
                <button
                  className="btn-cancel btn-secondary me-2"
                  onClick={handleCancel}
                >
                  Cancelar
                </button>
                <button
                  className="btn-comment btn-primary"
                  onClick={handleAddComment}
                >
                  Comentar
                </button>
              </div>
            </div>
          </div>

          <div className="comments-list">
            {comments.map((comment) => (
              <div key={comment.id} className="comment-item my-3 p-3">
                <div className="d-flex align-items-start">
                  <img
                    src={userimg}
                    alt="Avatar"
                    className="rounded-circle me-3"
                    style={{ width: "40px", height: "40px" }}
                  />
                  <div>
                    <div className="d-flex justify-content-between">
                      <strong>{comment.user}</strong>
                    </div>
                    <p>{comment.comment}</p>
                    {comment.user === name && (
                      <button
                        className="btn btn-outline-danger btn-sm"
                        onClick={() => handleDeleteComment(comment.id, comment.user)}
                      >
                        <i className="bi bi-trash"></i> 
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <p className="text-center">Inicia sesión para comentar y ver los comentarios de este evento!</p>
      )}
    </div>
  );
};

export default CommentInput;
