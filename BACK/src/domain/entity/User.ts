export class User {
  id?: string;
  name: string;
  email: string;

  constructor(id: string, name: string, email: string) {
    this.id = id || undefined;
    this.name = name;
    this.email = email;
  }
}
