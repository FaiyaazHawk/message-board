const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    first_name: {type: String, required:true, maxLength: 100},
    last_name: {type: String, required:true, maxLength: 100},
    email: {type: String, required:true, maxLength: 100},
    password: {type:String, required:true, maxLength: 100},
    member: {type: Boolean, default: false},
    admin: {type: Boolean, default: false},
    messages: [{type: Schema.Types.ObjectId, ref: 'Message'}]
});
//virtual functions
UserSchema.virtual("url").get(function () {
    return `/users/${this._id}`;
})

UserSchema.virtual("full_name").get(function () {
    return `${this.first_name} ${this.last_name}`
})

module.exports = mongoose.model("User", UserSchema);