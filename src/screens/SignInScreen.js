import React, { useRef } from 'react'
import './SignInScreen.css'
import { auth } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";

function SignInScreen() {
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    // to prevent form from auto refreshing when clicking the buttons:
    const register = (e) => {
        e.preventDefault();

        let email = emailRef.current.value
        let password = passwordRef.current.value

        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                alert(error.message)
            });
    }

    const signIn = (e) => {
        e.preventDefault();
        
        let email = emailRef.current.value
        let password = passwordRef.current.value

        signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Signed in 
                const user = userCredential.user;
                console.log(user)
            })
            .catch((error) => {
                alert(error.message)
            });
    }

    return (
        <div className='signupScreen'>
            <form>
                <h1>Sign In</h1>
                <input ref={emailRef} placeholder='Email' type='email' />
                <input ref={passwordRef} placeholder='Password' type='password' />
                <button type='submit' onClick={signIn}>Sign In</button>
                <h4>
                    {/* use span to style one specific piece of text */}
                    <span className='signupScreen_gray'>New to Netflix? </span>
                    <span className='signupScreen_link' onClick={register}>Sign up now.</span>
                </h4>
            </form>
        </div>
    )
}

export default SignInScreen