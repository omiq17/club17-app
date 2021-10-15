import { Button, Container, } from '@chakra-ui/react'
import Head from 'next/head'
import { useEffect } from 'react'
import { IUser } from '../../features/user/types'
import { setAuthCheckingError, setUserInfo } from '../../features/user/userSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'

interface IProps {
  children: React.ReactNode;
}

export default function Layout(props: IProps) {
  const { checked: authChecked } = useAppSelector(state => state.user.auth)
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (!authChecked) {
      // get data from local storage
      const user = localStorage.getItem("club17app.user")
      if (user) {
        const userInfo: IUser = JSON.parse(user)
        dispatch(setUserInfo(userInfo))
      } else {
        dispatch(setAuthCheckingError())
      }
    }
  }, [authChecked, dispatch])

  return (
    <Container maxW="1200px" minH="100vh" centerContent justifyContent="center">
      <Head>
        <title>Club 17</title>
        <meta name="description" content="A small club management application" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {!authChecked ?
        <Button
          isLoading={!authChecked}
          loadingText="Stay with us"
          variant="ghost"
          size="lg"
        /> :
        props.children
      }
    </Container>
  )
}
