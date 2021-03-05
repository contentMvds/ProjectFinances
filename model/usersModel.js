import { Schema, model } from 'mongoose';

const users = model(
  'users',
  new Schema({
    login: { type: String, required: [true, 'Need your login'] },
    password: { type: String, required: [true, 'Need your password'] },
    dateInsert: { type: Date, default: Date.now() },
  }),
);

export default users;
