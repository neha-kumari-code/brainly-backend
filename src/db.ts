import mongoose, {model,Schema } from "mongoose";
import dotenv from "dotenv"
dotenv.config()
mongoose.connect(`${process.env.MONGODB_URL}/brainly`)
const userSchema=new Schema({
    username:{type:String,unique:true},
    password:{type:String,required:true}
})
const contentSchema=new Schema({
    title:String,
    link:String,
    tags:[{type:mongoose.Types.ObjectId,ref:'Tag'}],
    userId:[{type:mongoose.Types.ObjectId,ref:'User'}]
})
const tagSchema=new Schema({
    title:{type:String,required:true,unique:true}
})
const linkSchema=new Schema({
    hash:{type:String,required:true},
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,unique:true}
})
export const userModel=model('User',userSchema)
export const contentModel=model('Content',contentSchema)
export const TagModel=model('Tag',tagSchema)
export const linkModel=model('Link',linkSchema)