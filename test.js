const { ApolloServer, gql } = require('apollo-server-express');
const express = require('express');
const cors = require('cors');
const fs = require('fs');
const path = require('path');
const mongoose = require('mongoose');
const { MONGODB } = require('./config');




mongoose.connect(MONGODB, {useNewUrlParser: true, useUnifiedTopology: true});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  console.log(`Database connected ${MONGODB}`);
});


function generateRandomString(length) {
    var result           = [];
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result.push(characters.charAt(Math.floor(Math.random() * 
 charactersLength)));
   }
   return result.join('');
}



const typeDefs = gql`
  type File {
    url: String!
  }

  type Hostel{
      id: ID!,
      hostelName: String!,
      hostelMaster: String!
      hostelImage: String!
      hostelNo: Int
  }

  type Query {
    hello: String!
  }

  type Mutation {
    uploadFile(file: Upload!): File!
  }

  input HostelInput{
    hostelName: String!,
    hostelMaster: String!
    hostelImage: Upload!
    hostelNo: Int
  }

  type Mutation {
      hostelReg(hostelInput: HostelInput):Hostel!
  }
`;

const resolvers = {
  Query: {
    hello: () => 'hello world',
  },
  Mutation: {
    uploadFile: async (parent, { file }) => {
        const { createReadStream, filename, mimeType, encoding } =await file;

        const { ext } = path.parse(filename);
        const randomName = generateRandomString(12) + ext

        const stream = createReadStream();
        const pathName = path.join(__dirname, `/public/images/${randomName}`);
        await stream.pipe(fs.createWriteStream(pathName));

        return {
            url: `http://localhost:4000/images/${randomName}`
        }
    },
  },
};



const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const app = express();

server.applyMiddleware({ app })

app.use(express.static('public'));

app.use(cors());

app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000`);
})

//wdwddwddw

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



<div className=''>
<h1>AL-IHSAN HOSTEL</h1>
  {hostels && hostels.map((hostel) => <Cards hostel={hostel} />)}
  </div>