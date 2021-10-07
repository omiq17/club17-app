import { Container, } from '@chakra-ui/react'
import Head from 'next/head'

interface IProps {
  children: React.ReactNode;
}

export default function Layout(props: IProps) {
  return (
    <Container maxW="xl" minH="100vh" centerContent justifyContent="center">
      <Head>
        <title>Club 17</title>
        <meta name="description" content="A small club management application" />
        <link rel="icon" href="/favicon.png" />
      </Head>

      {props.children}
    </Container>
  )
}
