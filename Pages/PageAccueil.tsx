import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Platform, Dimensions } from 'react-native';
import React, { useState, useEffect } from 'react';
import { ref, get } from 'firebase/database';
import { db } from '../firebaseConfig';

const {width} = Dimensions.get('window');

const RejoindrePartie: React.FC<{ navigation: any }> = ({ navigation }) => {
  const [tableau, setTableau] = useState<string[]>([]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => null,
      headerShown: false, // Masque la flèche de retour
    });
  }, []);

  useEffect(() => {
    get(ref(db, '/')).then(async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        for (const element in data) {
            setTableau((prevTableau) => [...prevTableau, element]);
        }
      }
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>QuizGameScore</Text>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {tableau.length > 0 ? (
          tableau.map((valeur, i) => (
            <TouchableOpacity
              key={i}
              style={styles.bouton}
              onPress={() => navigation.navigate('Score', { valeur })}
            >
              <Text style={styles.boutonText}>{`${valeur}`}</Text>
            </TouchableOpacity>
          ))
        ) : (
          <Text>Aucune partie disponible</Text>
        )}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    paddingTop: Platform.OS === 'web' && width >= 768 ? hp('4%') : hp('6%'),
  },
  titre: {
    color: '#333333',
    fontWeight: 'bold',
    fontSize: Platform.OS === 'web' && width >= 768 ? wp('5%') : wp('9%'),
    textAlign: 'center',
  },
  scrollContainer: {
    alignItems: 'center', // Centrer les boutons dans le scroll view
    paddingBottom: 20,
  },
  bouton: {
    backgroundColor: '#4CAF50',
    paddingVertical: hp('2%'),
    width: Platform.OS === 'web' && width >= 768 ? wp('20%') : wp('60%'),
    borderRadius: 8,
    marginTop: hp('3%'),
    alignItems: 'center',
    justifyContent: 'center',
  },
  boutonText: {
    color: '#FFFFFF',
    fontSize: Platform.OS === 'web' && width >= 768 ? wp('1%') : wp('4%'),
    fontWeight: 'bold',
  },
});

export default RejoindrePartie;
