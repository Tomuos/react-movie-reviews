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
      
      static async apiGetReview(req, res, next) {
        try {
          let id = req.params.id || {}
          let review = await ReviewsModels.getReviews(id)
          if (!review) {
            res.status(404).json({ error: "Not found" })
            return
          }
          res.json(review)
        } catch (e) {
          console.log(`api, ${e}`)
          res.status(500).json({ error: e })
        }
      }

}

