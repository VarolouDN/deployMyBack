const Router=require("express")
const Article=require("../models/Article.js")
const User=require("../models/User")
const{check,validationResult}=require("express-validator")
const router=new Router()
const mongoose=require('mongoose')
const ObjectId=require('mongoose').Types.ObjectId

router.post("/create",[
        check('title',"The title doesn't can be empty ").isLength({min:1}),
        check('text','The text must be longer then 200 symbols').isLength({min:20})
    ],
    async(req,res)=>{
        try{

            console.log(req.body)

            const errors =validationResult(req)
            if(!errors.isEmpty()){
                return res.status(400).json({message:'Incorrect request',errors})
            }

            const{title,userId,name,text} =req.body
//===============================================
 // В этом блоке не  могу сравнить userId с id в базе данных.Блок не работает
           /* if(!mongoose.Schema.Types.ObjectId.isValid(userId)){
                return res.status(400).send('incorrect id of article')
            }
             const possibleUserId= await User.findById(userId)
           // const possibleName= await User.findOne({name})
             console.log(possibleUserId)
            if(!possibleUserId){
                return  res.set("Access-Control-Allow-Origin", 'http://localhost:3000')
                    .status(400).json({message:`This user is not registered!!!`})
            }
            console.log(possibleUserId)*/
//========================================================
            const article= new Article({title,userId,name,text})

            await article.save()
            return res/*.set("Access-Control-Allow-Origin","*")*/.json({message:"Article was created"})
        }catch(e){
            res.send({message:"Server error"})
        }
    })

router.get("/articles",
    async(req,res)=>{
        try{
              const articles=await Article.find()

            return res/*.set("Access-Control-Allow-Origin","https://deploy-my-front.vercel.app/" )*/.
            json(articles)
        }catch(e){
            res.send({message:"Server error"})
        }
    })
//Блок снизу не рабочий .1.Непонятно как сравнивать id.2.Как передать id через постман.Блок 3
     router.get("/articles/:id",
       async(req,res)=>{
        try {

            const articleId = req.params.id
            console.log( req.params.id)
            if (!mongoose.Types.ObjectId.isValid(articleId)) {
              return   res.status(400).json({
                    message: 'given object id is not valid'
                })
            } else {


                const article = await Article.findById(articleId)
                if(!article){
                 return   res.status(404).json({message:"Article with this id doesn't exist"})
                }

                return res.set("Access-Control-Allow-Origin", "*").send(article)
            }
        }catch(e){
            res.send({message:"Server error"})
        }
    })
//Верхний блок не работает.Блок 3

module.exports=router