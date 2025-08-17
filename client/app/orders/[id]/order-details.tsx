'use client';

import { useEffect, useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Order, OrderStatus } from "@/types";
import useRequest from "@/hooks/use-request";

interface OrderDetailsProps {
  order: Order;
}

export default function OrderDetails({ order }: OrderDetailsProps) {
  const router = useRouter();
  const [timeLeft, setTimeLeft] = useState(0);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [currentOrder, setCurrentOrder] = useState(order);



  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt).getTime() - new Date().getTime();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    findTimeLeft();
    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, [order]);

  const { doRequest, errors } = useRequest({
    url: '/api/payments',
    method: 'post',
    body: {
      orderId: order.id,
      token: 'tok_visa', // Test token for Stripe
    },
    onSuccess: () => {
      router.push('/orders?success=Payment successful! Your ticket has been purchased.');
    }
  });

  const { doRequest: cancelOrder, errors: cancelErrors } = useRequest({
    url: `/api/orders/${order.id}`,
    method: 'delete',
    body: {},
    onSuccess: () => {
      setCurrentOrder(prev => ({ ...prev, status: OrderStatus.Cancelled }));
      setIsCancelling(false);
    }
  });

  const handlePayment = async () => {
    setIsProcessing(true);
    await doRequest();
    setIsProcessing(false);
  };

  const handleCancelOrder = useCallback(async () => {
    setIsCancelling(true);
    await cancelOrder();
  }, [cancelOrder]);

  const canCancelOrder = currentOrder.status === OrderStatus.Created || currentOrder.status === OrderStatus.AwaitingPayment;

  if (timeLeft < 0 && currentOrder.status === OrderStatus.Created) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <h4>Order Expired</h4>
          <p>This order has expired. Please create a new order.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">Order Details</h1>
              
              <div className="mb-3">
                <h5>Ticket: {currentOrder.ticket.title}</h5>
                <p className="text-muted">Price: ${currentOrder.ticket.price}</p>
              </div>

              <div className="mb-3">
                <span className={`badge fs-6 ${
                  currentOrder.status === OrderStatus.Complete ? 'bg-success' :
                  currentOrder.status === OrderStatus.Cancelled ? 'bg-danger' :
                  currentOrder.status === OrderStatus.AwaitingPayment ? 'bg-warning' :
                  'bg-primary'
                }`}>
                  Status: {currentOrder.status}
                </span>
              </div>

              {currentOrder.status === OrderStatus.Created && timeLeft > 0 && (
                <div className="alert alert-warning">
                  <h5>Time left to pay: {timeLeft} seconds</h5>
                  <p>Complete your payment before the order expires.</p>
                </div>
              )}

              {(errors?.length > 0 || cancelErrors?.length > 0) && (
                <div className="alert alert-danger">
                  <h4>{errors?.length > 0 ? 'Payment Error' : 'Cancellation Error'}</h4>
                  <ul className="my-0">
                    {[...(errors || []), ...(cancelErrors || [])].map((err: any) => (
                      <li key={err.message}>{err.message}</li>
                    ))}
                  </ul>
                </div>
              )}

              {currentOrder.status === OrderStatus.Created && timeLeft > 0 && (
                <div className="mt-4">
                  <h5>Payment</h5>
                  <p className="text-muted">
                    This is a test environment. The payment will use a test card.
                  </p>
                  <div className="d-flex gap-2">
                    <button
                      className="btn btn-success btn-lg"
                      onClick={handlePayment}
                      disabled={isProcessing || isCancelling}
                    >
                      {isProcessing ? 'Processing Payment...' : `Pay $${currentOrder.ticket.price}`}
                    </button>
                    
                    {canCancelOrder && (
                      <button
                        className="btn btn-outline-danger btn-lg"
                        onClick={handleCancelOrder}
                        disabled={isProcessing || isCancelling}
                      >
                        {isCancelling ? 'Cancelling...' : 'Cancel Order'}
                      </button>
                    )}
                  </div>
                </div>
              )}

              {currentOrder.status === OrderStatus.Complete && (
                <div className="alert alert-success">
                  <h4>Payment Successful!</h4>
                  <p>Your ticket has been purchased successfully.</p>
                </div>
              )}
              
              {currentOrder.status === OrderStatus.Cancelled && (
                <div className="alert alert-warning">
                  <h4>Order Cancelled</h4>
                  <p>This order has been cancelled. You can create a new order for this ticket if it&apos;s still available.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}