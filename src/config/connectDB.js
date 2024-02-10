import { connect } from "mongoose";

const connectDB = async () => {
    try {
        await connect("mongodb+srv://loriensdesign:laureano@cluster0.jhxk024.mongodb.net/ecommerce?retryWrites=true&w=majority")/
        //await connect("mongodb://localhost:27017/ecommerce")
        console.log("Mongo Connected")
    } catch (error) {
        console.log(error)
    }
}

export default connectDB 