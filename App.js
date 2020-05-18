import React from 'react';
import { SafeAreaView, StyleSheet, ScrollView, View, Text, TouchableHighlight, TextInput, Alert } from 'react-native';
import axios from 'axios'

class App extends React.Component{
    constructor(){
        super()
        this.state = {
            pokemons: [],
            txtInput: '',
            isEmpty: true
        }
    }

    getType = () => {
        axios.get(`https://pokeapi.co/api/v2/type/${this.state.txtInput}`)
            .then(res => {
                //console.log(res.data)
                res.data.pokemon.map( poke => {
                    this.state.pokemons.push(poke.pokemon.name.toUpperCase())
                })
                
                if (this.state.pokemons == []) {
                    this.setState({isEmpty: true})
                }else{
                    this.setState({isEmpty: false})
                }
            })

            .catch(err => {
                Alert.alert('Erro: '+err);
            })
    }
    
    render(){
        return (
            <SafeAreaView style={styles.safe}>
                <View style={styles.container}>
                    <TextInput
                        style={styles.textInput}
                        placeholder='Digite o tipo do Pokémon'
                        onChangeText={input => {this.setState({txtInput: input})}}
                        value={this.state.txtInput}
                    />
                    <TouchableHighlight 
                        style = {styles.button} 
                        onPress={this.getType}
                    >
                        <Text style={styles.buttonText}>Buscar</Text>
                    </TouchableHighlight>
                </View>
                <ScrollView style={styles.sv}>
                    <Text style={styles.textSV}>
                        {!this.state.isEmpty && this.state.pokemons.sort().join('\n')}
                    </Text>
                </ScrollView>
            </SafeAreaView>
        )
    }
}

const styles = StyleSheet.create({
    safe: {
        flex: 1,
        backgroundColor: 'red'
    },
    container: {
        margin: 30,
    },
    button: {
        backgroundColor: 'blue',
        margin: 10
    },
    buttonText: {
        textAlign: "center",
        color: 'white',
    },
    textInput: {
        height: 40,
        borderWidth: 1,
        borderColor: 'blue',
        backgroundColor: 'lightblue'
    },
    sv: {
        marginHorizontal: 30,
        marginBottom: 50,
    },
    textSV: {
        color: 'yellow',
        textAlign: 'center',
        fontSize: 18
    }
});

export default App;
