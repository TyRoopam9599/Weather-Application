import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Image, Dimensions, ScrollView } from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';
import SearchBar from './SearchBar';
import Hourly from './Hourly';

export default function Display({ weatherData, fetchWeatherData }) {

    const { weather, name, dt, sys: { sunrise, sunset }, main: { temp, humidity, temp_max, temp_min, pressure, feels_like }, wind: { speed, deg }, coord: { lon, lat } } = weatherData;
    const [{ icon }] = weather;
    const [{ main }] = weather;
    var localtime = new Date(dt * 1000).getHours();
    var date = new Date(dt * 1000).toDateString();
    var suffix = localtime > 12 ? "pm" : "am"

    useEffect(() => {
    }, [weatherData]);

    return (
       <View style={{backgroundColor:"cornflowerblue"}}>
            <SearchBar fetchWeatherData={fetchWeatherData} />
            <View>
                <ScrollView horizontal style={{ flexDirection: 'row', width: Dimensions.get('screen').width }}>
                    <View>
                        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center", marginHorizontal: 80, marginTop: 10 }}>
                            <IonIcon name="location" size={30} color="red" style={{ paddingVertical: 11 }} />
                            <Text style={{ fontSize: 30, marginTop: 10, color: "white", fontWeight: "600" }}>{name}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center" }}>
                            <Text style={{ fontSize: 20, marginTop: 5, color: "white", fontWeight: "400", marginHorizontal: 80 }}>{date} {localtime} {suffix}</Text>
                        </View>
                        <View style={{ flexDirection: "row", justifyContent: 'center', alignItems: "center", marginTop: -20 }}>
                            <Image
                                style={{ width: 120, height: 150 }}
                                source={{
                                    uri: `http://openweathermap.org/img/wn/${icon}@2x.png`,
                                }}
                            />
                            <Text style={{ fontSize: 30, marginTop: 10, color: "white", fontWeight: "600" }}> {temp}°C</Text>
                        </View>
                        <View style={{justifyContent: 'center', alignItems: "center" ,marginTop:-20}}>
                        <Text style={{fontSize: 25, marginTop: 5, color: "white", fontWeight: "600", marginHorizontal: 80 }}>{main}</Text>
                            <Text style={{fontSize: 20, marginTop: 5, color: "white", fontWeight: "500", marginHorizontal: 80}}> {temp_max}°C / {temp_min} °C </Text>
                            <Text style={{fontSize: 20, marginTop: 5, color: "white", fontWeight: "500", marginHorizontal: 80 }}>Feels Like : {feels_like} °C</Text>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <Hourly lat={lat} lon={lon} sunrise={sunrise} sunset={sunset} />
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        paddingLeft: 10,
        borderWidth: 1,
        borderBottomColor: "red",
        width: "96%",
        justifyContent: "center",
        alignContent: "center",
        borderRadius: 25,
        marginLeft: 8,
        elevation: 25,

    },
    largeIcon: {
        width: 225,
        height: 180,
    },
    backgroundImage: {
        flex: 1,
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height,
    },
    headerText: {
        fontSize: 36,
        fontFamily: "Roboto Medium",
        marginTop: 10
    },
    info: {
        width: Dimensions.get('screen').width / 2.9,
        backgroundColor: 'black',
        padding: 5,
        borderWidth: 3,
        borderColor: "#2AAA8A",
        borderRadius: 25,
        justifyContent: "center",
    },
    extraInfo: {
        flexDirection: "row",
        marginTop: 15,
        justifyContent: "space-between",
        padding: 5
    }
});