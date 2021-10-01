import React from "react";
import {BrowserRouter as Router,Switch,Route,Redirect} from "react-router-dom";

import Wrapper from "./components/wrapper.jsx"
import Header from "./components/header.jsx";
import Basket from "./components/basket.jsx";
const App = ()=>{
    return (
        <div className="app">
            <Router>
                <Header/>
                
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/product"/>
                    </Route>

                    <Route path="/product">
                        <Wrapper></Wrapper>
                    </Route>
                    <Route path="/basket">
                        <Basket/>
                    </Route>
                </Switch>
               
            </Router>
            
        </div>
    )
}
export default App;