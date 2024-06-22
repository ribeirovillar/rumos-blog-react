import React, { useState } from "react";
import CommentService from "../services/CommentService";

export function Comment({ comment, refreshComments }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editedContent, setEditedContent] = useState(comment.content);
    const [error, setError] = useState('');
    const commentService = new CommentService();

    const handleEdit = async () => {
        try {
            comment.content = editedContent;
            comment.created = new Date();
            await commentService.updateComment(comment.id, comment);
            setIsEditing(false);
            refreshComments();
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                alert(error.response.data.message);
            } else {
                setError('Ocorreu um erro ao tentar editar o comentário');
            }
        }
    };

    const handleDelete = async () => {
        try {
            await commentService.deleteComment(comment.id);
            refreshComments();
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
                alert(error.response.data.message);
            } else {
                setError('Ocorreu um erro ao tentar deletar o comentário');
            }
        }
    };

    return (
        <div key={comment.id}>
            {error && <p>{error}</p>}
            {isEditing ? (
                <>
                    <input type="text" value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
                    <button onClick={handleEdit}>Update Comment</button>
                    <button onClick={() => { setIsEditing(false); setError(''); }}>Cancel Update Comment</button>
                </>
            ) : (
                <>
                    <p>{comment.content}</p>
                    <p>Author: {comment.author.name} ({comment.author.email})</p>
                    <button onClick={() => setIsEditing(true)}>Edit Comment</button>
                    <button onClick={handleDelete}>Delete Comment</button>
                </>
            )}
        </div>
    );
}

export default Comment;