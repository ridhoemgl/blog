const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: 'User' },
    title:{
        type: String
    },
    description:{
        type: String
    }
},{
    timestamps: true
})

const Article = mongoose.model('Article', articleSchema);

module.exports = Article