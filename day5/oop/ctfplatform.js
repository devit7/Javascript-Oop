import Participant from "./participant.js";
import Admin from "./admin.js";
import Submission from "./submission.js";
import Challenge from "./challenge.js";

export default class CTFPlatform {
  listParticipant = [];
  listAdmin = [];
  listChall = [];
  leaderboardList = [];
  listSubmitSuccessFull = [];

  constructor(nameCtf) {
    this.nameCtf = nameCtf;
  }

  UUID(){
    return Math.random().toString(16).substring(2, 10).toUpperCase()
  }

  addAdmin({ name, username, email, password }) {
    // insert admin
    const admin = new Admin({
      id: this.UUID(),
      name: name,
      username: username,
      email: email,
      password: password,
    });
    this.listAdmin.push(admin);
    let tempListAdmin = [];
    tempListAdmin.push(admin.getAllData());
    localStorage.setItem(
      "ls-listAdmin",
      JSON.stringify(tempListAdmin)
    );
  }

  registerParticipant({ name, email, username, password, campus }) {
    const participant = new Participant({
      id: this.UUID(),
      name: name,
      email: email,
      username: username,
      password: password,
      campus: campus,
    });
    this.listParticipant.push(participant);
    let tempListparticipant = JSON.parse(localStorage.getItem("ls-listParticipant")) || []
    tempListparticipant.push(participant.getAllData());
    localStorage.setItem(
      "ls-listParticipant",
      JSON.stringify(tempListparticipant)
    );
  }

  authLogin({ username, password }) {
    let ls_allUsers = [];
    const ls_participant = JSON.parse(
      localStorage.getItem("ls-listParticipant")
    );
    const ls_admin = JSON.parse(
      localStorage.getItem("ls-listAdmin")
    )
    ls_allUsers.push(...ls_participant)
    ls_allUsers.push(...ls_admin)
    const isValid = ls_allUsers.find((item) => {
      return item.username === username && item.password === password;
    });
    if (!isValid) {
      return console.log("Wrong username and password");
    }
    localStorage.setItem("auth-user", JSON.stringify(isValid));
    return isValid
  }

  addChallenge({ title, description, flag, point, adminId }) {
    console.log(title,description,flag,point,adminId)
    //check is admin ?
    if (!this.checkAdmin(adminId)) {
      return console.log("Only admin can add challenge");
    }

    // insert challenge
    const chall = new Challenge({
      id: this.UUID(),
      title: title,
      description: description,
      flag: flag,
      point: point,
      author: adminId,
    });
    this.listChall.push(chall);
    let tempData = JSON.parse(localStorage.getItem("ls-listChall")) || []
    tempData.push(chall.getData());
    localStorage.setItem("ls-listChall", JSON.stringify(tempData));
  }

  getAllParticipantList() {
    return this.listParticipant;
  }

  getAllAdminList() {
    return this.listAdmin;
  }

  getAllChallenge() {
    return this.listChall;
  }

  checkAdmin(adminId) {
    let ls_admin = JSON.parse(localStorage.getItem("ls-listAdmin"))
    const isAdmin = ls_admin.find((item) => item.id === adminId);
    return isAdmin;
  }

  submitChall({flag, challId, participantId}) {
    const submission = new Submission();
    let ls_listSubmitSuccessFull = JSON.parse(localStorage.getItem("ls-listSubmitSuccessFull")) || []
    let ls_listParticipant = JSON.parse(localStorage.getItem("ls-listParticipant")) || []
    let ls_listChall = JSON.parse(localStorage.getItem("ls-listChall")) || []

    //get data chall
    const chall_object = ls_listChall.find((item) => item.id === challId);
    if (!chall_object) {
      return alert("Challenge not found");
    }

    //get data participant
    const participant_object = ls_listParticipant.find(
      (item) => item.id === participantId
    );
    if (!participant_object) {
      return alert("Participant not found");
    }

    // check if already submited
    const isSubmieted = ls_listSubmitSuccessFull.find((item)=>{
      item.parti_id == participantId && item.chall_id == challId
    })

    if(isSubmieted){
      return alert("Your submit already correct")
    }

    submission.addSubmission({
      chall_object: chall_object,
      parti_object: participant_object,
      flag: flag,
    });
  }

}
