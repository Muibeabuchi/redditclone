'use client'

import { Flex } from "@chakra-ui/react"
import AuthButtons from "./AuthButtons"


type RightContentProps ={

}

const RightContent:React.FC<RightContentProps>= () => {
  return (
    <>
      {/* <AuthModal /> */}
      <Flex justify='center' align='center'>
        <AuthButtons />
      </Flex>
    </>
  )
}

export default RightContent