const { Schema, model } = require("mongoose");
const { type } = require("os");
const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: "Username is required",
            trim: true,
    },
    email: {
    type: String,
    required: "Email is required",
    unique: true,
    match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
    }],
    friends: [{
        type: Schema.Types.ObjectId,
        ref: "User",
    }],
},
{
    toJSON: {
        virtuals: true,
    },
    id: false,
});

userSchema.virtual("friendCount").get(function () {
    return this.friends.length;
});

const User = model("User", userSchema);
model.exports = User;