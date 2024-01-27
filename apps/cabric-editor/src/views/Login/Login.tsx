import React from 'react'
import { Box, Button, Text, Image, Link, Grid } from '@chakra-ui/react'
import { Formik } from 'formik'
import * as Yup from 'yup'
import { toast } from '~/themes/defaultTheme'
import { InputFormControl } from '~/components/Forms/FormInput'
import useAuth from '~/providers/AuthProvider'

// Define an enum for form keys
enum FormKeys {
  EMAIL = 'email',
  PASSWORD = 'password',
}

const LogIn: React.FC = () => {
  const initialValues = {
    [FormKeys.EMAIL]: '',
    [FormKeys.PASSWORD]: '',
  }

  const validationSchema = Yup.object({
    [FormKeys.EMAIL]: Yup.string()
      .email('Invalid email address')
      .required('Email is required'),
    [FormKeys.PASSWORD]: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  })

  const { login } = useAuth()

  return (
    <Grid
      templateColumns={{ base: '1fr', md: '5fr 6fr' }}
      gap={4}
      height="100vh"
      alignItems="center"
      justifyContent="center"
    >
      {/* Left Side - Form */}
      <Box
        width="100%"
        padding={4}
        borderRadius="md"
        backgroundColor="white"
        px={8}
      >
        <Text fontSize="2xl" mb={4} textAlign="center">
          Login
        </Text>

        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={async (values, { setSubmitting }) => {
            setSubmitting(true)
            try{ 
              await login(values.email, values.password)
              toast({
                title: 'Login successful',
                description: 'You have successfully logged in',
                status: 'success',
                duration: 9000,
                isClosable: true,
              }) 
            } catch (error) { 
              toast({
                title: 'Login failed',
                description: (error as Error).message,
                status: 'error',
                duration: 9000,
                isClosable: true,
              }) 
            }

          }}
        >
          {({ handleSubmit }) => (
            <Grid gap={4}>
              {/* Use InputFormControl for each input field */}

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

              <Button
                type="submit"
                colorScheme="teal"
                size="lg"
                mt={4}
                width="100%"
                onClick={() => handleSubmit()}
              >
                Login
              </Button>
            </Grid>
          )}
        </Formik>

        <Text mt={2} textAlign="center">
          Don't have an account?{' '}
          <Link fontWeight={600} href="/signup">
            Sign Up
          </Link>
        </Text>
      </Box>

      {/* Right Side - Banner Image */}
      <Image
        // src={IMAGES.SIGNUP_BANNER}
        alt="Banner"
        boxSize="100%"
        objectFit="cover"
        display={['none', 'block']}
        height={{ base: '0', md: '100vh' }}
      />
    </Grid>
  )
}

export default LogIn
