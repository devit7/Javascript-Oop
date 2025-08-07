export default class Review{

    constructor({participantId,title,description,rating}){
        this.participantId = participantId;
        this.title = title;
        this.description = description;
        this.rating = this.validatetdRating(rating)
        this.date = new Date();
    }

    validatetdRating(rating){
        if(rating < 1 || rating > 10){
            throw new Error("Rating must be between 1 - 10")
        }
        return rating;
    }



}