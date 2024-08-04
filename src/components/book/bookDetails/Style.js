import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#5C6BC0',
    textAlign: 'center',
  },
  author: {
    fontSize: 18,
    color: '#FFA500',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cover: {
    width: '100%',
    height: 200,
    resizeMode: 'contain',
    marginVertical: 10,
    marginTop: 20,
  },
  summary: {
    fontSize: 16,
    color: '#333',
    marginVertical: 10,
    marginTop: 20,
    padding: 10,
  },
  rating: {
    paddingVertical: 10,
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#26A69A',
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: 'white',
    fontSize: 16,
  },
  buttonDisabled: {
    backgroundColor: '#ccc',
  },
});

export default styles;
