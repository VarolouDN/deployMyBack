const express = require("express");
const mongoose=require('mongoose')
const config=require('config')
const authRouter=require("./routes/auth.routes")
const articleRouter=require("./routes/article.routes")
const userRouter=require("./routes/user.roures")
const cors=require('cors')
const app=express()
const corsParams={
    origin:["https://deploy-my-project-frontend-qxoq.vercel.app/"],
    methods:["GET","POST","OPTIONS"],
    credentials:true
}
//app.use(cors(corsParams))
const PORT=process.env.Port || config.get('SERVER_PORT')

app.use(express.json());
app.use("/api/auth",cors(corsParams),authRouter);
app.use("/api/article",cors(corsParams),articleRouter);
app.use("/api/user",cors(corsParams),userRouter);




const start=()=>{

    try{
        mongoose.connect(config.get("DB_URL"))
        app.listen(PORT,()=>{
            console.log(`Server works on PORT:${PORT} `)
        })
    }
    catch(e){
        console.log(e.message)
    }
}

start()