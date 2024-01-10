import Head from 'next/head'
import { Inter } from '@next/font/google'
import Login from '@/components/Login/Login';

const inter = Inter({ subsets: ['latin'] })

export default function SignIn() {
  return (
    <>
      <Head>
        <title>Login</title>
        <meta name="description" content="Login Widya Store" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/icon/logo.png" />
      </Head>
      <Login />
    </>
  )
}
