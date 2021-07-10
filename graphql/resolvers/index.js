const usersResolvers  = require('./users');
const hostelRegResolvers = require('./hostelReg');
const studentResolvers = require('./student');


module.exports  = {
  
    Query: {
        ...hostelRegResolvers.Query,
        ...studentResolvers.Query
    },

    Mutation: {
        ...hostelRegResolvers.Mutation,
        ...usersResolvers.Mutation,
        ...studentResolvers.Mutation
    }
}