import PageManager from './page-manager';
import { initializeSdk } from 'ng-checkout/dist/checkout-sdk';

export default class Checkout extends PageManager {
    loaded(next) {
        const { checkoutService } = initializeSdk();

        checkoutService.loadQuote()
            .then(({ checkout }) => {
                console.log(checkout.getCart());
            });

        next();
    }
}
