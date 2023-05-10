import '@fontsource/open-sans/300.css'
import '@fontsource/open-sans/400.css'
import '@fontsource/open-sans/700.css'
import { extendTheme } from '@chakra-ui/react'
import { Button } from './button'
import { Input } from './input'

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    100: '#ff3c00',
   
  },
}
const styles = {
    global:()=>({
        "body":{
            background:'gray.200'
        }
    })
}
const fonts ={
    body: 'Open Sans, sans-serif'
}
const components ={
  Button,
  Input
}

export const theme = extendTheme({ colors,fonts,styles,components })