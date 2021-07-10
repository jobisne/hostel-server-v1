module.exports.generateRandomString = (length) => {
  var result = [];
  var characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result.push(
      characters.charAt(Math.floor(Math.random() * charactersLength))
    );
  }
  return result.join("");
};

module.exports.validateRegisterInput = (
  masterName,
  hostelName,
  confirmPassword,
  password
) => {
  const errors = {};

  if (masterName.trim() === "") {
    errors.masterName = "Name must not be empty";
  }
  if (hostelName.trim().toLowerCase() === "") {
    errors.hostelName = "Hostel name must not be empty";
  }

  if (password === "") {
    errors.password = "This field must not be empty";
  } else if (password !== confirmPassword) {
    errors.password = "Password must match";
  }
  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

module.exports.validateLoginInput = (hostelName, password) => {
  const errors = {};

  if (hostelName.trim().toLowerCase() === "") {
    errors.username = " Username must not be empty";
  }

  if (password === "") {
    errors.password = "Password must not be empty";
  } 

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};


module.exports.validateStudentInput = (childname, klass, age, sin, gender, state, childstatus, healthstatus, hostelName, quranStatus, image, relationshipone, fname, foccupation, fphone, faddress, relationshiptwo, sname, soccupation, sphone, saddress, iname, iphone)=>  {
  
  const errors = {};
  
  if (childname.trim() === "") {
    errors.childname = "Enter the value for  name";
  }
  if (klass.trim() === "") {
    errors.klass = "Enter the value for class";
  }
  if (age.trim() === "") {
    errors.age = "Enter the value for age";
  }
  if (sin.trim() === "") {
    errors.sin = "Enter the value for student identification number";
  }
  if (gender.trim() === "") {
    errors.gender = "Enter the value for gender";
  }
  if (state.trim() === "") {
    errors.state = "Enter the value for state";
  }
  if (childstatus.trim() === "") {
    errors.childstatus = "Enter the value for child status";
  }
  if (healthstatus.trim() === "") {
    errors.healthstatus = "Enter the value for health status";
  }
  if(quranStatus.trim() === ""){
    errors.quranStatus = "Enter the value for quran status";
  }
  if (hostelName.trim() === "") {
    errors.hostelName = "Enter the value for hostel name";
  }

  if (relationshipone.trim() === "") {
    errors.relationshipone = "Enter the value for relationship";
  }
  if (fname.trim() === "") {
    errors.fname = "Enter the value for name";
  }
  if (foccupation.trim() === "") {
    errors.foccupation = "Enter the value for occupation";
  }
  if (fphone.trim() === "") {
    errors.fphone = "Enter the value for phone";
  }
  if (faddress.trim() === "") {
    errors.faddress = "Enter the value for address";
  }
 
  if (relationshiptwo.trim() === "") {
    errors.relationshiptwo = "Enter the value for relationship";
  }
  if (sname.trim() === "") {
    errors.sname = "Enter the value for name";
  }
  if (soccupation.trim() === "") {
    errors.soccupation = "Supply the value for occupation";
  }
  if (sphone.trim() === "") {
    errors.sphone = "Supply the value for phone number";
  }
  if (saddress.trim() === "") {
    errors.saddress = "Supply the value for address";
  }
  if (iname.trim() === "") {
    errors.iname = "Supply the value for intermediary name";
  }
  if (iphone.trim() === "") {
    errors.iphone = "Supply the value for intermediary phone number";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1
  };
};


