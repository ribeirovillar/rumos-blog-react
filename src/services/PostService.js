import PostDto from '../models/PostDto';
import HttpService from './HttpService';

class PostService extends HttpService {

    async getAllPosts(page) {
        const response = await super.getAll(`${process.env.REACT_APP_API_POST_ENDPOINT}?page=${page}`);
        const posts = response.data.content;
        posts.forEach(post => post.comments.sort((a, b) => new Date(a.created) - new Date(b.created)));
        response.data.content = posts;
        return response;
    }

    async getPostById(id) {
        const response = await super.getById(`${process.env.REACT_APP_API_POST_ENDPOINT}`, id);
        const post = response.data;
        post.comments.sort((a, b) => new Date(a.created) - new Date(b.created));
        return PostDto.fromDTO(post);
    }

    async createPost(post) {
        return await super.post(`${process.env.REACT_APP_API_POST_ENDPOINT}`, post);
    }

    async updatePost(id, post) {
        return await super.put(`${process.env.REACT_APP_API_POST_ENDPOINT}`, id, post);
    }

    async deletePost(id) {
        await super.delete(`${process.env.REACT_APP_API_POST_ENDPOINT}`, id);
    }
}

export default PostService;