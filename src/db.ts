import mongoose, {model,Schema } from "mongoose";

mongoose.connect("mongodb+srv://Neha:Neha9110@cluster0.26fif1j.mongodb.net/brainly")
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
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}
})
export const userModel=model('User',userSchema)
export const contentModel=model('Content',contentSchema)
export const TagModel=model('Tag',tagSchema)
export const linkModel=model('Link',linkSchema)