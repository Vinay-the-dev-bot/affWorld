import { ChakraProvider } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";
import "./App.css";
import "./index.css";
import MainRoute from "./Routes/MainRoute";
import { Provider } from "react-redux";
import store from "./Store/Store";

function App() {
  return (
    <>
      <ChakraProvider>
        <Provider store={store}>
          <BrowserRouter>
            <MainRoute />
          </BrowserRouter>
        </Provider>
      </ChakraProvider>
    </>
  );
}

export default App;
