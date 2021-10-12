import { Box, Button, Heading, Image, Input, VStack } from "@chakra-ui/react";

export default function LoginMain() {
  const onLogin = (e) => {
    e.preventDefault()
    console.log("Login")
  }

  return (
    <Box>
      <Image boxSize="7rem" src="/club17.png" alt="Club17" margin="0 auto 1rem" />
      <Heading color="primary.main" as="h1" size="xl" textAlign="center" mb="8">LOGIN</Heading>

      <form id="login-form" onSubmit={onLogin}>
        <VStack spacing="4">
          <Input placeholder="Username" />
          <Input placeholder="Password" type="password" />
          <Button type="submit">Login</Button>
        </VStack>
      </form>
    </Box>
  )
}