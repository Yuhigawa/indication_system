import db from '../config/database';

const userSchema = new db.Schema({
    _id: {
        type: Number,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true
    },
    link: {
        type: String,
        unique: true
    },
    indications: {
        type: Number,
        default: 0
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
}, { _id: false })

export default db.model('User', userSchema);