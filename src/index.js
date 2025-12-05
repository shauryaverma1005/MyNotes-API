import dotenv from "dotenv";
import { app } from "./app.js";
import { connectDB } from "./config/db.js";

dotenv.config();

connectDB()
.then(()=> {
    const PORT = process.env.PORT || 3000;
    app.listen(PORT, ()=> {
        console.log(`App Running on port: ${PORT}`);
    });
})
.catch((error)=>{
    console.log(`Error connecting MongoDB`);
    console.log(`ERR: ${error.message}`);
    process.exit(1);
})

