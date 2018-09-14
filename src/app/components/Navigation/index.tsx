import * as React from 'react';
import {
    Navbar,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink,
} from 'reactstrap';
import { connect } from 'react-redux';

import { logout } from '../../modules/user';
import { InjectedAuthProps } from 'redux-auth-wrapper/authWrapper';
import { AuthWrapperDecorator } from 'redux-auth-wrapper';

export interface INavigationProps {
    logout: Function
}

class Navigation extends React.Component<INavigationProps> {
    /*
    constructor(props) {
        super(props);
        this.onLogout = this.logout.bind(this);
    }
    */

    render() {
        return (
            <div>
                <Navbar color="faded" light expand="md">
                    <NavbarBrand>Teaching Diary</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="#" onClick={this.logout.bind(this)}>Logout</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        )
    }

    logout(event: Event) {
        event.preventDefault();
        const {
            logout
        } = this.props;

        logout();
    }
}

export default connect(null, { logout })(Navigation);