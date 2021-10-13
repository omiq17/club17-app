import { Text } from "@chakra-ui/react"

interface IProps {
  message?: string;
}

export default function ErrorText(props: IProps) {
  const { message } = props

  return message ?
    (
      <Text width="100%" variant="error">{message}</Text>
    ) :
    null
}