import { useCallback, useEffect, useRef, useState } from "react";
import { Box, Button, Divider, Flex, Grid, Heading, Image, Text, useDisclosure } from "@chakra-ui/react";
import { PlusSquareIcon } from '@chakra-ui/icons'
import { useRouter } from "next/dist/client/router";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { getMembersList } from "../membersSlice";
import { showWarningToast } from "../../../common/utils/toasts";
import { AddMemberModal } from "../add";
import MemberCard from "./MemberCard";
import { RemoveMemberModal } from "../remove";
import { UpdateMemberModal } from "../update";
import { logout } from "../../user/userSlice";

export default function MembersList() {
  const {
    isOpen: isAddModalOpen,
    onOpen: onAddModalOpen,
    onClose: onAddModalClose
  } = useDisclosure()
  const {
    isOpen: isUpdateModalOpen,
    onOpen: onUpdateModalOpen,
    onClose: onUpdateModalClose
  } = useDisclosure()
  const {
    isOpen: isRemoveModalOpen,
    onOpen: onRemoveModalOpen,
    onClose: onRemoveModalClose
  } = useDisclosure()

  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const hasUserChecked = useRef(false)
  const { members: { list }, user: { info: userInfo } } = useAppSelector(state => state)

  const dispatch = useAppDispatch()
  const router = useRouter();

  useEffect(() => {
    if (!hasUserChecked.current) {
      if (userInfo) {
        dispatch(getMembersList(userInfo.token))
      } else {
        router.push("/login")
        showWarningToast("Please login first")
      }

      hasUserChecked.current = true;
    }
  }, [dispatch, router, userInfo])

  const onUpdateInit = useCallback((index: number) => {
    setSelectedIndex(index)
    onUpdateModalOpen()
  }, [onUpdateModalOpen])

  const onRemoveInit = useCallback((index: number) => {
    setSelectedIndex(index)
    onRemoveModalOpen()
  }, [onRemoveModalOpen])

  const onLogout = () => {
    dispatch(logout())
    router.push("/")
  }

  return hasUserChecked.current ? (
    <Box minH="100vh" w="100%" m="10">
      <Flex justifyContent="space-between">
        <Image boxSize="3rem" src="/club17.png" alt="Club17" />
        <Heading color="primary.main" as="h1" size="xl" textAlign="center">Members</Heading>
        <Button
          variant="link"
          onClick={onLogout}
        >
          Logout
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

      <Grid templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(2, 1fr)", lg: "repeat(4, 1fr)" }} gap={4}>
        {!!list.length ? list.map((member, i) =>
          <MemberCard
            key={i}
            data={member}
            index={i}
            onRemoveInit={onRemoveInit}
            onUpdateInit={onUpdateInit}
          />
        ) :
          <Text>No member has added</Text>
        }
      </Grid>

      <AddMemberModal
        token={userInfo?.token}
        isOpen={isAddModalOpen}
        onClose={onAddModalClose}
      />

      <RemoveMemberModal
        token={userInfo?.token}
        isOpen={isRemoveModalOpen}
        onClose={onRemoveModalClose}
        member={selectedIndex !== null ? { ...list[selectedIndex] } : undefined}
      />

      <UpdateMemberModal
        token={userInfo?.token}
        isOpen={isUpdateModalOpen}
        onClose={onUpdateModalClose}
        member={selectedIndex !== null ? { ...list[selectedIndex] } : undefined}
      />
    </Box>
  ) :
    null
}