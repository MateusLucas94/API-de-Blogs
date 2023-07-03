const RequiredField = 'Some required fields are missing';

const emailExists = (email) => {
  if (email === undefined) return false;
  return true;
};

const validateEmail = (email) => {
  const MINIMUM_LENGTH = 1;
  if (email.length < MINIMUM_LENGTH) return false;
  return true;
};

const passwordExists = (password) => {
  if (password === undefined) return false;
  return true;
};

const validatePassword = (password) => {
  const MINIMUM_LENGTH = 1;
  if (password.length < MINIMUM_LENGTH) return false;
  return true;
};

const validateEmailInfo = (email) => {
  if (!emailExists(email)) {
    return {
      status: 400,
      message: RequiredField,
    };
  }
  if (!validateEmail(email)) {
    return {
      status: 400,
      message: RequiredField,
    };
  }
  return 200;
};

const validatePasswordInfo = (password) => {
  if (!passwordExists(password)) {
    return {
      status: 400,
      message: RequiredField,
    };
  }
  if (!validatePassword(password)) {
    return {
      status: 400,
      message: RequiredField,
    };
  }
  return 200;
};

module.exports = {
  validateEmailInfo,
  validatePasswordInfo,
};