import * as React from 'react';
import { InjectedAuthRouterProps } from 'redux-auth-wrapper/history3/redirect';
import { Link } from 'react-router-dom';
import TimeEntryList from '../TimeEntryList';

const Home: React.SFC<InjectedAuthRouterProps> = () => {
    return (
        <div>
            <Link to="/new-time-entry">Add new time entry</Link>
            <TimeEntryList />
        </div>
    )
}

export default Home;