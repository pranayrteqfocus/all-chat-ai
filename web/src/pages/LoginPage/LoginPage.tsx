import { useState } from 'react'

import { GoogleLogin } from '@react-oauth/google'
import { jwtDecode } from 'jwt-decode' // Import jwt-decode library

import { Metadata } from '@redwoodjs/web'

const LoginPage = () => {
  const [userData, setUserData] = useState({})

  const fetchData = (credential: any) => {
    const decodedToken = jwtDecode(credential)
    console.log(decodedToken)
    setUserData(decodedToken)
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          alignContent: 'center',
          justifyContent: 'center',
          height: '100%',
          width: '100%',
        }}
      >
        <Metadata title="Login" description="Login page" />
        <GoogleLogin
          onSuccess={(credentialResponse) => {
            console.log(credentialResponse)
            fetchData(credentialResponse.credential)
          }}
          onError={() => {
            console.log('Login Failed')
          }}
        />
      </div>
      <h1>Username: {userData?.name}</h1>
    </>
  )
}

export default LoginPage
