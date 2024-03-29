import mongodb from 'mongodb';
const ObjectId = mongodb.ObjectId;

let reviews;

export default class ReviewsModels {
    static async injectDB(conn) {
        // console.log(conn);
        if (reviews) {
            return
        }
        try {
            reviews = await conn.db("reviews").collection("reviews")
            // console.log(reviews)
        } catch (e) {
            console.error(`Unable to establish collection handles in userDAO: ${e}`)
        }
    }
//add review
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
  //get review

  static async getReview(reviewId) {
      try {
        return await reviews.findOne({ _id: new ObjectId(reviewId) })
      } catch (e) {
        console.error(`Unable to get review: ${e}`)
        return { error: e }
      } 
    }

  //update review
  static async updateReview(reviewId, user, review) {
    try {
      const updateResponse = await reviews.updateOne(
        { _id: new ObjectId(reviewId) },
        { $set: {user: user, review: review } },
      )
  
      return updateResponse
    } catch (e) {
      console.error(`Unable to update review: ${e}`)
      return { error: e }
    }
  }
//delete review
  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await reviews.deleteOne({
        _id: new ObjectId(reviewId),
      })
  
      return deleteResponse
    } catch (e) {
      console.error(`Unable to delete review: ${e}`)
      return { error: e }
    }
  }

// get reviews by movie id

    static async getReviewsByMovieId(movieId) {
      try {
        const cursor = await reviews.find({ movieId: parseInt(movieId) })
        return cursor.toArray()
      } catch (e) {
        console.error(`Unable to get reviews: ${e}`)
        return { error: e }
      }

    }
}