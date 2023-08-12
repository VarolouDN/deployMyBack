const mongoose=require("mongoose")
/*const Schema = mongoose.Schema,*/



const Article = new mongoose.Schema(
    {


        title:{type:String,require:true},
        userId:{type:mongoose.Schema.Types.ObjectId,ref:"User",require:true},
        name:{type:String,require:true},
        text:{type:String,require: true},


    }
);





module.exports= mongoose.model("Article",Article)