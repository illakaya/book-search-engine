import './App.css';
// Probably have to import Apollo here so that the app can use, have to check where the application uses the queries
// import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { Outlet } from 'react-router-dom';

// Connect to Apollo on the client side and allow for info to be cached, save to the variable named client
/*
const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});
*/

import Navbar from './components/Navbar';

function App() {
  return (
    // Allow client data to be called in the application by passing it as a property
    // <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    // </ApolloProvider>
  );
}

export default App;
