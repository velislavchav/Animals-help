const IsEmailValid = (emailValue: string) => {
  if (!/.+@.+\.[A-Za-z]+$/.test(emailValue)) {
    return false;
  }
  return true;
}

const ArePasswordsValid = (password: string, repassword: string) => {
  if (password === "" || password !== repassword) {
    return false;
  }
  return true;
}

export const FormCustomValidations = {
    IsEmailValid,
    ArePasswordsValid
}