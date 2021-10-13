import { Box, Button, Heading, Image, Input, VStack } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import ErrorText from "../../../common/components/ErrorText";
import { showSuccessToast } from "../../../common/utils/toasts";
import validator from "../../../common/validator";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { singUpSchema } from "../../../schemas";
import { ISignupAttributes, ISignupFormErrors } from "../types";
import { signup } from "../userSlice";

export default function SignupMain() {
  const [data, setData] = useState<ISignupAttributes | undefined>()
  const [errors, setErrors] = useState<ISignupFormErrors | undefined>()

  const { loading, auth } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (auth.success) {
      router.push("/members")
      showSuccessToast("Already logged in")
    }
  }, [auth, router])

  const onInputChange = (event) => setData({
    ...data,
    [event.target.name]: event.target.value
  })

  const onSignup = async (e) => {
    e.preventDefault()
    setErrors(undefined)
    const validation = validator(singUpSchema, data)

    if (validation.isValid) {
      const loginAction = await dispatch(
        signup({ ...data, username: data.username.toLocaleLowerCase() })
      )
      if (signup.fulfilled.match(loginAction)) {
        router.push("/login")
      }
    } else {
      setErrors(validation.errors)
    }
    console.log("Signup")
  }

  return (
    <Box>
      <Image boxSize="7rem" src="/club17.png" alt="Club17" margin="0 auto 1rem" />
      <Heading color="primary.main" as="h1" size="xl" textAlign="center" mb="8">SIGNUP</Heading>

      <form id="login-form" onSubmit={onSignup}>
        <VStack spacing="4">
          <Input
            name="name"
            placeholder="Name"
            value={data?.name || ""}
            onChange={onInputChange}
          />
          <ErrorText message={errors?.name} />

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

          <Input
            name="key"
            placeholder="Passkey"
            value={data?.key || ""}
            onChange={onInputChange}
          />
          <ErrorText message={errors?.key} />

          <Button
            type="submit"
            isLoading={loading}
          >
            Signup
          </Button>
        </VStack>
      </form>
    </Box>
  )
}