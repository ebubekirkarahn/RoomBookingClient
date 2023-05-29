export class User {
  id: number;
  name: string;

  getRole() : string {
    return 'standard';
  }

  static fromHttp(user: User) : User {
    const newUser = new User();
    newUser.id = user.id;
    newUser.name = user.name;
    return newUser;
  }
}
