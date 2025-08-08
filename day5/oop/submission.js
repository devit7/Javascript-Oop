export default class Submission {
  constructor() {
    this.chall_object;
    this.parti_object;
    this.flag;
  }

  addSubmission({ chall_object, parti_object, flag}) {
    let result;
    if (chall_object.flag !== flag) {
      result = "Wrong Flag ...";
      return alert(result);
    }

    this.#addToLeaderboard(chall_object, parti_object);
    let dataSucces = {
        parti_id: parti_object.id,
        username: parti_object.username,
        chall_id : chall_object.id,
        date: new Date()
    }
    let listSubmitSuccessFull = JSON.parse(localStorage.getItem("ls-listSubmitSuccessFull")) || []
    listSubmitSuccessFull.push(dataSucces)
    localStorage.setItem("ls-listSubmitSuccessFull", JSON.stringify(listSubmitSuccessFull))
    result = "Correct Flag ...";
    return alert(result);
  }

  #addToLeaderboard(chall_object, parti_object) {
    let point = chall_object.point;
    let leaderboardList = JSON.parse(localStorage.getItem("ls-leaderboardList")) || []

    if (!leaderboardList.find((val) => val.username == parti_object.username)) {
      const data = {
        username: parti_object.username,
        point: point,
      };
      leaderboardList.push(data);
      localStorage.setItem("ls-leaderboardList",JSON.stringify(leaderboardList))
    } else {
      for (var i in leaderboardList) {
        if (leaderboardList[i].username == parti_object.username) {
          leaderboardList[i].point += point;
          break;
        }
      }
    }
  }

}
