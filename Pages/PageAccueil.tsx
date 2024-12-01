import React, { useState, useEffect } from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { get, ref } from 'firebase/database';
import { db } from '../firebaseConfig';
import { Platform } from 'react-native';


const Page_Accueil: React.FC<{ navigation: any }> = ({ navigation }) => {
    const [valeur, setvaleur] = useState('');

    const Validation = async () => {
        if (valeur) {
            get(ref(db, valeur)).then(async (snapshot) => {
              if (snapshot.exists()) {
                navigation.navigate('Score', { valeur });
              } else {
                alert('Le code de partie n\'est pas correct');
              }
            });
          }else{
            alert('Veuillez rentrer un nom de partie');
          }
    }
    return (
        <View style={styles.container}>
            <Text style={styles.titre}>QuizGameScore</Text>
            <TextInput 
                style={styles.input} 
                placeholder="Entrez le nom de la partie"
                placeholderTextColor="#757575"
                value={valeur}
                onChangeText={(text) => setvaleur(text)}
            />
            <TouchableOpacity style={styles.bouton} onPress={Validation}>
                <Text style={styles.boutonText}>Valider</Text>
            </TouchableOpacity>
        </View>
    )
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        alignItems: 'center',
        paddingTop: hp('5%'),
    },
    titre: {
        color: '#333333',
        fontWeight: 'bold',
        fontSize: wp('10%'),
    },
    boutonText: {
        color: '#FFFFFF',
        fontSize: wp('4%'),
        fontWeight: 'bold',
      },
    input: {
        height: hp('6%'),
        width: '80%',
        borderColor: '#757575',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: wp('4%'),
        marginTop: hp('8%'),
        color: '#333333',
        textAlign: 'center',
    },
    bouton: {
        backgroundColor: '#4CAF50',
        paddingVertical: hp('2.5%'),
        paddingHorizontal: wp('20%'),
        borderRadius: 8,
        marginTop: wp('8%'),
        alignItems: 'center',
        justifyContent: 'center',
    },
});
export default Page_Accueil;