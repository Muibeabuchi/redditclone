import { Button } from "@chakra-ui/react"


const AuthButtons:React.FC =()=>{
    return(
        <>
            <Button variant='outline' display={{base:'none',sm:'flex'}} height='28px' width={{base:'70px',md:'110px'}} mr={2} >Log In</Button>
            <Button  display={{base:'none',sm:'flex'}} width={{base:'70px',md:'110px'}} height='28px' mr={2} >Sign Up</Button>
        </>
    )
}

export default AuthButtons

