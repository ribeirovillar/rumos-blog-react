import { Comment } from "./Comment";
import React, { useState } from "react";
import CommentForm from "./CommentForm";
import PostService from "../services/PostService";
import './Post.css';

export function Post({ post, onEdit, onDelete, isAdmin }) {

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
        <div className="postContainer" key={post.id}>
            <h3 className="postTitle">{post.title}</h3>
            <p className="postContent">{post.content}</p>
            <p className="postMetadata">Created: {post.created}</p>
            <p className="postMetadata">Categories: {post.categories.join(', ')}</p>
            <p className="postMetadata">Author: {post.author.name} ({post.author.email})</p>
            {isAdmin && <div className="postActions">
                <button className="editButton" onClick={() => onEdit(post)}>Edit Post</button>
                <button className="deleteButton" onClick={() => onDelete(post.id)}>Delete Post</button>
            </div>}
            <h4 className="commentsTitle">Comments</h4>
            {comments && comments.map(comment => (
                <Comment key={comment.id} comment={comment} refreshComments={refreshComments} />
            ))}
            <CommentForm postId={post.id} refreshComments={refreshComments} />
        </div>
    );
}

export default Post;