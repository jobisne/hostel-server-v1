const gql = require("graphql-tag");

module.exports = gql`
  type Hostel {
    id: ID!
    hostelName: String!
    hostelMaster: String!
    hostelImage: String!
    hostelDesc: String!
    yearEstablish: String!
  }

  type Student {
    id: ID!
    childname: String!
    klass: String!
    age: String!
    sin: String!
    gender: String!
    state: String!
    childstatus: String!
    healthstatus: String!
    hostelName: String!
    quranStatus: String!
    image: String!
    relationshipone: String!
    fname: String!
    foccupation: String!
    fphone: String!
    faddress: String!
    relationshiptwo: String!
    sname: String!
    soccupation: String!
    sphone: String!
    saddress: String!
    iname: String!
    iphone: String!
    createdAt: String!
  }

  type User {
    id: ID!
    masterName: String!
    hostelName: String!
    token: String!
    createdAt: String!
  }

  type Aetam  {
    countAetam: String!
     }

type NonAetam{
  countNonAetam: Int!
}

  type Query {
    getHostels: [Hostel]
    getHostel(postId: ID!): Hostel
    getStudents(postId: ID!): [Student]
    getStudent(postId: ID!): Student
    getAetam(postAetam: String!, nameHostel: String!): Aetam
    getNonAetam(postNonAetam: String, nameHostel: String): NonAetam
  }



  input HostelInput {
    hostelName: String!
    hostelMaster: String!
    hostelImage: Upload!
    hostelDesc: String!
    yearEstablish: String!
  }

  input RegisterInput {
    masterName: String!
    hostelName: String!
    password: String!
    confirmPassword: String!
  }

  input StudentInput {
    childname: String!
    klass: String!
    age: String!
    sin: String!
    gender: String!
    state: String!
    childstatus: String!
    healthstatus: String!
    hostelName: String!
    quranStatus: String!
    image: Upload!
    relationshipone: String!
    fname: String!
    foccupation: String!
    fphone: String!
    faddress: String!
    relationshiptwo: String!
    sname: String!
    soccupation: String!
    sphone: String!
    saddress: String!
    iname: String!
    iphone: String!
  }

  input EditStudentInput {
    postId: String!
    childname: String!
    klass: String!
    age: String!
    sin: String!
    gender: String!
    state: String!
    childstatus: String!
    healthstatus: String!
    hostelName: String!
    quranStatus: String!
    relationshipone: String!
    fname: String!
    foccupation: String!
    fphone: String!
    faddress: String!
    relationshiptwo: String!
    sname: String!
    soccupation: String!
    sphone: String!
    saddress: String!
    iname: String!
    iphone: String!
  }

  type Mutation {
    hostelReg(hostelInput: HostelInput): Hostel!
    register(registerInput: RegisterInput): User!
    login(hostelName: String!, password: String!): User!
    student(studentInput: StudentInput): Student!
    deleteStudent(postId: ID!): String!
    editStudent(editStudentInput: EditStudentInput): Student!
    searchStudent(searchInput: String!): Student!
  }
`;
