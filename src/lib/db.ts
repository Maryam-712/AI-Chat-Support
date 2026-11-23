import { connect } from "mongoose";

const mongourl= process.env.MONGOURL;

if(!mongourl){
    throw new Error("MONGOURL is not found");
}

let cache = global.mongoose;
if(!cache){
    cache = global.mongoose = {conn: null, promise:null}
}

const connectDB = async() => {
    if(cache.conn){
        return cache.conn;
    }

    if(!cache.promise){
        cache.promise = connect(mongourl).then((c)=>c.connection)
    }

    try{
        cache.conn =await cache.promise;
    } catch(error){
        console.log(error)
    }

    return cache.conn;
}

export default connectDB;