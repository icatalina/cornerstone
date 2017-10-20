import { initializeSdk } from 'ng-checkout/dist/checkout-sdk';
import Snackbar from 'material-ui/Snackbar';
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
        this.state = this._checkoutService.getState();
    }

    componentDidMount() {
        this._unsubscribe = this._checkoutService.subscribe((state) => {
            this.setState(state);
        });

        this._checkoutService.loadQuote();
        this._checkoutService.loadBillingCountries();
        this._checkoutService.loadShippingCountries();
        this._checkoutService.loadShippingOptions();
        this._checkoutService.loadPaymentMethods();
    }

    componentWillUnmount() {
        this._unsubscribe();
    }

    render() {
        const { checkout, errors, statuses } = this.state;

        return (
            <section>
                <Snackbar
                    anchorOrigin={ { vertical: 'top', horizontal: 'center' } }
                    open={ statuses.isPending() }
                    message="Loading..."
                />

                <Customer
                    customer={ checkout.getCustomer() }
                    error={ errors.getSignInError() }
                    isSigningIn={ statuses.isSigningIn() }
                    isSigningOut={ statuses.isSigningOut() }
                    onSignIn={ (...args) => this._handleSignIn(...args) }
                    onSignOut={ (...args) => this._handleSignOut(...args) }
                />

                <Shipping
                    address={ checkout.getQuote().shippingAddress }
                    countries={ checkout.getShippingCountries() }
                    options={ checkout.getShippingOptions() }
                    selectedOptionId={ checkout.getQuote().shippingOption }
                    onSelect={ (...args) => this._handleSelectShippingOption(...args) }
                    onUpdate={ (...args) => this._handleUpdateShippingAddress(...args) }
                />

                <Billing
                    address={ checkout.getQuote().billingAddress }
                    countries={ checkout.getBillingCountries() }
                    onUpdate={ (...args) => this._handleUpdateBillingAddress(...args) }
                />

                <Cart cart={ checkout.getCart() } />

                <Payment
                    methods={ checkout.getPaymentMethods() }
                    onSubmit={ (...args) => this._handleSubmitPayment(...args) }
                />
            </section>
        );
    }

    _handleSignIn(credentials) {
        this._checkoutService.signInCustomer(credentials);
    }

    _handleSignOut() {
        this._checkoutService.signOutCustomer();
    }

    _handleSelectShippingOption(addressId, optionId) {
        this._checkoutService.selectShippingOption(addressId, optionId, {});
    }

    _handleUpdateShippingAddress(address) {
        console.log(address);
    }

    _handleUpdateBillingAddress(address) {
        console.log(address);
    }

    _handleSubmitPayment(methodId) {
        console.log(methodId);
    }
}
