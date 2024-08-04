import { collection, deleteDoc, doc, onSnapshot } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, FlatList, Text, TouchableOpacity, View } from 'react-native';
import { db } from '../../data/firebaseConfig';
import styles from './Style';

const Borrowed = () => {
  const [borrowedBooks, setBorrowedBooks] = useState([]);

  useEffect(() => {
    const borrowedCollectionRef = collection(db, 'borrowed');
    const unsubscribe = onSnapshot(borrowedCollectionRef, (snapshot) => {
      const loadedBooks = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setBorrowedBooks(loadedBooks);
    });

    return () => unsubscribe();
  }, []);

  const returnBook = (bookId) => {
    const bookDocRef = doc(db, 'borrowed', bookId);
    deleteDoc(bookDocRef)
      .then(() => {
        Alert.alert('Book Returned', 'Thank you for returning the book.');
      })
      .catch((error) => {
        Alert.alert('Error', 'Failed to return the book: ' + error.message);
      });
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={borrowedBooks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Text style={styles.listText}>{item.name}</Text>
            <TouchableOpacity
              style={styles.returnButton}
              onPress={() => returnBook(item.id)}
            >
              <Text style={styles.returnButtonText}>RETURN</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

export default Borrowed;
