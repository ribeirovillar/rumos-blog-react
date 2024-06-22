class AuthorDto {
    constructor(id, name, email) {
        this.id = id;
        this.name = name;
        this.email = email;
    }

    static fromDTO(dto) {
        return new AuthorDto(dto.id, dto.name, dto.email);
    }
}

export default AuthorDto;