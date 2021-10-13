import { createStandaloneToast } from "@chakra-ui/react";

const toast = createStandaloneToast()

export function showSuccessToast(title: string, description?: string) {
  return toast({
    title,
    description,
    status: "success",
    position: "top-right",
    variant: "subtle",
    duration: 5000,
    isClosable: true,
  })
}

export function showErrorToast(title: string, description?: string) {
  return toast({
    title,
    description,
    status: "error",
    position: "top-right",
    variant: "subtle",
    duration: 5000,
    isClosable: true,
  })
}

export function showWarningToast(title: string, description?: string) {
  return toast({
    title,
    description,
    status: "warning",
    position: "top",
    variant: "subtle",
    duration: 5000,
    isClosable: true,
  })
}