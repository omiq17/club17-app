import { Box, Button, Heading, Image, Input, VStack } from "@chakra-ui/react";
import { useRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";
import { showSuccessToast } from "../../../common/utils/toasts";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { ILoginAttributes } from "../types";
import { login } from "../userSlice";

export default function LoginMain() {
  const [data, setData] = useState<ILoginAttributes | undefined>()

  const { loading, auth } = useAppSelector(state => state.user)
  const dispatch = useAppDispatch()
  const router = useRouter()

  useEffect(() => {
    if (auth.success) {
      showSuccessToast("Already logged in")
      router.push("/members")
    }
  }, [auth, router])

  const onInputChange = (event) => setData({
    ...data,
    [event.target.name]: event.target.value
  })

  const onLogin = async (e) => {
    e.preventDefault()

    if (data) {
      const loginAction = await dispatch(login(data))
      if (login.fulfilled.match(loginAction)) {
        router.push("/members")
      }
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
          <Input
            name="password"
            placeholder="Password"
            type="password"
            value={data?.password || ""}
            onChange={onInputChange} />
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