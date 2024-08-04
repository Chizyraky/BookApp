import { collection, doc, getDoc, getDocs, query, setDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Alert, Image, Text, TouchableOpacity, View } from 'react-native';
import { Rating } from 'react-native-ratings';
import { db } from '../../../data/firebaseConfig';
import styles from './Style';

const BookDetails = ({ route }) => {
  const { bookId } = route.params;
  const [book, setBook] = useState(null);
  const [isBorrowed, setIsBorrowed] = useState(false);
  const [borrowedCount, setBorrowedCount] = useState(0);

  useEffect(() => {
    const fetchBook = async () => {
      const bookRef = doc(db, 'books', bookId);
      const bookSnapshot = await getDoc(bookRef);
      if (bookSnapshot.exists()) {
        setBook({ id: bookSnapshot.id, ...bookSnapshot.data() });
      }
      checkIfBorrowed(bookId);
      countBorrowedBooks();
    };

    fetchBook();
  }, [bookId]);

  const countBorrowedBooks = async () => {
    const querySnapshot = await getDocs(collection(db, 'borrowed'));
    setBorrowedCount(querySnapshot.size);
  };

  const checkIfBorrowed = async (bookId) => {
    const q = query(collection(db, 'borrowed'), where('bookId', '==', bookId));
    const querySnapshot = await getDocs(q);
    setIsBorrowed(querySnapshot.size > 0);
  };

  const handleBorrow = async () => {
    if (borrowedCount >= 3) {
      Alert.alert('Limit Reached', 'You cannot borrow more than 3 books at a time.');
      return;
    }

    if (isBorrowed) {
      Alert.alert('Already Borrowed', 'You already borrowed this book, please check your borrowed folder.');
      return;
    }

    const bookRef = doc(collection(db, 'borrowed'));
    await setDoc(bookRef, {
      bookId: book.id,
      name: book.name,
      author: book.author,
      borrowedOn: new Date(),
    });
    setIsBorrowed(true);
    Alert.alert('Success', 'Book borrowed succesfully, have a good read!');
  };

  if (!book) {
    return <Text>Loading...</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{book.name}</Text>
      <Text style={styles.author}>{book.author}</Text>
      <Image
        source={{ uri: book.cover }}
        style={styles.cover}
      />
      <Text style={styles.summary}>{book.summary}</Text>
      <Rating
        type='star'
        ratingCount={5}
        imageSize={30}
        readonly={true}
        startingValue={book.rating}
        style={styles.rating}
      />
      <TouchableOpacity
        style={[styles.button, isBorrowed ? styles.buttonDisabled : null]}
        onPress={handleBorrow}
        disabled={isBorrowed}
      >
        <Text style={styles.buttonText}>BORROW</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookDetails;
