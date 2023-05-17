'use client'
// export interface IAppProps {
// }
import {useState} from 'react';
import CreateCommunityModal from "@/components/Modal/CreateCommunity/CreateCommunityModal";
import { Flex, Icon, MenuItem } from "@chakra-ui/react";
import { GrAdd } from "react-icons/gr";

export default function Communities () {
    const [open,setOpen] = useState(false)
    function handleClose(){
        setOpen(false)
    }
  return (
    <>
     <CreateCommunityModal open={open}handleClose={handleClose} /> 
     <MenuItem width='100%' fontSize='10pt' _hover={{bg:'gray.100'}} onClick={()=>setOpen(true)}>
        <Flex align='center'>
            <Icon as={GrAdd}  fontSize={20} mr={2} />
            Create a Community
        </Flex>
     </MenuItem>
    </>
  );
}
