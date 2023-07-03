const nameInvalid = {
    message: '"displayName" length must be at least 8 characters long',
  };
  const emailInvalid = {
    message: '"email" must be a valid email',
  };
  const passwordInvalid = {
    message: '"password" length must be at least 6 characters long',
  };
  const passwordRequired = {
    message: '"password" is required',
  };
  
  const emailRequired = {
    message: '"email" is required',
  };
  
  const validateName = (name) => {
    const MINIMUM_LENGTH = 8;
    if (name && name.length < MINIMUM_LENGTH) {
      return {
        status: 400,
        message: nameInvalid,
      };
    }
    return 200;
  };
  
  // Código abaixo é uma variação do código já usado em outros projetos anteriores
  // https://stackoverflow.com/questions/46155/whats-the-best-way-to-validate-an-email-address-in-javascript
  
  const emailExists = (email) => {
    if (!email) return false;
    return true;
  };
  
  const validateEmail = (email) => {
    const re = /\S+@\S+\.\S+/;
    return re.test(email);
  };
  
  const passwordExists = (password) => {
    if (!password) return false;
    return true;
  };
  
  const validatePassword = (password) => {
    const MINIMUM_LENGTH = 6;
    if (password.length < MINIMUM_LENGTH) return false;
    return true;
  };
  
  const validateEmailInfo = (email) => {
    if (!emailExists(email)) {
      return {
        status: 400,
        message: emailRequired,
      };
    }
    if (!validateEmail(email)) {
      return {
        status: 400,
        message: emailInvalid,
      };
    }
    return 200;
  };
  
  const validatePasswordInfo = (password) => {
    if (!passwordExists(password)) {
      return {
        status: 400,
        message: passwordRequired,
      };
    }
    if (!validatePassword(password)) {
      return {
        status: 400,
        message: passwordInvalid,
      };
    }
    return 200;
  };
  
  module.exports = {
    validateName,
    validateEmailInfo,
    validatePasswordInfo,
  };