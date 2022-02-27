import React, { useContext, useState } from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { Text } from 'react-native-paper'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Button from '../components/Button'
import TextInput from '../components/TextInput'
import BackButton from '../components/BackButton'
import { theme } from '../core/theme'
import { emailValidator } from '../helpers/emailValidator'
import { passwordValidator } from '../helpers/passwordValidator'
import { nameValidator } from '../helpers/nameValidator'
import Fetching from '../helpers/Fetching'
import { TContext } from '../state/context'

export default function RegisterScreen({ navigation }) {
  const [name, setName] = useState({ value: '', error: '' })
  const [email, setEmail] = useState({ value: '', error: '' })
  const [password, setPassword] = useState({ value: '', error: '' })
  const [existError, setExistError] = useState('')
  const { Register,Login,InsertLocation } = Fetching()
////////////////////////////////////////////////////////
const {user}=useContext(TContext)
const [userValue,setUserValue]=user
////////////////////////////////////////////////////////
  const onSignUpPressed = async () => {
    const nameError = nameValidator(name.value)
    const emailError = emailValidator(email.value)
    const passwordError = passwordValidator(password.value)
    if (emailError || passwordError || nameError) {
      setName({ ...name, error: nameError })
      setEmail({ ...email, error: emailError })
      setPassword({ ...password, error: passwordError })
      return
    }
    const registerData = await Register(name.value, email.value, password.value)
    if (!registerData.userId) {
      if (registerData.err.errno == 1062)
        setExistError('Ovaj mail već ima registrovan nalog')
      return
    }
    await InsertLocation(registerData.userId)
    const loginData=await Login(email.value, password.value)
    setUserValue(loginData[0])
    navigation.reset({
      index: 0,
      routes: [{ name: 'Dashboard' }],
    })
  }

  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <Logo />
      <Header>Napravi nalog</Header>
      <TextInput
        label="Ime"
        returnKeyType="next"
        value={name.value}
        onChangeText={(text) => setName({ value: text, error: '' })}
        error={!!name.error}
        errorText={name.error}
      />
      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={(text) => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
        textContentType="emailAddress"
        keyboardType="email-address"
      />
      <TextInput
        label="Lozinka"
        returnKeyType="done"
        value={password.value}
        onChangeText={(text) => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
      {existError ? (<>
        <Text style={{color:'red'}}>{existError}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('ResetPasswordScreen')}>
          <Text style={styles.forgot}>Zaboravio/la si lozinku?</Text>
        </TouchableOpacity>
      </>) : (null)}
      <Button
        mode="contained"
        onPress={onSignUpPressed}
        style={{ marginTop: 24 }}
      >
        Registruj se
      </Button>
      <View style={styles.row}>
        <Text>Već imaš nalog? </Text>
        <TouchableOpacity onPress={() => navigation.replace('LoginScreen')}>
          <Text style={styles.link}>Uloguj se</Text>
        </TouchableOpacity>
      </View>
    </Background>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
  forgot: {
    fontSize: 13,
    color: theme.colors.secondary,
  },
})
