import { signOut } from 'firebase/auth';
import React from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Header = () => {
  const navigate=useNavigate();
  const user=useSelector(store=>store.user);
  const handleSignOut=()=>{
    signOut(auth).then(() => {
      // Sign-out successful.
      navigate("/");
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
      <img className="w-34" 
      src="https://assets.nflxext.com/us/ffe/siteui/common/icons/nficon2016.png" 
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