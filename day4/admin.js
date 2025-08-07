import User from "./user.js";

export default class Admin extends User {
  constructor({ id, name, email, username, password }) {
    super({
      id: id,
      email: email,
      name: name,
      username: username,
      password: password,
      role: "admin",
    });
  }

  getAllData() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      role: this.role,
    };
  }
}
