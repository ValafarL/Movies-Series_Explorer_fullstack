const mongoose = require('mongoose')

const MediaSchema = new mongoose.Schema({
    media_TMDB_ID:{
        type: Number,
        required:true,
    },
    typeMovieOrTv: {
        type: String,
        enum: ['movie', 'tv'],
        required: true,  
    },
    isAddToFavorites: {
        type: Boolean,
        required: true,  
    },
    isAddToMyList: {
        type: Boolean,
        required: true,  
    },
    createdBy:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:[true, 'Please provide user']
    }
}, {timestamps:true})

module.exports = mongoose.model('Media', MediaSchema)