import React from 'react'
import Background from '../components/Background'
import BackButton from '../components/BackButton'

function ZahtevZaPracenje({navigation}) {
    return (
        <Background>
                  <BackButton goBack={navigation.goBack} />
        </Background>
    )
}

export default ZahtevZaPracenje
