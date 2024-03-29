import express from "express";
import ReviewsController from "../controllers/review.controller.js"

const router = express.Router();

router.route("/").get((req, res) => res.send("Hello world!"));

router.route("/movie/:id").get(ReviewsController.apigetReviewsByMovieId);
router.route("/new").post(ReviewsController.apiPostReview);
router.route("/:id")
    .get(ReviewsController.apiGetReview) 
    .put(ReviewsController.apiUpdateReview)  
    .delete(ReviewsController.apiDeleteReview)

export default router;