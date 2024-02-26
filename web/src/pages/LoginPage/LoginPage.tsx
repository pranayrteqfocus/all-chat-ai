import { useState } from 'react'

import { GoogleLogin } from '@react-oauth/google'
import { Card } from 'antd'
import { jwtDecode } from 'jwt-decode' // Import jwt-decode library

import { Link, routes } from '@redwoodjs/router'
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
          gap: 20,
          borderRadius: 20,
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '720px',
          width: '100%',
          backgroundImage: `url("https://images.unsplash.com/photo-1548890126-91461beb4bf1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
        }}
      >
        <Metadata title="Login" description="Login page" />
        <Card>
          <h1>Welcome to AI Chat</h1>
          <Card title="Sign in with Google">
            {false ? (
              <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse)
                  fetchData(credentialResponse.credential)
                  return <Link to={routes.home()} />
                }}
                onError={() => {
                  console.log('Login Failed')
                }}
              />
            ) : (
              <Link to={routes.home()}>Click here to start</Link>
            )}
          </Card>
        </Card>
      </div>
    </>
  )
}

export default LoginPage
