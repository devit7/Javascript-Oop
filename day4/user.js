export default class User {
  #password;
  constructor({id, name, email, username, password, role }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.#password = password;
    this.role = role;
  }
}
