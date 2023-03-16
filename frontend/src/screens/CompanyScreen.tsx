import React, { memo, useEffect } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import BackButton from '../components/BackButton';
import Paragraph from '../components/Paragraph';
import { Navigation } from '../types';
import TextInput from '../components/TextInput';
import { FlatList } from 'react-navigation';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

type Props = {
  navigation: Navigation;
};




const CompanyScreen = ({ navigation }: Props) => {

    const [companies , setCompanies] = React.useState([]);
    const [companySearch, setCompanySearch] = React.useState([]);
    const [query, setQuery] = React.useState('');


    useEffect(() => {
        const options:any = {
            method: 'GET',
            url: 'http://192.168.10.23:5000/api/mfn/company',
            headers: {
                'Content-Type': 'application/json',
            },
        };
        axios.request(options).then(function (response) {
            setCompanies(response.data);
            setCompanySearch(response.data);
            console.log(response.data);
            
        }
        ).catch(function (error) {
            console.error(error);
        }
        );
    }, []);

    const searchFunc = (text: string) => {
        if(text === '') {
            setQuery(text);
            setCompanySearch(companies);
        }else{
            setQuery(text);
            setCompanySearch(companies.filter((item:any) => item.rs.toLowerCase().includes(text.toLowerCase())));
        }
    }


    return (
        <Background>
            <BackButton goBack={() => navigation.navigate('HomeScreen')} />
            <Header>Search Company</Header>
            <TextInput
                label="Company Name"
                returnKeyType="next"
                value={query}
                onChangeText={(text) => searchFunc(text)}
            />

            <FlatList
                data={companySearch}
                renderItem={({item}) => (
                    <View >
                        <Text style={styles.searchResults}>{item.rs}</Text>
                    </View>
                )}
                keyExtractor={(item:any) => item._id}
            />



        </Background>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    TextInput: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    searchResults: {
        fontSize: 20,
        marginBottom: 10,
        textAlign: 'center',
    },
});


export default memo(CompanyScreen);