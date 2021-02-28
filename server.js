//importing
import express from "express"
import mongoose from "mongoose"
import Messages from "./dbMessages.js"
import Pusher from 'pusher'
// app config
const app = express()
const port = process.env.PORT || 9000



const pusher = new Pusher({
    appId: "1163445",
    key: "33a90d7918fe102f7049",
    secret: "c5c8c888cd25c8ebad1f",
    cluster: "eu",
    useTLS: true
  })

// middleware   
app.use(express.json())
app.use((req,res, next) => {
    res.setHeader("Access-Control-Allow-Origin","*");
    res.setHeader("Access-Control-Allow-Headers","*");
    next();
});

//db
const connection_url = "mongodb+srv://admin:sjDTnmcq63xYnNF@cluster0.pbji3.mongodb.net/onlineChatbd?retryWrites=true&w=majority"
const db = mongoose.connection
mongoose.connect(connection_url,{
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
})

db.once("open",()=>{
    console.log("DB connected")
    const msgcollection = db.collection("messagecontents");
    const changeStream = msgcollection.watch()

    changeStream.on('change',(change)=>{
        console.log(change)

        if(change.operationType === "insert") {
            const messageDetails = change.fullDocument;
            pusher.trigger('messages','inserted',
            {
              name: messageDetails.name,
              message: messageDetails.message,
              timestamp: messageDetails.timestamp,
              received: messageDetails.received  
            })
        } else {
            console.log("Pusher Error")
        }

    })
})





//api routes
app.get("/", (req,res)=>res.status(200).send("hello world"))

app.post("/api/messages/new",(req,res)=>{
    const dbMessage = req.body

    Messages.create(dbMessage,(err, data) => {
        if (err){
            res.status(500).send(err)
        } else {
            res.status(201).send(`new message created: \n ${data}`)
        }
    })
})

app.get('/message/sync', (req,res) => {
    Messages.find((err,data)=>{
        if (err){
            res.status(500).send(err)
        } else {
            res.status(200).send(data)
        }  
    })
})



//listen
app.listen(port, ()=>console.log(`listening to localhost ${port}`))