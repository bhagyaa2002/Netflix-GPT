export const checkValidData=(email,password,fullname)=>{
  const isEmailValid=/^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/.test(email);
  const isPasswordValid=/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/.test(password);
  const isFullname=/^[a-zA-Z]+(?: [a-zA-Z]+)*$/.test(fullname);
  if(!isEmailValid) return "Email ID is not valid";
  if(!isPasswordValid) return "Password is not valid";
  if(!isFullname) return "Fullname is not valid";

  return null;
}