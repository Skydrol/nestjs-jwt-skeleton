import * as mongoose from 'mongoose';

export const UserSchema = new mongoose.Schema({
  username: String,
  email: {
    type: String,
    unique: true,
    required: [true, "email required."],
  },
  password: String,
  roles: Array  
});