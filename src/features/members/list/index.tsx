import { useEffect } from "react";
import { Box, Button, Flex, Heading, Image, useDisclosure } from "@chakra-ui/react";
import { PlusSquareIcon } from '@chakra-ui/icons'
import { useRouter } from "next/dist/client/router";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getMembersList } from "../membersSlice";
import { showErrorToast } from "../../../common/utils/toasts";
import { AddMemberModal } from "../add";

export default function MembersList() {
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose
  } = useDisclosure()
  const { members: { list, loading }, user: { info: userInfo } } = useAppSelector(state => state)

  const dispatch = useAppDispatch()
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      dispatch(getMembersList(userInfo.token))
    } else {
      router.push("/login")
      showErrorToast("Please login first")
    }
  }, [dispatch, router, userInfo])

  console.log(list, "######")

  return (
    <Box minH="100vh" w="100%" m="4">
      <Flex justifyContent="space-between">
        <Image boxSize="3rem" src="/club17.png" alt="Club17" />
        <Heading color="primary.main" as="h1" size="lg" textAlign="center" mb="8">All Members</Heading>
        <Button
          variant="ghost"
          leftIcon={<PlusSquareIcon />}
          onClick={onAddModalOpen}
        >
          Member
        </Button>
      </Flex>

      <AddMemberModal
        token={userInfo.token}
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
      />
    </Box>
  )
}