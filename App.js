import React, { Fragment } from 'react';
import Nav from "./src/navigation";
import { Loader } from "./src/component/";
import { StoreProvider } from "./src/context/store";

const App = () => {
  return (
    <StoreProvider>
      <Nav />
      <Loader />
    </StoreProvider>
  );
}

export default App;