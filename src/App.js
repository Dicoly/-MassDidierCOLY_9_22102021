import React from 'react';
import Header from './components/header/Header';
import SideBar from './components/sideBar/SideBar';
import Dashboard from './views/dashboard/Dashboard';

function App() {
    return (
        <React.Fragment>
            <Header />
            <SideBar />
            <Dashboard />  
        </React.Fragment>
    );
}

export default App;
