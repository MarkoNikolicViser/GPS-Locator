import React, { useContext, useEffect, useState } from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'
import TextInput from '../components/TextInput'
import Button from '../components/Button'
import Fetching from '../helpers/Fetching'
import useFetchValidators from '../helpers/useFetchValidators'
import { TContext } from '../state/context'
import { Alert } from 'react-native'
import TracersList from '../components/TracersList'

function AlowTracking({ navigation }) {
  ///////////////////////////////////////////
  const { user } = useContext(TContext)
  const [userValue, setUserValue] = user
  ///////////////////////////////////////////
  const { Tracking, GetAllTracers } = Fetching()
  const { UserExist,AllreadyFollowing } = useFetchValidators()
  const [userId, setUserId] = useState({ id: '', error: '' })
  const [allTracers, setAllTracers]=useState([])
  const TrackingValidator = async () => {
    const userExist = await UserExist(userId.id)

    if (!userExist.length) {
      setUserId({ ...userId, error: 'Korisnik ne postoji' })
      return
    }
    const userName = userExist[0].name;
    const userNameToUpper = userName[0].toUpperCase() + userName.substring(1);
    const userAllreadyFollowed= await AllreadyFollowing(userValue.locationId, userId.id)
    if (userAllreadyFollowed.length) {
      setUserId({ ...userId, error: `Korisnik ${userNameToUpper} već vidi vašu lokaciju` })
      return
    }
    setUserId({ ...userId, error: '' })
    Alert.alert(
      "Dozvola Praćenja",
      `Da li želite da korisnik ${userNameToUpper} vidi vašu lokaciju?`,
      [
        {
          text: "Odbij",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Potvrdi", onPress: async () => await Tracking(userId.id, userValue.locationId) }
      ])
  }
useEffect(() => {
  const Funkcija=async()=>{
    setAllTracers(await GetAllTracers(userValue.locationId))
  }
  Funkcija()
}, [])
  return (
    <Background>
      <BackButton goBack={navigation.goBack} />
      <TextInput
        onChangeText={(e) => setUserId({ ...userId, id: e })}
        label="ID Korisnika"
        returnKeyType="done"
        value={userId.id}
        error={!!userId.error}
        errorText={userId.error}
        keyboardType="numeric"
      />
      <Button onPress={TrackingValidator} mode="contained">Dozvoli Praćenje</Button>
      <TracersList allTracers={allTracers} setAllTracers={setAllTracers}/>
    </Background>
  )
}

export default AlowTracking