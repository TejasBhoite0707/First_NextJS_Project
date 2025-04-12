import mongoose from "mongoose";

type ConnectionObject={

    isConnected?:Number,
}

const connection:ConnectionObject={}

async function dbConnect():Promise<void>{
    if(connection.isConnected){
        console.log("Already Connected to database");
        return;
    }
    try {
      const db=  await mongoose.connect(process.env.MONGO_DB_URI || '',{});
        connection.isConnected=db.connections[0].readyState;
        console.log("DB Connection SuccessFully");
        
        
    } catch (err) {
        console.log("Database Connection Failed",err);
        process.exit(1);
    }
}

export default dbConnect;   