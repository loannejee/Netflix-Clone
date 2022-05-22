import React from 'react'
import './SignInScreen.css'

function SignInScreen() {
    return (
        <div className='signupScreen'>
            <form>
                <h1>Sign In</h1>
                <input placeholder='Email' type='email' />
                <input placeholder='Password' type='password' />
                <button type='submit'>Sign In</button>
                <h4>
                    {/* use span to style one specific piece of text */}
                    <span className='signupScreen_gray'>New to Netflix? </span>
                    <span className='signupScreen_link'>Sign up now.</span>
                </h4>
            </form>
        </div>
    )
}

export default SignInScreen