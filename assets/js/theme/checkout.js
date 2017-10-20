import PageManager from './page-manager';

export default class Checkout extends PageManager {
    loaded(next) {
        console.log('Loaded checkout');

        next();
    }
}
