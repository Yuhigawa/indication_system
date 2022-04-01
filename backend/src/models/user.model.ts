import db from '../config/database';

const userSchema = new db.Schema({
    user_id: {
        type: Number,
        required: true,
        unique: true
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
});

export default db.model('User', userSchema);