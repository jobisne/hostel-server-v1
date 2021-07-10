const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { UserInputError } = require("apollo-server");
const { SECRET_KEY } = require("../../config");
const { validateRegisterInput, validateLoginInput } = require('../../utils/validators')

function generateToken(res){
  return jwt.sign( {
      id: res.id,
      masterName: res.masterName,
      hostelName: res.hostelName,
    },
    SECRET_KEY,
    { expiresIn: "1h" })
  
}

module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { masterName, hostelName, confirmPassword, password } },
      context,
      info
    ) {
      //TODO: validate user

      const { valid, errors } = validateRegisterInput(masterName, hostelName, confirmPassword, password)
      if(!valid){
        throw new UserInputError('Errors', {
          errors
        })
      }
      //TODO: create hash password
       password = await bcrypt.hash(password, 12);

      // TODO: check if user exist
      const user = await User.findOne({ hostelName });
      if (user) {
        throw new UserInputError("Hostel name is taken", {
          error: {
            hostelname: "The hostel name  is taken",
          },
        });
      }
      hostelName = hostelName.toLowerCase();
      // const hostelName = hostelName.toLowerCase();
      //TODO: save user
      const newUser = new User({
        masterName,
        hostelName,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();
      console.log(res);
      //TODO: generate token
      const token = generateToken(res)
      //TODO: return doc
      return {
        ...res._doc,
        id: res._id,
        token,
      };
    },

    async login(parent, { hostelName, password }, context, info){

      const{ valid, errors } = validateLoginInput(hostelName, password);
      if(!valid){
        throw new UserInputError('Errors', { errors })
      }

      const user  = await User.findOne({ hostelName})
      if(!user){
        errors.generals = 'User not found'
        throw new UserInputError('User not found', { errors })
      }

      const match = await bcrypt.compare(password, user.password);
      if(!match){
        errors.generals = 'Wrong credentials'
        throw new UserInputError('Wrong credentials', { errors});
      }

      const token = generateToken(user);

      return{
        ...user._doc,
        id: user._id,
        token
      }


    }
  },
};
