// const {MongoClient} = require('mongodb');
import mongodb from "mongodb";
import dotenv from "dotenv";
dotenv.config();

const MongoClient = mongodb.MongoClient;

describe('insert', () => {
  let connection;
  let db;

  beforeAll(async () => {
    connection = await MongoClient.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    db = await connection.db("reviews");
  });

  afterAll(async () => {
    await connection.close();
  });

  it('should insert a doc into collection', async () => {
    const reviews = db.collection('reviews');

    const mockReview = {movieId: '12544', user: 'John', review: 'Great film!'};
    await reviews.insertOne(mockUser);

    const insertedReview = await reviews.findOne({_id: new ObjectId(mockReview._id)});
    expect(insertedReview).toEqual(mockReview);
  });
});

