import React, {useEffect, useState} from 'react';
import { View, Image, Text, TouchableOpacity,Linking } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation,useRoute } from '@react-navigation/native';
import style from './styles';
import logoImg from '../../assets/logo.png';
import * as MailComposer from 'expo-mail-composer';

export default function Detail() {
    const navigation = useNavigation();
    const route = useRoute();
    const incident = route.params.incident;

    const message = `Olá ${incident.name}, estou entrando em contato pois gostaria de ajudar no caso "${incident.title}" com ${Intl.NumberFormat('pt-BR',{
        style:'currency', 
        currency:'BRL'
    }).format(incident.value)}`

    function navigationToIncidents() {
        navigation.navigate('Incidents');
    }

    function sendMail(){
        MailComposer.composeAsync({
            subject:`Heroi do caso: ${incident.title}`,
            recipients:[incident.email],
            body:message
        })
    }

    function sendWhatsApp(){
        Linking.openURL(`whatsapp://send?phone=${incident.whatsapp}&text=${message}`);
    }

    return (
        <View style={style.container}>
            <View style={style.header}>
                <Image source={logoImg} />
                <TouchableOpacity
                    style={style.detailsButton}
                    onPress={navigationToIncidents}
                >
                    <Feather name="arrow-left" size={30} color="#E02041" />
                </TouchableOpacity>
            </View>
            <View style={style.incidentList}>
                <View style={style.incident}>
                    <Text style={[style.incidentProperty,{marginTop:0}]}>ONG:</Text>
                    <Text style={style.incidentvalue}>{incident.name} de {incident.city} / {incident.uf}</Text>

                    <Text style={style.incidentProperty}>CASO:</Text>
                    <Text style={style.incidentvalue}>{incident.title}</Text>

                    <Text style={style.incidentProperty}>Descrição:</Text>
                    <Text style={style.incidentvalue}>{incident.description}</Text>

                    <Text style={style.incidentProperty}>VALOR:</Text>
                    <Text style={style.incidentvalue}>{incident.value}</Text>
                </View>

                <View style={style.contactBox}>
                    <Text style={style.heroTitle}>Salve o dia!</Text>
                    <Text style={style.heroTitle}>Seja o herói desse caso.</Text>

                    <Text style={style.heroDescription}>Entre em contto:</Text>

                    <View style={style.actions}>
                        <TouchableOpacity style={style.action}onPress={sendWhatsApp}>
                            <Text style={style.actionText}>WhatsApp</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={style.action}onPress={sendMail}>
                            <Text style={style.actionText}>E-mail</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </View>
    )
}