import { initializeSdk } from 'ng-checkout/dist/checkout-sdk';
import React from 'react';
import Billing from './billing-component';
import Cart from './cart-component';
import Customer from './customer-component';
import Payment from './payment-component';
import Shipping from './shipping-component';

export default class CheckoutComponent extends React.Component {
    constructor(props) {
        super(props);

        this._checkoutService = initializeSdk().checkoutService;
    }

    componentDidMount() {
        this._unsubscribe = this._checkoutService.subscribe((state) => {
            this.setState(state);
        });

        this._checkoutService.loadQuote();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        return (
            <section>
                <Customer></Customer>
                <Shipping></Shipping>
                <Billing></Billing>
                <Cart></Cart>
                <Payment></Payment>
            </section>
        );
    }
}
