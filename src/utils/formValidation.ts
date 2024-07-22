type field = string;
export const onFocusValidation = (field: field, fieldValue: any) => {
  
  let err;
  switch (field) {
    case "firstName":
      if (!fieldValue) {
        err = "First name is required";
      } else {
        err = null;
      }
      break;
    case "lastName":
      if (!fieldValue) {
        err = "Last name is required";
      } else {
        err = null;
      }
      break;
    case "phoneNumber":
      if (!fieldValue) {
        err = "Phone number is is required";
      } else if (fieldValue.length < 11) {
        err = "Phone number is too short";
      } else {
        err = null;
      }
      break;
    case "email":
      if (!fieldValue) {
        err = "Email is required";
      } else if (fieldValue && !/\S+@\S+\.\S+/.test(fieldValue)) {
        err = "Email is invalid";
      } else {
        err = null;
      }
      break;
    case "gender":
      if (!fieldValue) {
        err = "Gender is required";
      } else {
        err = null;
      }
      break;
    case "password":
      if (!fieldValue) {
        err = "Password is required";
      } else if (fieldValue.length < 6) {
        err = "Password must be at least 6 characters";
      } else {
        err = null;
      }
      break;
    default:
      err = null;
      break;
  }
  return err;
};

export const ObjectValidation = async (object: any) => {
  
  if (typeof object !== "object" || object === null) {
    return false;
  }

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      if (
        object[key] === null ||
        object[key] === undefined ||
        object[key] === ""
      ) {
        return false;
      }
    }
  }

  return true;
};
