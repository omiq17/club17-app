import Link from 'next/link';
import { Flex, Container, Heading, Image, Stack, Button } from '@chakra-ui/react';
import Layout from '../components/Layout';

export default function Home() {
  return (
    <Layout>
      <Flex p={4} flexDirection="column" alignItems="center" gridGap="4">
        <Image src="/club17.png" alt="Club17" />
        <Heading color="primary.main" as="h1" size="3xl">Club17</Heading>
        <Heading as="h3" size="lg" fontWeight="normal">Your club management app</Heading>
      </Flex>

      <Stack direction="row" spacing={4} align="center">
        <Link href="/login">
          <Button>Login</Button>
        </Link>
        <Link href="/signup">
          <Button>Signup</Button>
        </Link>
      </Stack>
    </Layout>
  );
};
