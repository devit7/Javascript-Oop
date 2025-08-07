export default class Submission {
  constructor() {
    this.chall_object;
    this.parti_object;
    this.flag;
  }

  addSubmission({ chall_object, parti_object, flag, leaderboardList, listSubmitSuccessFull }) {
    let result;
    if (!chall_object.checkFlag(flag)) {
      result = "Wrong Flag ...";
      return this.#resultSubmision(parti_object, chall_object, flag, result);
    }

    this.#addToLeaderboard(chall_object, parti_object, leaderboardList);
    let dataSucces = {
        parti_id: parti_object.id,
        chall_id : chall_object.id,
        date: new Date()
    }
    listSubmitSuccessFull.push(dataSucces)
    result = "Correct Flag ...";
    return this.#resultSubmision(parti_object, chall_object, flag, result);
  }

  #addToLeaderboard(chall_object, parti_object, leaderboardList) {
    let point = chall_object.point;

    if (!leaderboardList.find((val) => val.username == parti_object.username)) {
      const data = {
        username: parti_object.username,
        point: point,
      };
      leaderboardList.push(data);
    } else {
      for (var i in leaderboardList) {
        if (leaderboardList[i].username == parti_object.username) {
          leaderboardList[i].point += point;
          break;
        }
      }
    }
  }

  #resultSubmision(parti_object, chall_object, flag, result) {
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
