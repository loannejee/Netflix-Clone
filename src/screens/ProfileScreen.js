import { useSelector } from 'react-redux'
import React, { useEffect, useState } from 'react';
import { selectUser } from '../features/userSlice';
import { auth } from '../firebase';
import Nav from '../Nav';
import './ProfileScreen.css';
import PlansScreen from './PlansScreen';
import { collection, getDocs } from "firebase/firestore";
import db from '../firebase';

function ProfileScreen() {
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    (async () => {
      const customerRef = collection(db, `customers/${user.uid}/subscriptions`);
      const querySnapshot = await getDocs(customerRef);

      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
        });
      });
    })
      ()
  }, [])

  return (
    <div className='profileScreen'>
      <Nav />
      <div className='profileScreen_body'>

        <h1>Edit Profile</h1>

        <div className='profileScreen_info'>
          <img
            src='https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png'
            alt=''
          />
          <div className='profileScreen_details'>
            <h2>{user.email}</h2>

            <div className='profileScreen_plans'>
              
              {
                subscription 
                ? 
                <h3>{`Plans (Current Plan: ${subscription?.role})`}</h3>
                :
                <h3>Plans</h3>
              }
              
              <PlansScreen />
              <button
                // this will trigger auth.onAuthStateChanged
                onClick={() => auth.signOut()}
                className="profileScreen_signOut">
                Sign Out
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  )
}

export default ProfileScreen