import { AtSignIcon, EmailIcon, InfoIcon, PhoneIcon, TimeIcon } from "@chakra-ui/icons";
import { Box, HStack, Image, Circle, Text, Stack } from "@chakra-ui/react";
import { IMember } from "../types";

interface IProps {
  data: IMember
}

export default function MemberCard(props: IProps) {
  const { data } = props

  return (
    <Box
      p="6"
      borderWidth="1px"
      borderRadius="lg"
      borderColor="teal.100"
      overflow="hidden">
      <Image
        src={`https://ucarecdn.com/${data.avatar}/`}
        borderRadius="lg"
        boxSize="6rem"
        alt={data.name}
      />

      <Stack mt="1rem" spacing="1">
        <HStack>
          <Circle size="6" bg="white" color="gray.600" >
            <AtSignIcon />
          </Circle>
          <Text color="gray.700" fontWeight="bold" fontSize="1.25em">{data.name}</Text>
        </HStack>

        <HStack>
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
          <Text color="gray.600">{data.dob}</Text>
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
}