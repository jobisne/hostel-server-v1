const fs = require('fs');
const path = require('path');
const Hostel = require('../../models/Hostel');
const { generateRandomString } = require('../../utils/validators');
const { UserInputError } = require('apollo-server');


module.exports = {

    Query: {
        async getHostels() {
            try {
                const hostel = await Hostel.find()
                // console.log(hostel)
                return hostel
            } catch (err) {
                throw new Error(err)
            }
        },
        async getHostel(_, { postId }){
            try {
                const hostel = await Hostel.findById( postId );
                if(hostel){
                    return hostel
                } else {
                    throw new Error('Hostel not found')
                }
            } catch (err) {
                throw new Error(err)
            }
        }

        },

    Mutation : {
        hostelReg:  async(parent, { hostelInput: { hostelName, hostelMaster, hostelImage, hostelDesc, yearEstablish } }) => {
      
              const { createReadStream, filename, mimeType, encoding } = await hostelImage;
      
              const { ext } = path.parse(filename);
              const randomName = generateRandomString(12) + ext
      
              const stream = createReadStream();
              const pathName = path.join(__dirname, `../../public/images/${randomName}`);
              await stream.pipe(fs.createWriteStream(pathName));
      
      
              const hostel = await Hostel.findOne({ hostelName });
      
              if(hostel){
                  throw new UserInputError('Hostel already taken', {
                      errors: {
                          hostel: 'Hostel already taken'
                      }
                  })
              }
            //   const newHostelName = hostelName.toLoweCase();
              console.log(`http://localhost:4000/images/${randomName}`)
              const newHostel = new Hostel({
                  hostelName,
                  hostelMaster,
                  hostelImage: `http://localhost:4000/images/${randomName}`,
                  hostelDesc,
                  yearEstablish,
                  createdAt: new Date().toISOString()
              });
      
              const res = await newHostel.save();
              
      
      
      
      
              return {
                  ...res._doc,
                  id:res._id
              }
          },
        },
}