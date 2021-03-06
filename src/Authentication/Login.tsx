import React, { useRef } from "react";
import { TextInput as RNTextInput } from "react-native";
import { useFormik } from "formik";
import * as Yup from "yup";
import { BorderlessButton } from "react-native-gesture-handler";
import { CompositeNavigationProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

import { Container, Box, Button, Text } from "../components";
import { AuthenticationRoutes, AppRoutes } from "../components/Navigation";
import TextInput from "../components/Form/TextInput";
import Checkbox from "../components/Form/Checkbox";

import Footer from "./components/Footer";

const LoginSchema = Yup.object().shape({
  email: Yup.string().email("invalid email").required(),
  password: Yup.string().min(6).required(),
});

interface LoginProps {
  navigation: CompositeNavigationProp<
    StackNavigationProp<AuthenticationRoutes, "Login">,
    StackNavigationProp<AppRoutes>
  >;
}

const Login = ({ navigation }: LoginProps) => {
  const {
    handleChange,
    handleBlur,
    handleSubmit,
    values,
    errors,
    touched,
    setFieldValue,
  } = useFormik({
    validationSchema: LoginSchema,
    initialValues: { email: "", password: "", remember: false },
    onSubmit: () => navigation.navigate("Home"),
  });
  const password = useRef<RNTextInput>(null);

  const footer = (
    <Footer
      title="Don't have an account?"
      action="Sign Up here"
      onPress={() => navigation.navigate("SignUp")}
    />
  );

  return (
    <Container pattern={0} {...{ footer }}>
      <Box padding="xl">
        <Text variant="title1" textAlign="center" marginBottom="l">
          Welcome back
        </Text>
        <Text variant="body" textAlign="center" marginBottom="l">
          Use your credentials below and login to your account
        </Text>
        <Box>
          <Box marginBottom="m">
            <TextInput
              icon="mail"
              placeholder="Enter your Email"
              onChangeText={handleChange("email")}
              onBlur={handleBlur("email")}
              error={errors.email}
              touched={touched.email}
              autoCompleteType="email"
              autoCapitalize="none"
              returnKeyType="next"
              returnKeyLabel="next"
              onSubmitEditing={() => password.current?.focus()}
            />
          </Box>
          <TextInput
            ref={password}
            icon="lock"
            placeholder="Enter your Password"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            error={errors.password}
            touched={touched.password}
            autoCapitalize="none"
            returnKeyType="go"
            returnKeyLabel="go"
            onSubmitEditing={() => handleSubmit()}
            secureTextEntry
          />
          <Box
            flexDirection="row"
            justifyContent="space-between"
            marginVertical="s"
          >
            <Checkbox
              label="Remember me"
              checked={values.remember}
              onChange={() => setFieldValue("remember", !values.remember)}
            />
            <BorderlessButton
              onPress={() => navigation.navigate("ForgotPassword")}
            >
              <Text variant="button" color="primary">
                Forgot password
              </Text>
            </BorderlessButton>
          </Box>
          <Box alignItems="center" marginTop="m">
            <Button
              variant="primary"
              label="Login to your account"
              onPress={handleSubmit}
            />
          </Box>
        </Box>
      </Box>
    </Container>
  );
};

export default Login;
