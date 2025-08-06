class User {
  #password;
  constructor({ name, email, username, password, role }) {
    this.name = name;
    this.email = email;
    this.username = username;
    this.#password = password;
    this.role = role;
  }
}

class Participant extends User {
  constructor({ name, email, username, password, campus }) {
    super({
      name: name,
      email: email,
      username: username,
      password: password,
      role: "participant",
    });
    this.campus = campus;
  }

  getAllData() {
    return {
      name: this.name,
      email: this.email,
      username: this.username,
      role: this.role,
    };
  }
}

class Admin extends User {
  constructor({ name, email, username, password }) {
    super({
      email: email,
      name: name,
      username: username,
      password: password,
      role: "admin",
    });
  }

  getAllData() {
    return {
      name: this.name,
      email: this.email,
      username: this.username,
      role: this.role,
    };
  }
}

class Challenge {
  #flag;
  constructor({ title, description, flag, point, author }) {
    this.title = title;
    this.description = description;
    this.#flag = flag;
    this.point = point;
    this.author = author;
  }

  checkFlag(inputFlag) {
    return this.#flag === inputFlag;
  }

  getAllData() {
    return {
      title: this.title,
      description: this.description,
      point: this.point,
      author: this.author,
    };
  }
}

class Submission {
  constructor() {
    this.chall_object;
    this.parti_object;
    this.flag;
  }

  addSubmission({
    chall_object,
    parti_object,
    flag,
    leaderboardList,
  }) {

    let result;
    if (!chall_object.checkFlag(flag)) {
      result = "Wrong Flag ...";
      return this.#resultSubmision(parti_object,chall_object,flag,result) ;
    }

    this.#addToLeaderboard(
      chall_object,
      parti_object,
      leaderboardList
    );

    result = "Correct Flag ...";
    return this.#resultSubmision(parti_object,chall_object,flag,result) ;
  }

  #addToLeaderboard(chall_object, parti_object, leaderboardList) {
    let point = chall_object.point;
    
    if(!leaderboardList.find(val => val.username == parti_object.username)){
        const data = {
          username: parti_object.username,
          point: point,
        };
        leaderboardList.push(data);
    }else{
        for(var i in leaderboardList){
            if(leaderboardList[i].username == parti_object.username){
                leaderboardList[i].point += point 
                break; 
            }
        }
    }


  }

  #resultSubmision(parti_object,chall_object,flag,result){
    console.log(`
+
Participant : ${parti_object.name}
Submit Chall : ${chall_object.title}
Your Flag : ${flag}
Result : ${result}
+
`);
  }
}

// insert admin
const admin_1 = new Admin({
  name: "Devit",
  username: "mpiie",
  email: "deviterlingga.e@gmai.com",
  password: "1234678",
});

// insert participant
const participant_1 = new Participant({
  name: "Participant 1",
  email: "participant@gmail.com",
  username: "prcpnt",
  password: "12345678",
  campus: "Telkom University",
});

// insert challenge
const chall_1 = new Challenge({
  title: "Crypto",
  description: "description example",
  flag: "CTF{solution}",
  point: 200,
  author: admin_1.username,
});

// object submission
const submission = new Submission();

const leaderboardList = [];

let flag = "CTF{solution}";

const result_1  = submission.addSubmission({
  chall_object: chall_1,
  parti_object: participant_1,
  flag: flag,
  leaderboardList: leaderboardList,
});

const result_2 = submission.addSubmission({
  chall_object: chall_1,
  parti_object: participant_1,
  flag: flag,
  leaderboardList: leaderboardList,
});


console.log(leaderboardList);
