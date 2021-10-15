import { useEffect, useRef } from "react";
import { useRouter } from "next/dist/client/router";

import Layout from "../common/components/Layout";
import { showSuccessToast } from "../common/utils/toasts";
import LoginMain from "../features/user/login";
import { useAppSelector } from "../redux/hooks";

export default function Login() {
  const hasUserChecked = useRef(false)
  const { info: userInfo } = useAppSelector(state => state.user)
  const router = useRouter();

  useEffect(() => {
    if (!hasUserChecked) {
      if (userInfo) {
        router.push("/members")
        showSuccessToast("Already logged in")
      }

      hasUserChecked.current = true
    }
  }, [userInfo, router])

  return (
    <Layout>
      <LoginMain />
    </Layout>
  )
}