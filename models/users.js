const mongoose=require('mongoose')

const Schema= mongoose.Schema

const UserSchema= new Schema({
	_id: mongoose.Schema.Types.ObjectId,
	first_name: { type: String, required: true, max: 100 },
    family_name: { type: String, required: true, max: 100 },
    email:{type:String,required:true,unique: true,match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/},
    password: {type:String, required:true }
})

// Virtual for author's full name
UserSchema
  .virtual('name')
  .get(function () {
    return this.family_name + ', ' + this.first_name
  })


module.exports = mongoose.model('User', UserSchema)
