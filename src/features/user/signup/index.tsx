import { Box, Button, Heading, Image, Input, VStack } from "@chakra-ui/react";

export default function SignupMain() {
  const onSignup = (e) => {
    e.preventDefault()
    console.log("Signup")
  }

  return (
    <Box>
      <Image boxSize="7rem" src="/club17.png" alt="Club17" margin="0 auto 1rem" />
      <Heading color="primary.main" as="h1" size="xl" textAlign="center" mb="8">SIGNUP</Heading>

      <form id="login-form" onSubmit={onSignup}>
        <VStack spacing="4">
          <Input placeholder="Name" />
          <Input placeholder="Username" />
          <Input placeholder="Password" type="password" />
          <Input placeholder="Key" />
          <Button type="submit">Signup</Button>
        </VStack>
      </form>
    </Box>
  )
}