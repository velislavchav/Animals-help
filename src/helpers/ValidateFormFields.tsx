const IsEmailValid = (emailValue: string) => {
  if (/.+@.+\.[A-Za-z]+$/.test(emailValue)) {
    return true;
  }
  return false;
};

const PasswordsMatch = (password: string | undefined, repassword: string) => {
  if (password === "" || password !== repassword || typeof password === undefined) {
    return false;
  }
  return true;
};

const EmailErrorMessage = (emailValue: string) => {
  return IsEmailValid(emailValue) ? "" : "Not a valid email.";
}

const PasswordErrorMessage = (password: string | undefined, repassword: string = "") => {
  if (password && password.length < 6) 
    return "Password must be at least 6 characters."
  
  return PasswordsMatch(password, repassword) ? "" : "Passwords are not the same.";
}

export {
  IsEmailValid,
  PasswordsMatch,
  EmailErrorMessage,
  PasswordErrorMessage
};
