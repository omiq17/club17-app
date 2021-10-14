import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import {
  Box, Button, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent,
  ModalFooter, ModalHeader, ModalOverlay, Text, VStack
} from "@chakra-ui/react";

import ErrorText from "../../../common/components/ErrorText";
import { showErrorToast, showWarningToast } from "../../../common/utils/toasts";
import validator from "../../../common/validator";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { memberSchema } from "../../../schemas";
import { activeLoading, deActiveLoading, updateMember } from "../membersSlice";
import { IAddMemberFormErrors, IMember, IUpdateMemberAttributes } from "../types";

interface IProps {
  token: string;
  isOpen: boolean;
  onClose: () => void;
  member?: IMember;
}
export function UpdateMemberModal(props: IProps) {
  const { token, isOpen, onClose, member } = props
  const { loading } = useAppSelector(state => state.members)

  const [data, setData] = useState<IUpdateMemberAttributes | undefined>()
  const [imageFile, setImageFile] = useState<File | undefined>();
  const [errors, setErrors] = useState<IAddMemberFormErrors | undefined>()
  const dispatch = useAppDispatch()

  useEffect(() => {
    if (member?._id) {
      setData({ ...member, _id: member._id })
    }
  }, [member])

  const onInputChange = (event) => setData({
    ...data,
    [event.target.name]: event.target.value
  })

  const onFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      if (file.size > 1 * 1024 * 1024) {
        showWarningToast("File is too big!", "Please select within 1MB")
      } else {
        setImageFile(file)
      }
    }
  }

  const onUpdateMember = async (e) => {
    e.preventDefault()
    setErrors(undefined)

    const validation = validator(memberSchema, data)

    if (validation.isValid) {
      if (imageFile) {
        // if user select new file, then upload it first
        await dispatch(activeLoading())
        // Upload avatar through UploadCare/3rd-party API
        let formData = new FormData();
        formData.append('UPLOADCARE_PUB_KEY', process.env.NEXT_PUBLIC_UPLOAD_KEY);
        formData.append('UPLOADCARE_STORE', 'auto');
        formData.append('file', imageFile);
        await axios({
          url: "https://upload.uploadcare.com/base/",
          method: 'POST',
          data: formData
        })
          .then(async (result: AxiosResponse<{ file: string }>) => {
            // console.log('Success:', result);
            const updateMemberAction = await dispatch(updateMember({ ...data, token, avatar: result.data.file }))
            if (updateMember.fulfilled.match(updateMemberAction)) {
              onClose()
              setData(undefined)
            }
          })
          .catch(() => {
            // console.error('Upload error:', error);
            dispatch(deActiveLoading())
            showErrorToast("Failed to upload avatar", "Please try again")
          });
      } else {
        const updateMemberAction = await dispatch(updateMember({ ...data, token }))
        if (updateMember.fulfilled.match(updateMemberAction)) {
          onClose()
          setData(undefined)
        }
      }
    }
    else {
      setErrors(validation.errors)
    }
  }

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <form id="login-form" onSubmit={onUpdateMember}>
            <ModalHeader>Update Member</ModalHeader>
            <ModalCloseButton />

            <ModalBody>
              <VStack spacing="4">
                <Box w="100%" p="0 0.5rem">
                  <Image
                    src={`https://ucarecdn.com/${data?.avatar}/`}
                    borderRadius="lg"
                    boxSize="6rem"
                    alt={data?.name} />
                  <Text color="gray" mt="2">Change avatar</Text>
                  <Input
                    variant="unstyled"
                    p="0.25rem 0"
                    name="avatar"
                    size="sm"
                    placeholder="avatar"
                    type="file"
                    accept="image/*"
                    onChange={onFileChange}
                  />
                </Box>

                <Input
                  name="name"
                  placeholder="Name"
                  value={data?.name || ""}
                  onChange={onInputChange}
                />
                <ErrorText message={errors?.name} />

                <Input
                  name="address"
                  placeholder="Address"
                  value={data?.address || ""}
                  onChange={onInputChange}
                />
                <ErrorText message={errors?.address} />

                <Input
                  name="email"
                  placeholder="Email"
                  value={data?.email || ""}
                  onChange={onInputChange}
                />
                <ErrorText message={errors?.email} />

                <Input
                  name="dob"
                  placeholder="Date of Birth"
                  type="date"
                  value={data?.dob || ""}
                  onChange={onInputChange}
                />
                <ErrorText message={errors?.dob} />

                <Input
                  name="phone"
                  placeholder="Phone"
                  value={data?.phone || ""}
                  type="number"
                  onChange={onInputChange}
                />
                <ErrorText message={errors?.phone} />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button mr={3} onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit" isLoading={loading}>Update</Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}