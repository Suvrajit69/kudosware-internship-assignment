import mongoose, { Document, Model, Schema } from "mongoose";

interface IUser extends Document {
  name: string;
  email: string;
  phone: number;
  resume: string;
}

const UserSchema: Schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: Number,
    required: true,
    unique: true,
    validate: {
      validator: function (v: number) {
        // Ensure that the phone number is exactly 10 digits
        return /^\d{10}$/.test(v.toString());
      },
      message: (props: { value: number }) =>
        `${props.value} is not a valid 10-digit phone number!`,
    },
  },
  resume: {
    type: String,
    required: true,
  },
});

const User: Model<IUser> =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);

export default User;
