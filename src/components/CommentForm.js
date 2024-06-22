import React, { useState } from 'react';
import CommentService from '../services/CommentService';

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
                alert(error.response.data.message);
                setError(error.response.data.message);
            } else {
                setError('Ocorreu um erro ao tentar criar o comentário');
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            {error && <p>{error}</p>}
            <label>
                New Comment:
                <input type="text" value={content} onChange={(e) => setContent(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
}

export default CommentForm;