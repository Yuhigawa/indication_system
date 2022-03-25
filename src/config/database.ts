import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const uri = `mongodb+srv://yuhigawa:${process.env.DB_PASSWORD}@indication.zo8ia.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

( async() => {
    await mongoose.connect(uri)
                            .then( msg => {
                                console.log('[DB] Connection sucessfully');
                                mongoose.Promise = global.Promise;
                            } )
                            .catch( async (err) => {
                                console.log('[DB] Connection failed: ', err);
                                await mongoose.disconnect()
                            });
})();

export default mongoose;
