import React, { useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, Switch } from 'react-native'
import { Table, Row } from 'react-native-table-component';
import { theme } from '../core/theme'
import Fetching from '../helpers/Fetching';
import { TContext } from '../state/context';

const ListElement = ({ element, index, setAllTracers }) => {
    ///////////////////////////////////////////
    const {user}=useContext(TContext)
    const [userValue, setUserValue]=user
    ///////////////////////////////////////////

    const { GetAllTracers,ConstraintsUpdate } = Fetching()
    const toggleSwitch = async () => {
        await ConstraintsUpdate(element.id, element.allow?0:1)
        setAllTracers(await GetAllTracers(userValue.locationId))
    }

    return (
        <View style={index % 2 ? styles.rowShadow : styles.rowBlank}>
            <Text style={{ width: '33.3%', textAlign: 'center' }}>{element.email}</Text>
            <Text style={{ width: '33.3%', textAlign: 'center' }}>{element.name}</Text>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', height: 5 }}>
                <Switch
                    trackColor={{ false: 'red', true: 'rgba(142, 221, 155,0.7)' }}
                    thumbColor={element.allow ? theme.colors.primary : theme.colors.error}
                    ios_backgroundColor="#3e3e3e"
                    onValueChange={toggleSwitch}
                    value={element.allow ? true : false}
                />
            </View>
        </View>
    )
}


const TracersList = ({ allTracers, setAllTracers }) => {

    const state = {
        tableH: ['Korisnici koji imaju pristup vašoj lokaciji'],
        tableHead: ['Email', 'Korisničko ime', 'Dozvola'],

    }
    return (
        <View style={styles.container}>
            <Table borderStyle={{ borderWidth: 1.5, borderColor: theme.colors.primary }}>
                <Row data={state.tableH} style={styles.head} textStyle={styles.text} />
                <Row data={state.tableHead} style={styles.head} textStyle={styles.text} />
            </Table>
            <ScrollView persistentScrollbar={true} style={{ height: 150 }}>
                {allTracers.map((m, index) => (
                    <ListElement key={index} element={m} index={index} setAllTracers={setAllTracers} />
                ))}
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: { paddingTop: 30, backgroundColor: '#fff', width: '100%' },
    head: { height: 30, backgroundColor: 'rgba(142, 221, 155,0.2)' },
    text: { margin: 6, textAlign: 'center' },
    rowShadow: { flexDirection: 'row', height: 40, alignItems: 'center', width: '100%', textAlign: 'center', backgroundColor: 'rgba(142, 221, 155,0.2)' },
    rowBlank: { flexDirection: 'row', height: 40, alignItems: 'center', width: '100%', textAlign: 'center', backgroundColor: '#FFF' }
});
export default TracersList