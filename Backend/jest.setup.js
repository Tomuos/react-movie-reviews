// jest.setup.js
import { MongoMemoryServer } from 'mongodb-memory-server';
import dotenv from "dotenv";
dotenv.config();

// Set up and start the MongoDB Memory Server before your tests
const mongoMemoryServer = new MongoMemoryServer({});

beforeAll(async () => {
  const mongoUri = await mongoMemoryServer.getUri();
  process.env.MONGO_URI = mongoUri; // Set the MongoDB URI in the environment variables
});

afterAll(async () => {
  await mongoMemoryServer.stop(); // Stop the MongoDB Memory Server after your tests
});