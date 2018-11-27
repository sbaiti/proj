import React from 'react';
import axios from 'axios';
import Header from '../header/Header';
import Example from '../animation/Example';
import { isEqual } from 'lodash';
import {sortByStartDate } from '../../utile/utile';
import './customer.css';
class Customer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            orders: [],
        }
    }

    componentDidMount() {
        setInterval(() => {
            axios.get('http://localhost:4000/api/orders')
                .then(res => {
                    const orders = res.data;
                    if (!isEqual(orders, this.state.orders)) {
                        this.setState({ orders });
                    }
                })
        }, 1000);
    }

    pushOrder = () => {
        const tabTri = sortByStartDate({ tabOrder: this.state.orders });
        let tabOrderTri;
        if (tabTri.length > 3)
            tabOrderTri = tabTri.slice(tabTri.length - 3);
        else
            tabOrderTri = [...tabTri];
        return tabOrderTri;
    }

    render() {
        const condition = this.state.orders.length
        if (condition)
            return (
                <div className="home__order">
                    <Header />
                    <div className="customer">
                        <center>
                            Bestellung Nummer<br />
                            <div className="number__customer">
                                {(this.pushOrder()).map(elem => { return <div>{elem.num_order}<br /></div> })}
                            </div> ist bereit zum abholung
                            </center>
                        <div>
                        </div>
                    </div>
                </div>
            )
        else
            return (
                <div className="home__customer">
                    <Header />
                    <div className="customer__empty">
                        <center>
                            <Example />
                        </center>
                    </div>
                </div>
            );
    }
}
export default Customer;