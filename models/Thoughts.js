const { Schema, model } = require('mongoose');
// reaction schema?
// date format util function?

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 280,
        },
        createdAt: {
            type: Date,
            default: Date.now,
            // get method for timestamp.
        },
        username: {
            type: String,
            required: true,
        },
        // reactionSchema, Array of nested documents created 
    },
    {
        toJSON: {
            getters: true,
        },
        id: false,
    },
);

thoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);

module.exports = Thought;