const fs = require("fs");
const path = require("path");
const { UserInputError} = require("apollo-server");
const Student = require("../../models/Student");
const {
  generateRandomString,
  validateStudentInput,
} = require("../../utils/validators");
const checkAuth = require("../../utils/check-auth");

module.exports = {
  Query: {
    async getStudents(_, { postId }) {
      try {
        const students = await Student.find({ hostelName: postId });
        return students;

      } catch (err) {
        throw new Error(err);
      }
    },
    async getStudent(_, { postId }) {
      try {
        const student = await Student.findById(postId);
        if (student) {
          return student;
        } else {
          throw new Error("Student not found");
        }
      } catch (err) {
        throw new Error(err);
      }
    },
    async getAetam(_, { postAetam, nameHostel }) {
      try {
        const aetam = await Student.find({
          childstatus: postAetam,
          hostelName: nameHostel,
        }).countDocuments();
        // console.log(aetam);
        return { countAetam: aetam };
      } catch (err) {
        throw new Error(err);
      }
    },

    async getNonAetam(_, { postNonAetam, nameHostel }) {
      try {
        const nonAetam = await Student.find({
          childstatus: postNonAetam,
          hostelName: nameHostel,
        }).countDocuments();
        return { countNonAetam: nonAetam };
      } catch (err) {
        throw new Error(err);
      }
    },
  },

  Mutation: {
    student: async (
      parent,
      {
        studentInput: {
          childname,
          klass,
          age,
          sin,
          gender,
          state,
          childstatus,
          healthstatus,
          hostelName,
          quranStatus,
          image,
          relationshipone,
          fname,
          foccupation,
          fphone,
          faddress,
          relationshiptwo,
          sname,
          soccupation,
          sphone,
          saddress,
          iname,
          iphone,
        },
      },
      context,
      info
    ) => {
      const { valid, errors } = validateStudentInput(
        childname,
        klass,
        age,
        sin,
        gender,
        state,
        childstatus,
        healthstatus,
        hostelName,
        quranStatus,
        image,
        relationshipone,
        fname,
        foccupation,
        fphone,
        faddress,
        relationshiptwo,
        sname,
        soccupation,
        sphone,
        saddress,
        iname,
        iphone
      );
      if (!valid) {
        throw new UserInputError("Errors", {
          errors,
        });
      }

      const { createReadStream, filename, mimeType, encoding } = await image;

      const { ext } = path.parse(filename);
      const randomName = generateRandomString(12) + ext;

      const stream = createReadStream();
      const pathName = path.join(
        __dirname,
        `../../public/images/${randomName}`
      );
      await stream.pipe(fs.createWriteStream(pathName));

      console.log("i am here");

      const student = await Student.findOne({ sin });

      if (student) {
        throw new UserInputError("Student already exist", {
          errors: {
            hostel: "Student already exist",
          },
        });
      }
      console.log(`http://localhost:4000/images/${randomName}`);
      const newStudent = new Student({
        childname,
        klass,
        age,
        sin,
        gender,
        state,
        childstatus,
        healthstatus,
        hostelName,
        quranStatus,
        image: `http://localhost:4000/images/${randomName}`,
        relationshipone,
        fname,
        foccupation,
        fphone,
        faddress,
        relationshiptwo,
        sname,
        soccupation,
        sphone,
        saddress,
        iname,
        iphone,
        createdAt: new Date().toISOString(),
      });

      const res = await newStudent.save();

      return {
        ...res._doc,
        id: res._id,
      };
    },

    deleteStudent: async (_, { postId }, context) => {
      try {
        const removeStudent = await Student.findByIdAndDelete({ _id :postId, function(err, docs){
          if(err){
            console.log(err)
          } else {
            console.log('Delete :', docs)
          }
        }});
        if(removeStudent){
          return ' Record delete successfully'
        }
        
      } catch (err) {
        throw new Error(err);
      }
    },

    editStudent: async (
      _,
      {
        editStudentInput: {
          postId,
          childname,
          klass,
          age,
          sin,
          gender,
          state,
          childstatus,
          healthstatus,
          hostelName,
          quranStatus,
          relationshipone,
          fname,
          faddress,
          foccupation,
          fphone,
          relationshiptwo,
          sname,
          soccupation,
          saddress,
          sphone,
          iname,
          iphone
        },
      },
      context,
      info
    ) => {

      try {
        const student = await Student.findByIdAndUpdate({_id : postId}, {
          $set: {
            childname,
            klass,
            age,
            sin,
            gender,
            state,
            childstatus,
            healthstatus,
            hostelName,
            quranStatus,
            relationshipone,
            fname,
            foccupation,
            fphone,
            faddress,
            relationshiptwo,
            sname,
            soccupation,
            sphone,
            saddress,
            iname,
            iphone
          }
        }, { new : true})
        if(student) {
          return student
        } else {
          throw new Error("Record failed to update ")
        }
      } catch(err){
        throw new Error(err)
      }
      

      

    },

    searchStudent: async(_, { searchInput }) => {
      try{
        const search = await Student.findOne({'sin': searchInput});
        console.log(search)
        return search
      } catch(err) {
        throw new Error
      }
    }
  },
};
