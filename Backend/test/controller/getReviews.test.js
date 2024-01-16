// Import the necessary modules and dependencies
import ReviewsController from '../../controllers/review.controller.js'; // Adjust the path as needed
import ReviewsModels from '../../models/review.models.js'; // Adjust the path as needed

// Mock the ReviewsModels module
jest.mock('../../models/review.models.js', () => ({
    getReviews: jest.fn(),
    status: jest.fn().mockReturnThis(),
  }));
  
  // Sample Express req and res objects
  const req = {
    body: {
      movieId: '123',
      user: 'testuser',
      review: 'A great movie!',
      _id: "12345"
    },
  };
  
  const res = {
    json: jest.fn(),
    status: jest.fn().mockReturnThis(),
  };

  describe('ReviewsController', () => {
    describe('apiGetReview', () => {
      afterEach(() => {
        // Clear mock calls after each test
        jest.clearAllMocks();
      });

        it('should handle successful review getting', async () => {
            // Mock successful review getting
            ReviewsModels.getReviews(req.body._id).mockResolvedValueOnce({
            insertedCount: 1,
            ops: [{
                movieId: '123',
                user: 'testuser',
                review: 'A great movie!',
                _id: "12345"
            }],
            });
        
            await ReviewsController.apiGetReview(req, res);         

        // Perform assertions
        expect(res.json).toHaveBeenCalledWith({status: 'success'});
        expect(res.status).not.toHaveBeenCalled();
    });
        it('should handle error during review getting', async () => {
            // Mock error during review getting
            const errorMessage = 'Some error occurred';
            ReviewsModels.getReviews.mockRejectedValueOnce(new Error(errorMessage));
        
            await ReviewsController.apiGetReview(req, res);
        
            // Perform assertions
            expect(res.status).toHaveBeenCalledWith(500);
            expect(res.json).toHaveBeenCalledWith({ error: errorMessage });
        });
    });
});


  