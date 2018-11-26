import React from 'react';
import compareAsc from 'date-fns/compare_asc';
import compareDesc from 'date-fns/compare_desc';
import {
    Navbar, Nav, NavItem, NavLink
} from "reactstrap";

function verifTabOrder(tab, e) {
    return ((tab.map(elem => Number(elem.num_order))).includes(Number(e)));
}

const compareDates = asc => (...dates) =>
    asc ? compareAsc(...dates) : compareDesc(...dates);

function sortByStartDate({ tabOrder, asc = true }) {
    tabOrder.sort((...dates) => compareDates(asc)(...dates.map(date => date.date_order)));
    return tabOrder;
}

const Links = () => {
    return (<div> <Navbar>
        <Nav className="ml-auto " navbar>
            <NavItem className="navItem mx-2">
                <NavLink href="http://localhost:3000/admin" target="_blank" rel="noopener noreferrer">
                    Admin
  </NavLink>
            </NavItem>
            <NavItem className="navItem mx-2">
                <NavLink href="http://localhost:3000/customer" target="_blank" rel="noopener noreferrer">
                    Customer
  </NavLink>
            </NavItem>

        </Nav>
    </Navbar></div>)
}

export { verifTabOrder, sortByStartDate, Links };