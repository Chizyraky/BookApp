import { createStackNavigator } from '@react-navigation/stack';
import BookList from '../components/book/bookList/BookList';
import BookDetails from '../components/book/bookDetails/BookDetails';

const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#5C6BC0',
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen 
        name="BookList" 
        component={BookList} 
        options={{ title: 'Home' }} 
      />
      <Stack.Screen 
        name="BookDetails" 
        component={BookDetails} 
        options={({ route }) => ({ title: route.params.name })}
      />
    </Stack.Navigator>
  );
};

export default HomeStack;
