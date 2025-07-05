export enum OrderStatus {
    // When the order has been created, but the
    // ticket it is trying to order has not been reserved
    Created = 'created',

    // The ticket the order is trying to reserve has already
    // been reserved, or when the user has cancelled the order
    // Or if order expires before payment
    Cancelled = 'cancelled',

    // The order has successfully reserved the ticket
    AwaitingPayment = 'awaiting:payment',

    // Order Completed
    Complete = 'complete'
}