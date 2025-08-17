import { loadStripe } from '@stripe/stripe-js';

const stripePromise = loadStripe('pk_test_51RwnufD9aRCmfruYKeLFKnHg9ads4egqV5rwbEG6Rr5Snr2WNgfuswnXq92u1kR7RABXmAsB7lTczDOFYDKVeDVo00SSjFnXQM');

export default stripePromise;