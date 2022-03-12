import {Route, Redirect} from "react-router-dom";
import React from "react";
import Box from "@material-ui/core/Box";
import MainPage from "./Components/MainPage";
import SignUp from "./Containers/SignUpContainer"
import Login from "./Containers/LoginContainer"
import FindLotsContainer from "./Containers/FindLotsContainer";
import ProfileContainer from "./Containers/ProfileContainer";
import MyLotsContainer from "./Containers/MyLotsContainer";
import MyBetsContainer from "./Containers/MyBetsContainer";
import MyWinsContainer from "./Containers/MyWinsContainer";
import LotContainer from "./Containers/LotContainer"
import CreateLotContainer from "./Containers/CreateLotContainer";

const RouteController = props => {
    return (
            <Box>
                <Route exact path={'/'} render={() => <MainPage/>}/>
                <Route exact path={'/findlot'} render={() => <FindLotsContainer/>}/>
                <Route exact path={'/profile'} render={() => !props.id ? <Redirect to={'/login'}/> : <ProfileContainer/>}/>
                <Route path={'/lot/:id'} render={(props) => <LotContainer {...props}/>}/>
                <Route exact path={'/mylots'} render={() => !props.id ? <Redirect to={'/login'}/> : <MyLotsContainer/>}/>
                <Route exact path={'/mybets'} render={() => !props.id ? <Redirect to={'/login'}/> : <MyBetsContainer/>}/>
                <Route exact path={'/mywins'} render={() => !props.id ? <Redirect to={'/login'}/> : <MyWinsContainer/>}/>
                <Route exact path={'/createlot'}
                       render={() => !props.id ? <Redirect to={'/login'}/> : <CreateLotContainer/>}/>
                <Route exact path={'/login'} render={() => props.id ? <Redirect to={'/'}/> : <Login/>}/>
                <Route exact path={'/signup'} render={() => props.id ? <Redirect to={'/'}/> : <SignUp/>}/>
            </Box>
    )
}

export default RouteController;
