import React from 'react'
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  ImageBackground,
  View
} from 'react-native'

import SearchInput from './components/SearchInput'

import getImage from './utils/ImagesForWeather'
import { fetchLocationId, fetchWeather } from './utils/api'

export default class App extends React.Component{

  state = {
    loading: false,
    error: false,
    location: '',
    temperature: 0,
    weather: ''
  }

  componentDidMount() {
    this.handleUpdateLocation('São Paulo')
  }

  handleUpdateLocation = city => {
    if (!city) return
    this.setState({loading: true}, async () => {
      try{
        const locationId = await fetchLocationId(city)
        const { location, weather, temperature } = await fetchWeather(locationId)
        this.setState({
          loading: false,
          error: false,
          location,
          weather,
          temperature
        })

      } catch (e){
        this.setState({loading: false, error: true})
      }
    })
  }

  renderContent() {

    const { error } = this.state
    return(
      <View>
        {error && (
          <Text style = {[styles.smallText, styles.textStyle]}>
          Could not load weather, please try a different city.
          </Text>
        )}

        {!error && this.renderInfo() }
          <SearchInput
          placeholder = "Search any City:  "
          onSubmit = {this.handleUpdateLocation}
          />
      </View>
    )

  }

  renderInfo() {
    const { location, temperature, weather } = this.state
    return(
      <View>
        <Text style = {[styles.largeText, styles.textStyle]}>{location} </Text>
        <Text style = {[styles.smallText, styles.textStyle]}>{weather} </Text>
        <Text style = {[styles.largeText, styles.textStyle]}>
          {`${Math.round(temperature)}°`}
        </Text>
      </View>
    )
  }

  render(){
    const { loading, weather } = this.state
    return(
      <View style = {styles.container}>
        <ImageBackground
          source = {getImage(weather)}
          style = {styles.imageContainer}
          imageStyle = {styles.image}
        >
        <View style = {styles.detailsContainer}>
        <ActivityIndicator animating = {loading} color = 'white' size = 'large'/>

        {!loading && this.renderContent()}
        </View>
      </ImageBackground>
    </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageContainer: {
    flex: 1
  },

  image: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: 'cover'
  },

  largeText: {
    fontSize: 40,
    fontWeight: 'bold'
  },

  smallText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: 'steelblue'
  },

  textStyle: {
    textAlign: 'center',
    color: 'white'
  },

  detailsContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  }
})