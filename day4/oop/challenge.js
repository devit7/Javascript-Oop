export default class Challenge {
  #flag;
  reviewList = [];

  constructor({ id, title, description, flag, point, author }) {
    this.id = id;
    this.title = title;
    this.description = description;
    this.#flag = flag;
    this.point = point;
    this.author = author;
  }

  checkFlag(inputFlag) {
    return this.#flag === inputFlag;
  }

  getReview(){
    return {challId:this.id,list_review:this.reviewList};
  }

  getData() {
    return {
      id: this.id,
      title: this.title,
      description: this.description,
      point: this.point,
      author: this.author,
    };
  }
}
