import { FontAwesome5 } from '@expo/vector-icons';
import { collection, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../../data/firebaseConfig';
import styles from './Style';

const BookList = ({ navigation }) => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const booksCollectionRef = collection(db, 'books');
    const unsubscribe = onSnapshot(booksCollectionRef, (snapshot) => {
      const newBooks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBooks(newBooks);
    });

    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={books}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('BookDetails', { bookId: item.id })}
            style={styles.card}
          >
            <Image
              source={{ uri: item.cover || 'https://www.oclc.org/en/worldcat/library100/top500.html' }}
              style={styles.cover}
            />
            <View style={styles.info}>
              <Text style={styles.title}>{item.name}</Text>
              <Text style={styles.author}>{item.author}</Text>
            </View>
            <FontAwesome5
              name='chevron-right'
              size={18}
              color='#ccc'
              style={styles.icon}
            />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

export default BookList;
