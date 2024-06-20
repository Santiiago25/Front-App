export class CreateUserRequest {
  constructor(
    public username: string,
    public password: string,
    public roleRequest: { roleListName: string[] },
    public estado: string
  ) {}
}