import React from 'react';

import Routes from './routes';
import history from './services/history';

function App() {
    return (
        <>
            <Routes history={history}/>
        </>
    );
}

export default App;
