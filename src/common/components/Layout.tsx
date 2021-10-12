import { Button, Container, } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { IUser } from '../../features/user/types'
import { setUserInfo } from '../../features/user/userSlice'
import { useAppDispatch } from '../../redux/hooks'

interface IProps {
  children: React.ReactNode;
}

export default function Layout(props: IProps) {
  const [authChecking, setAuthChecking] = useState(true)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (authChecking) {
      // get data from local storage
      const user = localStorage.getItem("club17app.user")
      if (user) {
        const userInfo: IUser = JSON.parse(user)
        dispatch(setUserInfo(userInfo))
        setAuthChecking(false)
      }
    }
  }, [authChecking, dispatch])

  return (
    <Container maxW="xl" minH="100vh" centerContent justifyContent="center">
      <Head>
        <title>Club 17</title>
        <meta name="description" content="A small club management application" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {authChecking ?
        <Button
          isLoading={authChecking}
          loadingText="Stay with us"
          variant="ghost"
          size="lg"
        /> :
        props.children
      }
    </Container>
  )
}
