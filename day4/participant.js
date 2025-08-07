import User from "./user.js";

class Participant extends User {
  constructor({ id, name, email, username, password, campus }) {
    super({
      id: id,
      name: name,
      email: email,
      username: username,
      password: password,
      role: "participant",
    });
    this.campus = campus;
  }

  getData() {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      username: this.username,
      role: this.role,
    };
  }
}

export default Participant;
