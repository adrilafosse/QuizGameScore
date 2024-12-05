import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { get, ref, onValue } from 'firebase/database';
import { db } from '../firebaseConfig';
import { useRoute } from '@react-navigation/native';

interface RouteParams {
    valeur: string;
  }

const Score: React.FC<{ navigation: any }> = ({ navigation }) => {
    const route = useRoute();
    const { valeur } = route.params as RouteParams;
    const [dataTableau, setDataTableau] = useState([]);
    const [dateQuestion, setDateQuestion] = useState([]);
    const [question, setQuestion] = useState('');
    const [bonneReponse, setBonneReponse] = useState('');

    useEffect(() => {
        get(ref(db, `${valeur}/question-temps`)).then((snapshot) => {
            if (snapshot.exists()) {
                const data = snapshot.val();
                const dataFormatter = Object.entries(data).map(([key, value]) => ({
                    question: key,
                    date: value  
                }));
                setDateQuestion(dataFormatter);
            }
        });
    }, []);
    
    useEffect(() => {
        dateQuestion.forEach((dateStr) => {
            console.log("date :",dateStr.date)
            const date = new Date(dateStr.date);
            const delay = date.getTime() + 120000 - Date.now();
            console.log("delay :",delay)
            if (delay > 0) {
            //setTimeout se declenche quand delay arrive a 0
                setTimeout(() => {
                    get(ref(db, `${valeur}/score`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            const nouvelleDonnee = snapshot.val();
                            const dataArray = Object.entries(nouvelleDonnee)
                                .map(([name, score]) => ({ name, score: Number(score) }))
                                .sort((a, b) => b.score - a.score);
                                setDataTableau(dataArray);
                        } else {
                            console.log('Aucune donnée trouvée !');
                        }
                    });
                    get(ref(db, `${valeur}/question_reponse/${dateStr.question}`)).then((snapshot) => {
                        if (snapshot.exists()) {
                            const data = snapshot.val();
                            setQuestion(data.question);
                            setBonneReponse(data.reponse1)
                        }
                    });
                }, delay);
            } else {
                console.log('La date est déjà passée');
            }
        });
      }, [dateQuestion]);

    return (
        <View style={styles.container}>
            <Text style={styles.titre}>Score</Text>
            {question !== '' && bonneReponse !== '' ? (
                <Text style={styles.sous_titre}>{question} : {bonneReponse}</Text>
            ) : null}
            {dataTableau.map((item, index) => (
                <View key={item.name} style={styles.rankItem}>
                    <Text style={styles.rankText}>{index + 1}. {item.name} - {item.score} pts</Text>
                </View>
            ))}
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
    },
    sous_titre: {
        color: 'red',
        textAlign: 'center',
        fontSize: wp('2%'),
        paddingTop: wp('2%'),
        paddingBottom : wp('2%'),
        textDecorationLine: 'underline',
      },
    rankItem: {
        backgroundColor: '#fff',
        borderRadius: 8,
        padding: 10,
        marginVertical: 8,
        width: '100%',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOpacity: 0.1,
        shadowRadius: 5,
        shadowOffset: { width: 0, height: 2 },
        elevation: 3,
    },
    rankText: {
        fontSize: 18,
        color: '#333',
        fontWeight: '600',
    },
    titre: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: wp('8%'),
    },
});
export default Score;