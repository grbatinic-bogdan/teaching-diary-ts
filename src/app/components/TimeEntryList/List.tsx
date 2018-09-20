import * as React from 'react';
import moment from 'moment';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { Link } from 'react-router-dom';
import { ITimeEntryState } from '../../modules/time-entry/interfaces';

interface IProps {
    timeEntries: ITimeEntryState
}

const List: React.SFC<IProps> = ({timeEntries: {result, entities}}) => {
// export default ({timeEntries: {result, entities}}) => {

    if (result.length === 0) {
        // no time entries, return empty content for now
        return (
            <div></div>
        )

    }
    return (
        <div>
            <ListGroup>
                {result.map((timeEntryId) => {
                    const timeEntry = entities.timeEntry[timeEntryId];
                    const location = entities.location[timeEntry.location]
                    const hasLocation = location && location.address;
                    const time = moment(timeEntry.time);
                    const timeFormat = time.format('DD.MM.YYYY');
                    return (
                        <ListGroupItem key={timeEntryId}>
                            <Link to={`/edit-time-entry/${timeEntryId}`}>
                                <h3>{timeEntry.name}</h3>
                            </Link>
                            <p>
                                {timeFormat} {hasLocation && ` @ ${location.address}`}
                            </p>
                        </ListGroupItem>
                    )
                })}
            </ListGroup>
        </div>
    );
}

export default List;