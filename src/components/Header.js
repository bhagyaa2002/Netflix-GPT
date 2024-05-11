import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser,removeUser } from '../utils/userSlice';
import { LOGO } from '../utils/constants';

const Header = () => {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user=useSelector(store=>store.user);
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
  useEffect(()=>{

   const unsubscribe=onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        const {uid,email,displayName,photoURL} = user;
        dispatch(addUser({uid:uid,email:email,displayName:displayName,photoURL:photoURL}))
      navigate("/browse")
    }
    else {
        // User is signed out
        // ...
        dispatch(removeUser());
        navigate("/");
      }
    });
    //unsubscribe when component unmounts
  return () => unsubscribe();
  },[dispatch,navigate]);
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-34" 
      src= {LOGO}
      alt="logo" 
      />
      {user && (
        <div className="flex items-center">
          {user.photoURL ? (
            <img className="h-12 w-12 mr-2" alt="usericon" src={user.photoURL} />
          ) : (
            <div className="h-12 w-12 mr-2 bg-gray-400 rounded-full"></div> // Placeholder if photoURL is not available
          )}
          <button onClick={handleSignOut} className='font-bold text-white'>(Sign Out)</button>
        </div>
      )}
    </div>
  )
}

export default Header