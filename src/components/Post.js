import { Comment } from "./Comment";
import React, { useState } from "react";
import CommentForm from "./CommentForm";
import PostService from "../services/PostService";

export function Post({ post, onEdit, onDelete }) {

    const [comments, setComments] = useState(post.comments);
    const postService = new PostService();


    const refreshComments = async () => {
        try {
            const postDto = await postService.getPostById(post.id);
            setComments(postDto.comments);
        } catch (error) {
            console.error('Erro ao atualizar comentários:', error);
        }
    };

    return (
        <div key={post.id}>
            <h3>{post.title}</h3>
            <p>{post.content}</p>
            <p>Created: {post.created}</p>
            <p>Categories: {post.categories.join(', ')}</p>
            <p>Author: {post.author.name} ({post.author.email})</p>
            <button onClick={() => onEdit(post)}>Edit Post</button>
            <button onClick={() => onDelete(post.id)}>Delete Post</button>
            <h4>Comments</h4>
            {comments && comments.map(comment => (
                <Comment key={comment.id} comment={comment} refreshComments={refreshComments} />
            ))}
            <CommentForm postId={post.id} refreshComments={refreshComments} />
        </div>
    );
}

export default Post;