const mongoose = require("mongoose");
const {DateTime} = require('luxon')

const Schema = mongoose.Schema;

const MessageSchema = new Schema({
    title: {type:String, required:true, maxLength: 100},
    timestamp:{type:String, default:DateTime.now().toLocaleString(DateTime.DATETIME_MED_WITH_WEEKDAY)},
    message:{type:String, maxLength: 1000},
    author:{type:Schema.Types.ObjectId, ref: "User"}
});
//virtual functions
MessageSchema.virtual("url").get(function () {
    return `/messages/${this._id}`;
})


module.exports = mongoose.model("Message", MessageSchema);