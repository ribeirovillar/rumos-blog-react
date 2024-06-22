import AuthorDto from './AuthorDto';

class CommentDto {
    constructor(id, content, author, postId, created) {
        this.id = id;
        this.content = content;
        this.author = author;
        this.postId = postId;
        this.created = created;
    }

    static fromDTO(dto) {
        return new CommentDto(
            dto.id,
            dto.content,
            AuthorDto.fromDTO(dto.author),
            dto.postId,
            new Date(dto.created).toLocaleDateString()
        );
    }
}

export default CommentDto;