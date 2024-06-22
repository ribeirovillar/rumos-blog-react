import HttpService from './HttpService';

class CommentService extends HttpService {

    async getAllComments() {
        return await super.getAll(`${process.env.REACT_APP_API_COMMENT_ENDPOINT}`);
    }

    async getCommentById(id) {
        return await super.getById(`${process.env.REACT_APP_API_COMMENT_ENDPOINT}`, id);
    }

    async createComment(comment) {
        return await super.post(`${process.env.REACT_APP_API_COMMENT_ENDPOINT}/posts/${comment.postId}/comments`, comment);
    }

    async updateComment(id, comment) {
        return await super.put(`${process.env.REACT_APP_API_COMMENT_ENDPOINT}`, id, comment);
    }

    async deleteComment(id) {
        await super.delete(`${process.env.REACT_APP_API_COMMENT_ENDPOINT}`, id);
    }
    
}

export default CommentService;