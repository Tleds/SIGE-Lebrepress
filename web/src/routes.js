import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Order from './pages/Order';
import OrdersDetails from './pages/OrdersDetails';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';
import UserArea from './pages/UserArea';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={SignIn} />
                <Route exact path="/sign_up" component={SignUp} />
                <Route exact path="/user_area" component={UserArea} />
                <Route exact path="/order" component={Order} />
                <Route exact path="/order_details" component={OrdersDetails} />
            </Switch>
        </BrowserRouter>
    );
}
