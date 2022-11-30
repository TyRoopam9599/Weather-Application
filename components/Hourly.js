import React, { useState, useEffect } from "react";
import { View, ActivityIndicator, LogBox, SafeAreaView, Text, FlatList, Image, StyleSheet, Button, Linking} from 'react-native';
import IonIcon from 'react-native-vector-icons/Ionicons';

export default function Hourly(coordinates) {

    const [loaded, setLoaded] = useState(true);
    const [Data, setData] = React.useState();
    const [dailyData, setDailyData] = React.useState();
    const [humidity, setHumidity] = React.useState();
    const [uv, setUV] = React.useState();
    const [visi, setVisi] = React.useState();
    const [pressure, setPressure] = React.useState();
    const [windspeed, setWindspeed] = React.useState();
    const [windgust, setWindgust] = React.useState();
    const [winddeg, setWinddeg] = React.useState();
    const [windicon, setWindicon] = React.useState();
    var sun1 = new Date(coordinates.sunrise * 1000).getHours();
    var sun2 = new Date(coordinates.sunset * 1000).getHours();
    var sun1su = sun1 > 12 ? "pm" : "am";
    var sun2su = sun2 > 12 ? "pm" : "am";
    const DData = [];
    const HData = [];

    const API_KEY = "Your API KEY";

    var count = 0, Dcount = 0;

    async function fetchHourlyData(coordinates) {
        setLoaded(false);
        const API = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude={hourly,daily}&appid=${API_KEY}&units=metric&lang=en`  // HOURLY DATA
        try {
            const response = await fetch(API);
            if (response.status == 200) {
                const res = await response.json();
                setHumidity(res.current.humidity);
                setWindgust(res.current.wind_gust);
                setWindspeed(res.current.wind_speed);
                setPressure(res.current.pressure);
                setVisi(res.current.visibility);
                var section = ['North', 'North-East', 'East', 'South-East', 'South', 'South-West', 'West', 'North-West'];
                var sectionicon = ["arrow-up", "arrow-up-right", "arrow-right", "arrow-down-right", "arrow-down", "arrow-down-left", "arrow-left", "arrow-up-left"];
                var degree = res.current.wind_deg + 22.5;
                if (degree < 0) {
                    degree = 360 - Math.abs(degree) % 360;
                }
                else {
                    degree = degree % 360;
                }
                var which = parseInt(degree / 45);
                setWindicon(sectionicon[which]);
                setWinddeg(section[which]);
                setUV(res.current.uvi);
                Object.entries(res.hourly).forEach(([value]) => {
                    const temp = res.hourly[value].temp
                    const des = res.hourly[value].weather[0].description
                    const desc = des.charAt(0).toUpperCase() + des.slice(1)
                    const icon = res.hourly[value].weather[0].icon
                    const date = new Date(res.hourly[value].dt * 1000).getDate();
                    const time = new Date(res.hourly[value].dt * 1000).getHours();
                    const month1 = new Date(res.hourly[value].dt * 1000).getMonth() + 1;
                    const month = month1 == 1 ? "Jan" : (month1 == 2 ? "Feb" : (month1 == 3 ? "Mar" : (month1 == 4 ? "Apr" : (month1 == 5 ? "May" : (month1 == 6 ? "Jun" : (month1 == 7 ? "Jul" : (month1 == 8 ? "Aug" : (month1 == 9 ? "Sep" : (month1 == 10 ? "Oct" : (month1 == 11 ? "Nov" : "Dec"))))))))))
                    const suffix = time > 12 ? "pm" : "am"
                    count = count + 1
                    const item = {
                        temp: temp,
                        suffix: suffix,
                        date: date,
                        desc: desc,
                        icon: icon,
                        month: month,
                        time: time,
                        count: count,
                    };
                    HData.push(item);
                    return HData;
                });
                setData(HData);
                Object.entries(res.daily).forEach(([value]) => {
                    const temp_max = res.daily[value].temp.max;
                    const temp_min = res.daily[value].temp.min;
                    const icon = res.daily[value].weather[0].icon;
                    const des = res.daily[value].weather[0].description;
                    const desc = des.charAt(0).toUpperCase() + des.slice(1);
                    const date = new Date(res.daily[value].dt * 1000).getDate();
                    const month1 = new Date(res.daily[value].dt * 1000).getMonth() + 1;
                    const day1 = new Date(res.daily[value].dt * 1000).getDay() + 1;
                    const day = day1 == 1 ? "Sun" : (day1 == 2 ? "Mon" : (day1 == 3 ? "Wed" : (day1 == 4 ? "Thu" : (day1 == 5 ? "Fri" : "Sat"))))
                    const month = month1 == 1 ? "Jan" : (month1 == 2 ? "Feb" : (month1 == 3 ? "Mar" : (month1 == 4 ? "Apr" : (month1 == 5 ? "May" : (month1 == 6 ? "Jun" : (month1 == 7 ? "Jul" : (month1 == 8 ? "Aug" : (month1 == 9 ? "Sep" : (month1 == 10 ? "Oct" : (month1 == 11 ? "Nov" : "Dec"))))))))))
                    Dcount = Dcount + 1
                    const item = {
                        temp_max: temp_max,
                        temp_min: temp_min,
                        icon: icon,
                        day: day,
                        Dcount: Dcount,
                        desc: desc,
                        month: month,
                        date: date,
                    };
                    DData.push(item);
                    return DData;
                });
                setDailyData(DData);
            }
            else {
                console.log("something wrong");
            }
            setLoaded(true);
        }
        catch {
            console.log(error);
        }
    }

    useEffect(() => {
        LogBox.ignoreLogs(["VirtualizedLists should never be nested"])
    }, [])

    const DItem = ({ temp_max, temp_min, icon, date, month, day, desc }) => (
        <View style={{ borderBottomWidth: 2, borderBottomColor: "lightblue" }}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", padding: 1 }}>
                <View >
                    <Text style={{ fontSize: 20, color: "white" }}>{desc} </Text>
                    <Text style={{ fontSize: 20, color: "white" }}>{day} {month} {date}</Text>
                </View>
                <View >
                    <Image style={styles.verysmallIcon}
                        source={{
                            uri: `http://openweathermap.org/img/wn/${icon}@2x.png`,
                        }} />
                </View>
                <View>
                    <Text style={{ textAlign: "center", justifyContent: 'center', fontSize: 20, color: "white" }}>{temp_max} °C</Text>
                    <Text style={{ textAlign: "center", justifyContent: 'center', fontSize: 20, color: "white" }}>{temp_min} °C</Text>
                </View>
            </View>
        </View>
    );

    const DrenderItem = ({ item }) => (
        <DItem temp_max={item.temp_max} temp_min={item.temp_min} icon={item.icon} desc={item.desc} day={item.day} date={item.date} month={item.month} />
    );

    const Item = ({ temp, icon, desc, suffix, date, time, month }) => (
        <View style={{ borderRightWidth: 2, borderRightColor: "lightblue" }}>
            <Text style={{ textAlign: "center", justifyContent: 'center', fontSize: 20, color: "white" }}>{temp} °C</Text>
            <Image
                style={styles.smallIcon}
                source={{
                    uri: `http://openweathermap.org/img/wn/${icon}@2x.png`,
                }}
            />
            <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>{desc}</Text>
            <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}>{time} {suffix}</Text>
            <Text style={{ fontSize: 20, textAlign: "center", color: "white" }}> {date} {month} </Text>
        </View>
    );

    const renderItem = ({ item }) => (
        <Item temp={item.temp} icon={item.icon} desc={item.desc} date={item.date} time={item.time} month={item.month} suffix={item.suffix} />
    );


    useEffect(() => {
        fetchHourlyData(coordinates)
    }, [])


    if (!loaded) {
        return (
            <View style={{ alignItems: "center", justifyContent: "center", flex: 2 }}>
                <ActivityIndicator color="lightblue" size={40} />
            </View>
        )
    }

    else if (HData === null) {
        console.log("ALL final data ; ", HData)
        return (
            <View>
                <Text style={styles.primaryText}>City Not Found! Try Different City{HData}</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={styles.container}>
            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginTop: 20, padding: 20, backgroundColor: "lightskyblue", borderRadius: 15, elevation: 25 }}>
               <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IonIcon name="earth" size={40} color="seagreen" style={{ paddingVertical: 11 }} />
                        <Text style={{ fontSize: 20, color: "white" }}> Latitude</Text>
                    </View>
                    <Text style={{ fontSize: 25, color: "white" }}>{coordinates.lat}°</Text>
                </View>
                <View style={{ height: '100%', width: 2, backgroundColor: "lightblue" }} />
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IonIcon name="earth" size={40} color="seagreen" style={{ paddingVertical: 11 }} />
                        <Text style={{ fontSize: 20, color: "white" }}> Longitude</Text>
                    </View>
                    <Text style={{ fontSize: 25, color: "white" }}>{coordinates.lon}°</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginTop: 20, padding: 20, backgroundColor: "lightskyblue", borderRadius: 15, elevation: 25 }}>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IonIcon name="md-water" size={40} color="dodgerblue" style={{ paddingVertical: 11 }} />
                        <Text style={{ fontSize: 20, color: "white" }}> Humidity</Text>
                    </View>
                    <Text style={{ fontSize: 25, color: "white" }}>{humidity}%</Text>
                </View>
                <View style={{ height: '100%', width: 2, backgroundColor: "lightblue" }} />
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IonIcon name="sunny-sharp" size={40} color="yellow" style={{ paddingVertical: 11 }} />
                        <Text style={{ fontSize: 20, color: "white" }}> UV Index</Text>
                    </View>
                    <Text style={{ fontSize: 25, color: "white" }}>{uv}</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginTop: 20, padding: 20, backgroundColor: "lightskyblue", borderRadius: 15, elevation: 25 }}>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IonIcon name="speedometer-sharp" size={40} color="slateblue" style={{ paddingVertical: 11 }} />
                        <Text style={{ fontSize: 20, color: "white" }}> Pressure</Text>
                    </View>
                    <Text style={{ fontSize: 25, color: "white" }}>{pressure} mBar</Text>
                </View>
                <View style={{ height: '100%', width: 2, backgroundColor: "lightblue" }} />
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IonIcon name="eye" size={40} color="mediumpurple" style={{ paddingVertical: 11 }} />
                        <Text style={{ fontSize: 20, color: "white" }}> Visibility</Text>
                    </View>
                    <Text style={{ fontSize: 25, color: "white" }}>{visi} meters</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginTop: 20, paddingVertical: 20, paddingHorizontal: 10, backgroundColor: "lightskyblue", borderRadius: 15, elevation: 25 }}>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IonIcon name="md-speedometer" size={30} color="seagreen" style={{ paddingVertical: 11 }} />
                        <Text style={{ fontSize: 20, color: "white" }}> Wind Speed </Text>
                    </View>
                    <Text style={{ fontSize: 25, color: "white" }}>{windspeed} m/s</Text>
                </View>
                <View style={{ height: '100%', width: 2, backgroundColor: "lightblue" }} />
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IonIcon name="arrow-up" size={30} color="red" style={{ paddingVertical: 11 }} />
                        <Text style={{ fontSize: 20, color: "white" }}> Wind Direction</Text>
                    </View>
                    <Text style={{ fontSize: 25, color: "white" }}>{winddeg}</Text>
                </View>
            </View>

            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <Text style={{ fontSize: 30, marginTop: 10, color: "white", fontWeight: "500" }}>Hourly</Text>
            </View>
            <View style={{ justifyContent: "space-between", marginHorizontal: 20, marginTop: 20, padding: 10, backgroundColor: "lightskyblue", borderRadius: 15, elevation: 25 }}>
                <View style={{ marginHorizontal: 10 }}>
                    <FlatList
                        style={{ marginTop: 5 }}
                        horizontal={true}
                        data={Data}
                        renderItem={renderItem}
                        keyExtractor={item => item.count}
                    />
                </View>
                <View>
                    <Text style={{ textAlign: "center", fontSize: 25, fontWeight: "500", marginTop: 10, color: "white", backgroundColor: 'steelblue', borderRadius: 15 }}>48 Hours</Text>
                </View>
            </View>

            <View style={{ flexDirection: "row", justifyContent: "space-between", marginHorizontal: 20, marginTop: 30, padding: 20, backgroundColor: "lightskyblue", borderRadius: 15, elevation: 25 }}>
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IonIcon name="md-water" size={40} color="dodgerblue" style={{ paddingVertical: 11 }} />
                        <Text style={{ fontSize: 20, color: "white" }}> Sunrise</Text>
                    </View>
                    <Text style={{ fontSize: 25, color: "white" }}> {sun1} {sun1su}</Text>
                </View>
                <View style={{ height: '100%', width: 2, backgroundColor: "lightblue" }} />
                <View style={{ justifyContent: 'center', alignItems: "center" }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <IonIcon name="sunny-sharp" size={40} color="yellow" style={{ paddingVertical: 11 }} />
                        <Text style={{ fontSize: 20, color: "white" }}> Sunset</Text>
                    </View>
                    <Text style={{ fontSize: 25, color: "white" }}>{sun2} {sun2su}</Text>
                </View>
            </View>

            <View style={{ marginHorizontal: 20, marginTop: 20 }}>
                <Text style={{ fontSize: 30, marginTop: 10, color: "white", fontWeight: "500" }}>7 Days</Text>
            </View>

            <View style={{ justifyContent: "space-between", marginHorizontal: 20, marginVertical: 20, padding: 3, backgroundColor: "lightskyblue", borderRadius: 15, elevation: 25 }}>
                <View style={{ marginHorizontal: 10 }}>
                    <FlatList
                        style={{ marginTop: 5 }}
                        data={dailyData}
                        scrollEnabled={false}
                        renderItem={DrenderItem}
                        keyExtractor={item => item.Dcount}
                    />
                </View>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignContent: "center"
    },

    item: {
        backgroundColor: 'white',
        padding: 5,
        borderWidth: 2,
        elevation: 25,
        borderRadius: 20,
        marginVertical: 5,
        borderColor: "",
        marginHorizontal: 4,
    },

    title: {
        fontSize: 25,
        textAlign: "center"
    },

    primaryText: {
        margin: 20,
        fontSize: 28,
    },

    smallIcon: {
        width: 100,
        justifyContent: "center",
        height: 100,
        marginLeft: 8
    },
    
    verysmallIcon: {
        width: 60,
        height: 60,
    }
});