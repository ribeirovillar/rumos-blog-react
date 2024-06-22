import AuthorDto from './AuthorDto';
import CommentDto from './CommentDto';

class PostDto {
    constructor(id, title, content, created, categories, author, comments) {
      this.id = id;
      this.title = title;
      this.content = content;
      this.created = created;
      this.categories = categories;
      this.author = author;
      this.comments = comments;
    }
  
    static fromDTO(dto) {
      return new PostDto(
        dto.id,
        dto.title,
        dto.content,
        dto.created,
        dto.categories,
        AuthorDto.fromDTO(dto.author),
        dto.comments.map(CommentDto.fromDTO)
      );
    }
  }

  export default PostDto;