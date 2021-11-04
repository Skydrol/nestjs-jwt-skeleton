import * as mongoose from 'mongoose';
import { Role } from 'src/auth/enums/role.enum';

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