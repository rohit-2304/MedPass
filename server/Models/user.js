const mongoose = require ('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    username:{type:String,required:true,unique:true},
    password:{type:String,required:true},
});

UserSchema.pre('save', async function (next) { 
    const user = this;
    if (user.isModified('password') || user.isNew) {
        const hash = await bcrypt.hash(user.password, 10);
        user.password = hash;
    }
    next();})

UserSchema.methods.isValidPassword = async function (password){
        return await bcrypt.compare(password,this.password);
}

module.exports = mongoose.model('User',UserSchema);

