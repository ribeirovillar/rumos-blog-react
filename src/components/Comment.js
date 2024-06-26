import React, { useState } from "react";
import CommentService from "../services/CommentService";
import './Comment.css';

export function Comment({ comment, refreshComments }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [error, setError] = useState('');
    const commentService = new CommentService();

    const handleEdit = async () => {
        const originalContent = comment.content;
        try {
            comment.content = editedContent;
            comment.created = null;
            await commentService.updateComment(comment.id, comment);
            setIsEditing(false);
            refreshComments();
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Ocorreu um erro ao tentar editar o comentário');
            }
            comment.content = originalContent;
        }
    };

    const handleDelete = async () => {
        try {
            await commentService.deleteComment(comment.id);
            refreshComments();
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Ocorreu um erro ao tentar deletar o comentário');
            }
        }
    };

    const handleCancel = () => {
        setIsEditing(false); 
        setEditedContent(comment.content);
        setError('');
    };

    return (
    <div className="commentContainer">
        <div className="commentHeader">
            <span className="commentAuthor">{comment.author.name}</span> {/* Adicionado para mostrar o nome do autor */}
        </div>
        {isEditing ? (
            <textarea
                value={editedContent}
                onChange={(e) => setEditedContent(e.target.value)}
            />
        ) : (
            <p className="commentContent">{comment.content}</p>
        )}
        <div className="commentActions">
            {isEditing ? (
                <>
                    <button className="editButton" onClick={handleEdit}>Save</button>
                    <button className="deleteButton" onClick={handleCancel}>Cancel</button>
                </>
            ) : (
                <>
                    <button className="editButton" onClick={() => setIsEditing(true)}>Edit</button>
                    <button className="deleteButton" onClick={handleDelete}>Delete</button>
                </>
            )}
        </div>
        {error && <p className="commentError">{error}</p>}
    </div>
);
}

export default Comment;