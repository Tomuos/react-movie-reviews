import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsModels {
    static async injectDB(conn) {
        console.log(conn);
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db("reviews").collection("reviews")
            console.log(reviews)
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }

    static async addReview(movieId, user, review) {
        try {
          const reviewDoc = {
            movieId: movieId,
            user: user,
            review: review,
          }
          console.log("adding")
          console.log(reviewDoc)
          return await reviews.insertOne(reviewDoc)
        } catch (e) {
          console.error(`Unable to post review: ${e}`)
          return { error: e }
        }
      }
    
}
