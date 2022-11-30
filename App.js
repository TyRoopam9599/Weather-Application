import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';
import Display from './components/Display';
import SearchBar from './components/SearchBar';
import Hourly from './components/Hourly';

const API_KEY = "Your API KEY";

export default function App() {

  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);

  async function fetchWeatherData(cityName) {
    setLoaded(false);
    const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=metric`
    try {
      const response = await fetch(API);
      if (response.status == 200) {
        const data = await response.json();
        setWeatherData(data);
      }
      else {
        setWeatherData(null);
      }
      setLoaded(true);
    }
    catch {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeatherData('noida')
  }, [])

  if (!loaded) {
    return (
      <View style={{ alignItems: "center", justifyContent: "center", flex: 2 }}>
        <ActivityIndicator color="lightblue" size={40} />
      </View>
    )
  }

  else if (weatherData === null) {
    return (
      <View>
        <SearchBar fetchWeatherData={fetchWeatherData} />
        <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
      </View>
    )
  }

  return (
    <ScrollView nestedScrollEnabled={true} >
      <Display weatherData={weatherData} fetchWeatherData={fetchWeatherData} />
      <View style={{ flex: 1, height: 1, backgroundColor: 'black' }}>
        <Hourly />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  primaryText: {
    margin: 20,
    fontSize: 28,
  },
});