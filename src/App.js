import React from "react";
import Movies from "./components/movies.component";
import Navbar from "./components/navbar.component";

const App = (props) => {
    return (
        <>
            <Navbar />
            <br />
            <Movies />
        </>
    );
};

export default App;
