import React from "react";
import { Route, Switch } from "react-router-dom";

import firebase, { FirebaseContext } from "./firebase"; //desde el index.js de la carpeta ./firebase

import Ordenes from "./components/paginas/Ordenes";
import Menu from "./components/paginas/Menu";
import NuevoPlatillo from "./components/paginas/NuevoPlatillo";

import Sidebar from "./components/common-ui/Sidebar";

function App() {
  return (
    <FirebaseContext.Provider
      value={{
        firebase
      }}
    >
      <div className="md:flex min-h-screen">

        <Sidebar />

        <div className="md:w-3/5 xl:w-4/5 p-6">
          <Switch>
            <Route exact path="/" component={Ordenes} />
            <Route exact path="/menu" component={Menu} />
            <Route exact path="/nuevo-platillo" component={NuevoPlatillo} />
          </Switch>
        </div>
      </div>
    </FirebaseContext.Provider>
  );
}

export default App;
