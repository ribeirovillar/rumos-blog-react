import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import PostForm from '../components/PostForm'; // New component for post form
import PostService from '../services/PostService';
import AuthService from '../services/AuthService';

function LandingPage() {
    const categoryOptions = ['SCIENCE', 'TECHNOLOGY', 'SPORTS', 'LIFESTYLE', 'POLITICS'];
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);
    const [page, setPage] = useState(0);
    const [totalPages, setTotalPages] = useState(0);
    const navigate = useNavigate();
    const postService = new PostService();
    const isAdmin = getUserRoles().includes('ROLE_ADMIN');

    useEffect(() => {
        fetchPosts();
    }, [page]);

    async function fetchPosts() {
        try {
            const response = await postService.getAllPosts(page);
            setPosts(response.data.content);
            setTotalPages(response.data.totalPages);
            clearPostForm();
        } catch (error) {
            console.error('Error fetching posts:', error);
        }
    }

    const deletePost = (postId) => {
        postService.deletePost(postId)
            .then(() => {
                setPosts(posts.filter(post => post.id !== postId));
            })
            .catch(alertError);
    }

    async function createOrUpdatePost(postData, isUpdate = false) {
        try {
            const response = isUpdate ? await postService.updatePost(postData.id, postData) : await postService.createPost(postData);
            clearPostForm();
            if (isUpdate) {
                refreshPost(postData.id);
            } else {
                setPosts([response.data, ...posts]);
            }
        } catch (error) {
            alertError(error);
        }
    }

    function editPost(post) {
        setSelectedPost(post);
    }

    async function refreshPost(postId) {
        try {
            const postDto = await postService.getPostById(postId);
            setPosts(posts.map(post => post.id === postId ? postDto : post));
        } catch (error) {
            console.error('Error refreshing post:', error);
        }
    }

    function clearPostForm() {
        setSelectedPost(null);
    }

    function logout() {
        new AuthService().logout();
        navigate('/login');
    }

    function goToAdminPage() {
        navigate('/admin');
    }

    function nextPage() {
        setPage(Math.min(page + 1, totalPages - 1));
    }

    function previousPage() {
        setPage(Math.max(page - 1, 0));
    }

    function alertError(error) {
        if (error.response) {
            alert(error.response.data.message);
        }
    }

    function getUserRoles() {
        const roles = localStorage.getItem('roles');
        return roles ? roles.split(',') : [];
    }

    return (
        <div>
            <h2>Posts</h2>
            <button onClick={logout}>Logout</button>
            {isAdmin && <button onClick={goToAdminPage}>Admin Page</button>}
            {posts.map(post => (
                <Post key={post.id} post={post} onEdit={() => editPost(post)} onDelete={() => deletePost(post.id)} />
            ))}
            {isAdmin && <PostForm
                post={selectedPost}
                categoryOptions={categoryOptions}
                onSave={createOrUpdatePost}
                onCancel={clearPostForm}
            />}
            {totalPages > 1 && (
                <div>
                    <button onClick={previousPage}>Previous Page</button>
                    <button onClick={nextPage}>Next Page</button>
                </div>
            )}
        </div>
    );
}

export default LandingPage;