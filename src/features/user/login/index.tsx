import { useState } from "react";
import { useRouter } from "next/dist/client/router";
import { Box, Button, Heading, Image, Input, VStack } from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { loginSchema } from "../../../schemas";
import { ILoginAttributes, ILoginFormErrors } from "../types";
import { login } from "../userSlice";
import validator from "../../../common/validator";
import ErrorText from "../../../common/components/ErrorText";

export default function LoginMain() {
  const [data, setData] = useState<ILoginAttributes | undefined>()
  const [errors, setErrors] = useState<ILoginFormErrors | undefined>()

  const { loading } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  const onInputChange = (event) => setData({
    ...data,
    [event.target.name]: event.target.value
  })

  const onLogin = async (e) => {
    e.preventDefault()
    setErrors(undefined)
    const validation = validator(loginSchema, data)

    if (validation.isValid) {
      const loginAction = await dispatch(login(data))
      if (login.fulfilled.match(loginAction)) {
        router.push("/members")
      }
    } else {
      setErrors(validation.errors)
    }
  }


  return (
    <Box>
      <Image boxSize="7rem" src="/club17.png" alt="Club17" margin="0 auto 1rem" />
      <Heading color="primary.main" as="h1" size="xl" textAlign="center" mb="8">LOGIN</Heading>

      <form id="login-form" onSubmit={onLogin}>
        <VStack spacing="4">
          <Input
            name="username"
            placeholder="Username"
            value={data?.username || ""}
            onChange={onInputChange}
          />
          <ErrorText message={errors?.username} />

          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={data?.password || ""}
            onChange={onInputChange}
          />
          <ErrorText message={errors?.password} />

          <Button
            type="submit"
            isLoading={loading}
          >
            Login
          </Button>
        </VStack>
      </form>
    </Box>
  )
}