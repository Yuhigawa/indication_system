import db from '../config/database';

const ipSchema = new db.Schema({
    ip: {
        type: String,
        required: true,
        unique: true
    }
});

export default db.model('IpAdress', ipSchema);