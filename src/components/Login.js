import React, { useState,useRef } from 'react'
import Header from './Header'
import { checkValidData } from '../utils/validate';
import { createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import {auth} from "../utils/firebase";
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addUser } from '../utils/userSlice';
const Login = () => {
  const [isSignInForm,setIsSignInForm]=useState(true);
  const [errorMessage,setErrorMessage]=useState(null);
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const email=useRef(null);
  const password=useRef(null);
  const name=useRef(null);
  const handleButtonClick=()=>{
    //validate the form data
    console.log(name.current.value);
    console.log(email.current.value);
    console.log(password.current.value);
   
   const message=checkValidData(email.current.value,password.current.value,name.current.value)
   setErrorMessage(message);
   if(message) return;
    //sign in /sign up
    if(!isSignInForm){
          //sign up logic
          createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed up 
    const user = userCredential.user;
    console.log(user);
    updateProfile(user, {
      displayName:name.current.value, photoURL: "https://avatars.githubusercontent.com/u/155242658?v=4"
    }).then(() => {
      // Profile updated!
      const {uid,email,displayName,photoURL} = auth ;
        dispatch(
          addUser({
            uid:uid,
            email:email,
            displayName:displayName,
            photoURL:photoURL
          })
        )
      navigate("/browse");
    })
    .catch((error) => {
      // An error occurred
      // ...
      setErrorMessage(error.message);
    });
    
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+" "+errorMessage)
  });

    }
    else{
         //sign in logic
         signInWithEmailAndPassword(auth, email.current.value, password.current.value)
  .then((userCredential) => {
    // Signed in 
    const user = userCredential.user;
    console.log(user)
    navigate("/browse")
    // ...
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
    setErrorMessage(errorCode+" "+errorMessage)
  });
    }
  
  }
  const toggleSignInForm=()=>{
      setIsSignInForm(!isSignInForm)
  }
  return (
    <div>
   <Header />
   <div className='absolute'>
    <img src="https://assets.nflxext.com/ffe/siteui/vlv3/4d7bb476-6d8b-4c49-a8c3-7739fddd135c/deecf71d-7a47-4739-9e1a-31b6b0d55be7/IN-en-20240429-popsignuptwoweeks-perspective_alpha_website_small.jpg" alt="logo" />
    </div>
   <form onSubmit={(e)=>e.preventDefault()}  className="w-1/2 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
    <h1 className='font-bold text-3xl py-4'>{isSignInForm? "Sign In":"Sign Up"}</h1>
    {!isSignInForm && <input ref={name} type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-600"/>}
     <br />
     <input ref={email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-600"/>
     <br />
     
     <input ref={password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-600"/>
     <br />
     <p className="text-red-500 font-bold text-lg py-2">{errorMessage}</p>
     <button className="p-4 my-6 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>{isSignInForm? "Sign In":"Sign Up"}</button>
   <p className='py-4 cursor-pointer'onClick={toggleSignInForm}>{isSignInForm ? "New to Netflix? Sign Up Now" : "Alreday registered?Sign In Now."}</p>
   </form>
   </div>
   
  )
}

export default Login
