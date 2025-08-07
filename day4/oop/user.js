export default class User {
  #_password;
  constructor({id, name, email, username, password, role }) {
    this.id = id;
    this.name = name;
    this.email = email;
    this.username = username;
    this.#_password = password;
    this.role = role;
  }

  get password(){
    return this.#_password;
  }
}
