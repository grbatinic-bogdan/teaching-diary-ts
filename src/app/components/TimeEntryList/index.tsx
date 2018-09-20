import * as React from 'react';
import { connect } from 'react-redux';

import { getTimeEntries } from '../../modules/time-entry';
import List from './List';
import { ITimeEntryState } from '../../modules/time-entry/interfaces';

interface IProps {
    timeEntries: ITimeEntryState;
    getTimeEntries: Function;
}

class TimeEntryList extends React.Component<IProps> {

    componentDidMount() {
        this.props.getTimeEntries();
    }

    render() {
        const {
            timeEntries
        } = this.props;

        if (timeEntries === null) {
            return (
                <div>
                    <h1>Loading time entries...</h1>
                </div>
            )
        }

        return (
            <div>
                <h3>Your previous time entries:</h3>
                <List timeEntries={timeEntries} />
            </div>
        )
    }
}

const mapStateToProps = (state: any) => {
    return {
        timeEntries: state.timeEntries
    };
}

export default connect(mapStateToProps, { getTimeEntries })(TimeEntryList);
