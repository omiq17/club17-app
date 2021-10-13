import { useEffect } from "react";
import { Box, Button, Divider, Flex, Grid, Heading, Image, Text, useDisclosure } from "@chakra-ui/react";
import { PlusSquareIcon } from '@chakra-ui/icons'
import { useRouter } from "next/dist/client/router";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getMembersList } from "../membersSlice";
import { showErrorToast } from "../../../common/utils/toasts";
import { AddMemberModal } from "../add";
import MemberCard from "./MemberCard";

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
    <Box minH="100vh" w="100%" m="10">
      <Flex justifyContent="space-between">
        <Image boxSize="3rem" src="/club17.png" alt="Club17" />
        <Heading color="primary.main" as="h1" size="lg" textAlign="center">All Members</Heading>
        <Button
          variant="ghost"
          leftIcon={<PlusSquareIcon />}
          onClick={onAddModalOpen}
        >
          Member
        </Button>
      </Flex>

      <Divider m="1rem 0" />

      <Flex mb="2" justifyContent="space-between" alignItems="center">
        <Text color="gray.700">Total: {list.length}</Text>
        <Button
          variant="ghost"
          leftIcon={<PlusSquareIcon />}
          onClick={onAddModalOpen}
        >
          Member
        </Button>
      </Flex>

      <Grid templateColumns="repeat(4, 1fr)" gap={4}>
        {list.map((member, i) =>
          <MemberCard key={i} data={member} />
        )}
      </Grid>

      <AddMemberModal
        token={userInfo.token}
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
      />
    </Box>
  )
}