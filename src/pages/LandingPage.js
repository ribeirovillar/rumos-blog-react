import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Post from '../components/Post';
import PostForm from '../components/PostForm';
import PostService from '../services/PostService';
import AuthService from '../services/AuthService';
import './LandingPage.css';

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
        const response = isUpdate ? await postService.updatePost(postData.id, postData) : await postService.createPost(postData);
        clearPostForm();
        if (isUpdate) {
            refreshPost(postData.id);
        } else {
            setPosts([response.data, ...posts]);
        }
    }

    function editPost(post) {
        setSelectedPost(post);
        window.scrollTo(0, 0);
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
        <div className="landingPageContainer">
            <div className="postsHeader">
                <h1>Posts</h1>
                <div className="actionButtons">
                    {isAdmin && <button className="button adminButton" onClick={goToAdminPage}>Admin Page</button>}
                    <button className="button logoutButton" onClick={logout}>Logout</button>
                </div>
            </div>
            {isAdmin && <div className="postForm">
                <PostForm
                    post={selectedPost}
                    categoryOptions={categoryOptions}
                    onSave={createOrUpdatePost}
                    onCancel={clearPostForm} />
            </div>}
            {posts.map(post => (
                <div key={post.id} className="postItem">
                    <Post post={post} onEdit={() => editPost(post)} onDelete={() => deletePost(post.id)} isAdmin={isAdmin} />
                </div>
            ))}
            <div className="pagination">
                <button className="button" disabled={page === 0} onClick={() => setPage(page - 1)}>Previous</button>
                <span>Page {page + 1} of {totalPages}</span>
                <button className="button" disabled={page + 1 >= totalPages} onClick={() => setPage(page + 1)}>Next</button>
            </div>
        </div>
    );
}

export default LandingPage;