import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Home from './pages/Home';
import OrdersDetails from './pages/OrdersDetails';

export default function Routes() {
    return (
        <BrowserRouter>
            <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/order_details" component={OrdersDetails} />
            </Switch>
        </BrowserRouter>
    );
}
