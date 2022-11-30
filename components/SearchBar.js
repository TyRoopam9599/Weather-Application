import React, { useState } from 'react' ;
import {View ,TextInput ,StyleSheet ,Dimensions, TouchableOpacity} from 'react-native' ;
import IonIcon from 'react-native-vector-icons/Ionicons' ;

export default function SearchBar({fetchWeatherData}) {
    
    const [cityName,setCityName] = useState('') ;
    
    return (
        <View style={styles.searchbar}>
            <TouchableOpacity style={{flexDirection:'row'}}>
            <IonIcon name="search" size={25} color="black" style={{alignItems:"flex-end", paddingVertical:11}}  onPress={() => fetchWeatherData(cityName)}/>
             <TextInput style={{fontSize:20,paddingLeft:10}}
               placeholder ="Locations"
               placeholderTextColor="black"
               value={cityName} 
               keyboardType = "default"
               onChangeText={(text) => setCityName(text)}
               
            /> 
            </TouchableOpacity>
        </View>
    ) ;
}
const styles = StyleSheet.create({
    searchbar : {
        marginTop :10,
        marginHorizontal:10,
        alignItems:"stretch",
        borderWidth :0.5 ,
        paddingVertical :3 ,
        borderRadius: 15 ,
        width:'96%',
        alignContent:'stretch',
        paddingHorizontal :8,
        backgroundColor:"white" ,
        borderColor :"black",
        elevation : 25,
    },
   
});