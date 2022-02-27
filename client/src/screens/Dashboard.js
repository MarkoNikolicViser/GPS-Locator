import React, { useContext,useEffect } from 'react'
import Background from '../components/Background'
import Logo from '../components/Logo'
import Header from '../components/Header'
import Paragraph from '../components/Paragraph'
import Button from '../components/Button'
import LargeButton from '../components/LargeButton'
import { TContext } from '../state/context'

export default function Dashboard({ navigation }) {
  ///////////////////////////////////////////
  const {user}=useContext(TContext)
  const [userValue,setUserValue]=user
  ///////////////////////////////////////////

  useEffect(() => {
    console.log(userValue)
  }, [])
  return (
    <Background>
      <Logo />
      <Header>Mobilni lokator</Header>
      <Paragraph>
        Odaberi da li želiš da pratiš nekoga, ili da nekom dodeliš pravo da te prati.
      </Paragraph>
      <LargeButton mode="outlined"
        onPress={() => navigation.navigate('AlowTracking')}
      >Dozvoli da te neko prati</LargeButton>
      <LargeButton mode="outlined"
        onPress={() => navigation.navigate('Zahtev')}
      >Prati nekoga</LargeButton>

      <Button
        mode="contained"
        onPress={() => navigation.navigate('Map')}
      >
        Mapa
      </Button>
      <Button
        mode="outlined"
        onPress={() =>{
          navigation.reset({
            index: 0,
            routes: [{ name: 'StartScreen' }],
          });
        setUserValue({id:''})
        }
        }
      >
        Logout
      </Button>
    </Background>
  )
}