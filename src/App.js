import React from "react"
import client from "./apollo"
import { ApolloProvider } from "@apollo/react-hooks"
import Admin from "./containers/Admin"
import { BrowserRouter as Router} from "react-router-dom";

const App = () => (
  <ApolloProvider client={client}>
  <Router>
    <Admin />
  </Router>
  </ApolloProvider>
)

export default App
