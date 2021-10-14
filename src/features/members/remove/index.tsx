import {
  Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter,
  ModalHeader, ModalOverlay, Text,
} from "@chakra-ui/react";

import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { removeMember } from "../membersSlice";
import { IMember } from "../types";

interface IProps {
  token: string;
  isOpen: boolean;
  onClose: () => void;
  member?: IMember;
}
export function RemoveMemberModal(props: IProps) {
  const { token, isOpen, onClose, member } = props
  const { loading } = useAppSelector(state => state.members)
  const dispatch = useAppDispatch()

  const onRemoveMember = async (e) => {
    e.preventDefault()
    if (member) {
      const removeAction = await dispatch(removeMember({ id: member._id, token }))
      if (removeMember.fulfilled.match(removeAction)) {
        onClose()
      }
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Remove Member</ModalHeader>
          <ModalCloseButton />

          <ModalBody>
            <Text>Are you sure to delete {member?.name}?</Text>
          </ModalBody>

          <ModalFooter>
            <Button mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              type="submit"
              color="tomato"
              onClick={onRemoveMember}
              isLoading={loading}>
              Remove
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  )
}