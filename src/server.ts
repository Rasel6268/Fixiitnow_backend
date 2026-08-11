import app from "./app"

async function main() {
    const PORT = 5000
   try {
    app.listen(PORT,()=>{
        console.log("Server port is 5000")
    })
   } catch (error) {
    console.error(error);
   } 
}

main()