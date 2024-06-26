import React, { useState } from 'react';
import CommentService from '../services/CommentService';
import './CommentForm.css';

function CommentForm({ postId, refreshComments }) {
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const commentService = new CommentService();

    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            setError('');
            await commentService.createComment({ content, postId });
            setContent('');
            refreshComments();
        } catch (error) {
            if (error.response && error.response.data) {
                setError(error.response.data.message);
            } else {
                setError('Ocorreu um erro ao tentar criar o comentário');
            }
        }
    };

    const handleCancel = () => {
        setContent('');
        setError('');
    };

    return (
        <form onSubmit={handleSubmit} className="commentForm">
            {error && <p>{error}</p>}
            <label>
                New Comment:
                <input
                    type="text"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    required
                />
            </label>
            <div className="formActions">
                <button type="submit" className='saveButton'>Create</button>
                <button type="button" className='cancelButton' onClick={handleCancel}>Cancel</button>
            </div>

        </form>
    );
}

export default CommentForm;