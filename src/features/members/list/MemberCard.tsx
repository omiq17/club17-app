import { memo } from "react";
import { AtSignIcon, DeleteIcon, EditIcon, EmailIcon, InfoIcon, PhoneIcon, TimeIcon } from "@chakra-ui/icons";
import { Box, HStack, Image, Circle, Text, Stack, VStack } from "@chakra-ui/react";

import { IMember } from "../types";

interface IProps {
  data: IMember
  index: number
  onRemoveInit: (index: number) => void
  onUpdateInit: (index: number) => void
}

export default memo(function MemberCard(props: IProps) {
  const { data, index, onRemoveInit, onUpdateInit } = props

  return (
    <Box
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      background="gray.100"
      overflow="hidden">
      <HStack alignItems="flex-start" justifyContent="space-between">
        <Image
          src={`https://ucarecdn.com/${data.avatar}/`}
          borderRadius="lg"
          boxSize="6rem"
          alt={data.name}
        />
        <VStack cursor="pointer" spacing="4">
          <Circle size="6" bg="teal.300" color="white" onClick={() => onUpdateInit(index)}>
            <EditIcon />
          </Circle>

          <Circle size="6" bg="red.300" color="white" onClick={() => onRemoveInit(index)}>
            <DeleteIcon />
          </Circle>
        </VStack>
      </HStack>

      <Stack mt="1rem" spacing="1">
        <HStack>
          <Circle size="6" bg="white" color="gray.600" >
            <AtSignIcon />
          </Circle>
          <Text color="gray.700" fontWeight="bold" fontSize="1.25em">{data.name}</Text>
        </HStack>

        <HStack alignItems="flex-start">
          <Circle size="6" bg="white" color="gray.400" >
            <InfoIcon />
          </Circle>
          <Text color="gray.600">{data.address}</Text>
        </HStack>

        <HStack>
          <Circle size="6" bg="white" color="gray.400" >
            <EmailIcon />
          </Circle>
          <Text color="gray.600">{data.email}</Text>
        </HStack>

        <HStack>
          <Circle size="6" bg="white" color="gray.400" >
            <TimeIcon />
          </Circle>
          <Text color="gray.600">
            {new Intl.DateTimeFormat('default', { dateStyle: 'medium' })
              .format(new Date(data.dob))}
          </Text>
        </HStack>

        {data.phone &&
          <HStack>
            <Circle size="6" bg="white" color="gray.400" >
              <PhoneIcon />
            </Circle>
            <Text color="gray.600">{data.phone}</Text>
          </HStack>
        }
      </Stack>
    </Box>
  )
})