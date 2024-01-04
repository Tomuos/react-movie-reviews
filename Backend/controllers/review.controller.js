import ReviewsModels from "../models/review.models.js";

export default class ReviewsController {
    static async apiPostReview(req, res, next) {
        try {
          const movieId = parseInt(req.body.movieId)
          const review = req.body.review
          const user = req.body.user
          console.log('movieid', movieId)
          const reviewResponse = await ReviewsModels.addReview(
            movieId,
            user,
            review
          )
          res.json({ status: "success" })
        } catch (e) {
          res.status(500).json({ error: e.message })
        }
      }  
}

