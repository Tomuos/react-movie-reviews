// // Import the necessary modules and dependencies
// import ReviewsController from '../controllers/review.controller.js'; // Adjust the path as needed
// import ReviewsModels from '../models/review.models.js'; // Adjust the path as needed

// // Mock the ReviewsModels module
// jest.mock('../models/review.models.js', () => ({
//   addReview: jest.fn(),
// }));

// // Sample Express req and res objects
// const req = {
//   body: {
//     movieId: '123',
//     user: 'testuser',
//     review: 'A great movie!',
//   },
// };

// const res = {
//   json: jest.fn(),
//   status: jest.fn().mockReturnThis(),
// };

// describe('ReviewsController', () => {
//   describe('apiPostReview', () => {
//     afterEach(() => {
//       // Clear mock calls after each test
//       jest.clearAllMocks();
//     });

//     it('should handle successful review posting', async () => {
//       // Mock successful review posting
//       ReviewsModels.addReview.mockResolvedValueOnce({
//         insertedCount: 1,
//         ops: [{
//           movieId: '123',
//           user: 'testuser',
//           review: 'A great movie!',
//         }],
//       });

//       await ReviewsController.apiPostReview(req, res);

//       // Perform assertions
//       expect(res.json).toHaveBeenCalledWith({ status: 'success' });
//       expect(res.status).not.toHaveBeenCalled();
//     });

//     it('should handle error during review posting', async () => {
//       // Mock error during review posting
//       const errorMessage = 'Some error occurred';
//       ReviewsModels.addReview.mockRejectedValueOnce(new Error(errorMessage));

//       await ReviewsController.apiPostReview(req, res);

//       // Perform assertions
//       expect(res.status).toHaveBeenCalledWith(500);
//       expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
//     });
//   });
// });