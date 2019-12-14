const mongoose=require('mongoose')
const Schema= mongoose.Schema

const UserMovieListSchema= new Schema({
	user_id: { type: Schema.Types.ObjectId, ref: 'User', required: true },
	movie_id: { type: Number, required: true},
	imdb_id: {type: String, required: true },
	watch_status: {type: String, enum:["watching", "completed", "on-hold", "dropped", "plan-to-watch"] } ,
	user_rating: {type: Number, min:1, max:10 } 
})

module.exports = mongoose.model('UserMovieList', UserMovieListSchema)
