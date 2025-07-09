/* eslint-disable no-console */
import {Server} from "http";
import mongoose from "mongoose"
import app from "./app";
import {envVars} from "./app/config/env"


let server: Server
const startServer=async()=>{
    try {
        console.log(envVars.NODE_ENV)
        await mongoose.connect(envVars.DB_URL)
// console.log("Connectd to db")
server=app.listen(envVars.PORT, ()=>{
    console.log(`Server is listing port ${envVars.PORT}`)
})
    }
    catch(error){
        console.log(error)
    }
    
}
startServer()
// process.on("unhandledRejection",(err)=>{
//     console.log("Unhadled rejecteion server is shutting down", err)
//     if(server){
//         server.close(()=>{
//              process.exit(1)
//         })
       
//     }
//     process.exit(1)

// })
// //unhandledRejection
// // Promise.reject(new Error("I forgor to catch this primuse"))


// process.on("uncaughtException",(err)=>{
//     console.log("uncaght", err)
//     if(server){
//         server.close(()=>{
//             process.exit(1)
//         })
//     }
//     process.exit(1)
// })
// //uncaughtException
// throw new Error("I forgot to this local error")
process.on("SIGTERM",(err)=>{
    console.log("SIGTERM", err)
    if(server){
        server.close(()=>{
            process.exit(1)
        })
    }
    process.exit(1)
})

// process.on("SIGINT",(err)=>{
//     console.log("SIGINT", err)
//     if(server){
//         server.close(()=>{
//             process.exit(1)
//         })
//     }
//     process.exit(1)
// })