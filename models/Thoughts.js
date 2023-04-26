const { Schema, model } = require("mongoose");
const { type } = require("os");
const dateFormat = require("../utils/dateFormat");
const reactionSchema = require("./Reactions");
const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: "Thought is required",
            minlength: 1,
            maxlength: 280,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: timestamp => dateFormat(timestamp),
    },
    username: {
        type: String,
        required: true,
    },
    reactions: [
        reactionSchema,
    ]
},
{
    toJSON: {getters: true},
    id: false,
});

thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
});

const Thoughts = model("Thoughts", thoughtSchema);
model.exports = Thoughts;