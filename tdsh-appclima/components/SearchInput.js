import React from 'react'
import {
  StyleSheet,
  TextInput,
  View
} from 'react-native'

import PropTypes from 'prop-types'

export default class SearchInput extends React.Component {
  state = {
    text: ""
  }

  handleSubmitEditing = () => {
    const {onSubmit} = this.props
    const {text} = this.state

    if(!text) return
    onSubmit(text)
    this.setState({text: ''})
  }

  render(){
    const {placeholder} = this.props
    const {text} = this.state
    return(
      <View style = {styles.container}>
      <TextInput
        style = {styles.input}
        value = {text}
        placeholder = {placeholder}
        placeholderTextColor = 'white'
        onChangeText = {text => this.setState({text})}
        onSubmitEditing = {this.handleSubmitEditing}
      />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5
  },
  input: {
    flex: 1,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 16
  }
})

SearchInput.propTypes = {
  onSubmit: PropTypes.func.isRequired,
  placeholder: PropTypes.string
}

SearchInput.defaultProps = {
  placeholder: ''
}