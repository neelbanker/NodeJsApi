import userSchema from '../user/models/user'
import bcrypt from 'bcrypt'

module.exports.isAdmin = async (req, res, next) => {
  const user = await userSchema.findOne({email: req.body.email});
  if (!user) return res.status(400).send('Invalid email.');
    
  const found_password = await bcrypt.compare(req.body.password, user.password_dec);
  if (!found_password) return res.status(400).send('Invalid email or password.');
  console.log('verified...............')
  if (user.admin === false){
    return res.status(403).send('only admin can have access.!!!!');
  }else{
    next();
  }
}
