import React, { useState, useEffect, useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import BackButtonMap from '../components/BackButtonMap'
import CheckBox from 'react-native-check-box'
import { getStatusBarHeight } from 'react-native-status-bar-height'
import Fetching from '../helpers/Fetching';
import { TContext } from '../state/context';

export default function Mapa({ navigation }) {
    const [data, setData] = useState([])
    const { Tracer } = Fetching()
    ///////////////////////////////////////////////////
    const { user } = useContext(TContext)
    const [userValue, setUserValue] = user

    ///////////////////////////////////////////////////

    useEffect(() => {
       // console.log(userValue)
        //let brojac=0.0005
        const intervalId = setInterval(async () => {
            setData(await Tracer(userValue.id))
            // console.log(await Tracer(1111))
            // console.log(data)
            // brojac+=0.00055
            // let x=brojac+44.8120
            // setData([{id:1,x:x,y:20.4601,name:'test',email:'test@test'}])
        }, 5000)
        return () => clearInterval(intervalId);
    }, [])
    useEffect(() => {
        const Funkcija = async () => {
            setData(await Tracer(userValue.id))
        }
        Funkcija()
    }, [])
    return (
        <View
        style={styles.container}
        >
        <MapView
            style={styles.map}
            initialRegion={{
                latitude: 44.8125,
                longitude: 20.4612,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
        >
            {data.map(m => (
                <Marker key={m.id}
                    pinColor={m.pinColor}
                    coordinate={{ latitude: m.locationX, longitude: m.locationY }}
                    title={m.email}
                    description={m.time}
                />
            ))}

        </MapView>
        <TouchableOpacity style={{position:'absolute',left:0,top:0}}>
            <BackButtonMap goBack={navigation.goBack} />
            </TouchableOpacity>
                        <View style={styles.list}>
                {data.map(m => (
                    <View style={styles.row} key={m.id}>
                        <CheckBox
                            checkBoxColor={m.pinColor}
                            isChecked={true}
                        />
                        <Text style={{ textTransform: 'capitalize' }}>{m.name}</Text>
                        <View style={styles.status}></View>
                    </View>
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
      },
      map: {
        ...StyleSheet.absoluteFillObject,
      },
      overlay: {
        position: 'absolute',
        bottom: 50,
        backgroundColor: 'rgba(255, 255, 255, 1)',
      },
    mapContainter: {
        width: '100%',
        height: '100%',
        borderRadius: 5
    },
    list: {
        backgroundColor: '#FFF',
        opacity: 0.8,
        position: 'absolute',
        top: 55 + getStatusBarHeight(),
        right: 5,
        borderRadius: 5,
        height: 200,
        width: 100,
        overflow: 'scroll'
    },
    row: {
        alignItems: 'center',
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    status: {
        width: 10,
        height: 10,
        borderRadius: 5,
        backgroundColor: 'green',
        marginRight: 5
    }
});
