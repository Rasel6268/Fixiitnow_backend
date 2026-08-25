import app from "./app"
import config from "./config";
import { prisma } from "./lib/prisma"

async function main() {
    const PORT = config.port
   try {
    // await prisma.$connect()
    console.log("connected data base successfull");
    app.listen(PORT,()=>{
        console.log(`Server is running in port ${PORT}`)
    })
   } catch (error) {
    console.error(error);
    // await prisma.$disconnect()
   } 
}

main()