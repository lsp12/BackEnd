import mongoose, { ConnectOptions } from "mongoose";

const MONGO_URI= process.env.MONGO_URI || "mongodb://localhost/socialNetworkAPI";

export const socialNetworkAPI = async ()=>{
    try {
        const mongoOption: ConnectOptions = {
            useUnifiedTopology: true,
            useNewUrlParser: true,
            useFindAndModify: false,
        }

        const connectio = await mongoose.connect(MONGO_URI, mongoOption);
        console.log("Connected to database");
    } catch (error) {
        console.log("Error connecting to database",error);
    }
}
