/* eslint-disable no-constant-condition */
import { CSSProperties, useState } from 'react'

import { GoogleOutlined } from '@ant-design/icons'
import { GoogleLogin } from '@react-oauth/google'
import { Button, Card, Space } from 'antd'
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode library

import { Link, routes } from '@redwoodjs/router'
import { Metadata } from '@redwoodjs/web'

const divStyles: CSSProperties = {
  display: 'flex',
  gap: 20,
  borderRadius: 20,
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  height: '720px',
  width: '100%',
  backgroundImage: `url("https://images.unsplash.com/photo-1548890126-91461beb4bf1?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")`,
}

const LoginPage = () => {
  const [userData, setUserData] = useState({})

  const fetchData = (credential: any) => {
    const decodedToken = jwtDecode(credential)
    setUserData(decodedToken)
  }

  return (
    <div style={divStyles}>
      <Metadata title="Login" description="Login page" />
      <Card title="Welcome to AI Chat">
        <Space align="center">
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
            <Button icon={<GoogleOutlined />}> Login With Goolge</Button>
          )}
        </Space>
      </Card>
    </div>
  )
}

export default LoginPage
// <Link to={routes.home()}>Click here to start</Link>
