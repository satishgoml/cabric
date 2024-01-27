import {
  extendTheme,
  defineStyleConfig,
  createStandaloneToast,
} from '@chakra-ui/react'



const { ToastContainer, toast } = createStandaloneToast()

export { ToastContainer, toast }

export const colors = {
  brand: {
    darkgrey: '#4D4D50',
    lightgrey: '#EFEFEF',
    hovergrey: '#A6A6A6',
  },
}

const FormLabel = defineStyleConfig({
  baseStyle: {
    color: 'black',
    fontSize: 'xs',
    fontWeight: 'normal',
  },
})



const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: '0.5rem',
    borderColor: colors.brand.darkgrey,
    borderWidth: '1px',
  },
  variants: {
    solid: {
      bg: colors.brand.darkgrey,
      color: 'white',

      _hover: {
        bg: colors.brand.hovergrey,
        color: 'white',
      },
    },
    outline: {
      bg: 'white',
      color: colors.brand.darkgrey,
    },

    ghost: {
      bg: 'transparent',
      borderColor: 'transparent',
    },
  },
})

const FormErrorMessage = defineStyleConfig({
  baseStyle: {
    fontSize: 'xs',
  },
})

export const theme = extendTheme({
  // fonts : {
  //   heading: 'Comic Neue',
  //   body: 'Comic Neue',
  // },


  components: {
    FormLabel,
    Button,
    FormErrorMessage,
  },
  colors,
  styles: {
    global: {
      body: {
        fontFamily:  'Comic Neue',
      },
    },
  },
})
