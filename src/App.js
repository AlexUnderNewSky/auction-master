import React from "react";
import HeaderContainer from "./Containers/HeaderContainer"
import {Grid} from '@material-ui/core';
import RouterControllerContainer from "./Containers/RouterControllerContainer"
import Footer from "./Components/Footer"
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import store from './Redux/store'

function App() {
    return (
        <div>
            <Provider store={store}>
                <BrowserRouter>
                    <Grid container justify={"center"}>
                        <Grid item xs={12} lg={10} xl={8}>
                            <HeaderContainer/>
                            <RouterControllerContainer/>
                            <Footer/>
                        </Grid>
                    </Grid>
                </BrowserRouter>
            </Provider>
        </div>
    );
}

export default App;
