import React from 'react'
import { Box, Button, Text, Link, Grid, Flex } from '@chakra-ui/react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from '~/themes/defaultTheme'
import { InputFormControl } from '~/components/Forms/FormInput'
import useAuth from '~/providers/AuthProvider'




// Define an enum for form keys
enum FormKeys {
  NAME = 'first_name',
  EMAIL = 'email',
  PASSWORD = 'password',
  CONFIRM_PASSWORD = 'confirmPassword',
}

const SignUp: React.FC = () => {
  const initialValues = {
    [FormKeys.NAME]: '',
    [FormKeys.EMAIL]: '',
    [FormKeys.PASSWORD]: '',
    [FormKeys.CONFIRM_PASSWORD]: '',
  }

  const validationSchema = Yup.object({
    [FormKeys.NAME]: Yup.string().required('Name is required'),
    [FormKeys.EMAIL]: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    [FormKeys.PASSWORD]: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
    [FormKeys.CONFIRM_PASSWORD]: Yup.string()
      .oneOf([Yup.ref(FormKeys.PASSWORD), ''], 'Passwords must match')
      .required('Confirm Password is required'),
  })

  const { signUpNewUser } = useAuth();


  return (
    <Grid
      templateColumns={{ base: '1fr', md: '5fr 6fr' }}
      gap={4}
      height="100vh"
      width={{ base: '100%', md: '100%' }}
    >
      {/* Left Side - Form */}
      <Box
        my={"auto"}
        padding={4}
        borderRadius="md"
        backgroundColor="white"
        px={8}
      >
        <Text fontSize="2xl" mb={4} textAlign="center">
          Sign Up
        </Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            try {
              await signUpNewUser(values.email, values.password)
              toast({
                title: 'Success',
                description: 'Sign up successful',
                status: 'success',
                duration: 9000,
                isClosable: true,
              })

            }
            catch (error) {
              console.log(error)
              toast({
                title: 'Error',
                description: (error as Error).message,
                status: 'error',
                duration: 9000,
                isClosable: true,
              })
              setSubmitting(false)
              return
            }




            setSubmitting(false)
          }}
        >
          {({ handleSubmit }) => (
            <Grid gap={4}>
              {/* Use InputFormControl for each input field */}
              <InputFormControl
                label="Name"
                name={FormKeys.NAME}
                type="text"
                placeholder="Enter your name"
                maxLength={50}
                required
              />

              <InputFormControl
                label="Email address"
                name={FormKeys.EMAIL}
                type="email"
                placeholder="Enter your email"
                required
              />

              <InputFormControl
                label="Password"
                name={FormKeys.PASSWORD}
                type="password"
                placeholder="Enter your password"
                maxLength={20}
                required
              />

              <InputFormControl
                label="Confirm Password"
                name={FormKeys.CONFIRM_PASSWORD}
                type="password"
                placeholder="Re-enter your password"
                maxLength={20}
                required
              />

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                mt={4}
                width="100%"
                onClick={() => handleSubmit()}
              >
                Sign Up
              </Button>
            </Grid>
          )}
        </Formik>

        <Text mt={4} textAlign="center">
          By clicking "Sign Up", you agree to our Terms of Service and Privacy
          Policy.
        </Text>

        <Text mt={2} textAlign="center">
          Already have an account?{' '}
          <Link fontWeight={600} href="/login">
            Login
          </Link>
        </Text>
      </Box>

      {/* Right Side - Banner Image */}
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        display={{ base: 'none', md: 'flex' }}
        height="100vh"
        bg={"black"}
        color={"white"}
      >
        <Text fontSize="4xl">
          Cabric
        </Text>
        <Text fontSize="2xl">
          OSS Design Editor
        </Text>
      </Flex>
    </Grid>
  )
}

export default SignUp
