import Participant from "./participant.js";
import Admin from "./admin.js";
import Submission from "./submission.js";
import Challenge from "./challenge.js";
import Review from "./review.js";

export default class CTFPlatform {
  listParticipant = [];
  listAdmin = [];
  listChall = [];
  leaderboardList = [];
  nextId = 1;
  listSubmitSuccessFull = [];

  constructor(nameCtf) {
    this.nameCtf = nameCtf;
  }

  addAdmin({ name, username, email, password }) {
    // insert admin
    const admin = new Admin({
      id: this.nextId++,
      name: name,
      username: username,
      email: email,
      password: password,
    });
    this.listAdmin.push(admin);
  }

  registerParticipant({ name, email, username, password, campus }) {
    const participant = new Participant({
      id: this.nextId++,
      name: name,
      email: email,
      username: username,
      password: password,
      campus: campus,
    });
    this.listParticipant.push(participant);
  }

  addChallenge({ title, description, flag, point, adminId }) {
    //check is admin ?
    if (!this.checkAdmin(adminId)) {
      return console.log("Only admin can add challenge");
    }

    // insert challenge
    const chall = new Challenge({
      id: this.nextId++,
      title: title,
      description: description,
      flag: flag,
      point: point,
      author: adminId,
    });
    this.listChall.push(chall);
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
    const isAdmin = this.listAdmin.find((item) => item.id === adminId);
    return isAdmin;
  }

  submitChall(flag, challId, participantId) {
    const submission = new Submission();

    //get data chall
    const chall_object = this.listChall.find((item) => item.id === challId);
    if (!chall_object) {
      return console.log("Challenge not found");
    }

    //get data participant
    const participant_object = this.listParticipant.find(
      (item) => item.id === participantId
    );
    if (!participant_object) {
      return console.log("Participant not found");
    }

    submission.addSubmission({
      chall_object: chall_object,
      parti_object: participant_object,
      flag: flag,
      leaderboardList: this.leaderboardList,
      listSubmitSuccessFull: this.listSubmitSuccessFull,
    });
  }

  addReview({ participantId, challId, title, description, rating }) {
    //get data chall
    const chall_object = this.listChall.find((item) => item.id === challId);
    if (!chall_object) {
      return console.log("Challenge not found");
    }

    //get data participant
    const participant_object = this.listParticipant.find(
      (item) => item.id === participantId
    );
    if (!participant_object) {
      return console.log("Participant not found");
    }

    // check not solved
    const isSolved = this.listSubmitSuccessFull.find((item)=>item.parti_id === participantId)
    if(!isSolved){
        return console.log("Please solve first and you can review")
    }

    // already review??
    const alreadyReview = chall_object.reviewList.find((item) => {
      item.participantId === participantId;
    });
    if (alreadyReview) {
      return console.log("You already review this chall");
    }

    try {
      const review = new Review({
        title: title,
        description: description,
        rating: rating,
        participantId: participantId,
      });
      chall_object.reviewList.push(review);
    } catch (e) {
      throw new Error(`Error ${e}`);
    }
  }

  getReviewChall({ challId }) {
    //get data chall
    const chall_object = this.listChall.find((item) => item.id === challId);
    if (!chall_object) {
      return console.log("Challenge not found");
    }

    return chall_object.getReview()

  }
}