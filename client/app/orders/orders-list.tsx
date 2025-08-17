'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import { Order, OrderStatus } from '@/types';
import useRequest from '@/hooks/use-request';

interface OrdersListProps {
  initialOrders: Order[];
}

export default function OrdersList({ initialOrders }: OrdersListProps) {
  const [orders, setOrders] = useState<Order[]>(initialOrders);
  const [cancellingOrderId, setCancellingOrderId] = useState<string | null>(null);
  const [cancelErrors, setCancelErrors] = useState<any[]>([]);

  const handleCancelOrder = useCallback(async (orderId: string) => {
    setCancellingOrderId(orderId);
    setCancelErrors([]);
    
    try {
      const response = await fetch(`/api/orders/${orderId}`, {
        method: 'DELETE',
        credentials: 'include'
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        setCancelErrors(errorData.errors || [{ message: 'Failed to cancel order' }]);
        setCancellingOrderId(null);
        return;
      }
      
      // Update the order status in the local state
      setOrders(prevOrders => 
        prevOrders.map(order => 
          order.id === orderId 
            ? { ...order, status: OrderStatus.Cancelled }
            : order
        )
      );
      setCancellingOrderId(null);
    } catch (error) {
      setCancelErrors([{ message: 'Network error occurred' }]);
      setCancellingOrderId(null);
    }
  }, []);

  const canCancelOrder = (order: Order) => {
    return order.status === OrderStatus.Created || order.status === OrderStatus.AwaitingPayment;
  };

  return (
    <>
      {cancelErrors?.length > 0 && (
        <div className="alert alert-danger">
          <h4>Error</h4>
          <ul className="my-0">
            {cancelErrors.map((err: any) => (
              <li key={err.message}>{err.message}</li>
            ))}
          </ul>
        </div>
      )}
      
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ticket</th>
              <th>Price</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.ticket.title}</td>
                <td>${order.ticket.price}</td>
                <td>
                  <span className={`badge ${
                    order.status === OrderStatus.Complete ? 'bg-success' :
                    order.status === OrderStatus.Cancelled ? 'bg-danger' :
                    order.status === OrderStatus.AwaitingPayment ? 'bg-warning' :
                    'bg-primary'
                  }`}>
                    {order.status}
                  </span>
                </td>
                <td>
                  <div className="btn-group" role="group">
                    <Link 
                      href={`/orders/${order.id}`} 
                      className="btn btn-sm btn-outline-primary"
                    >
                      View Details
                    </Link>
                    
                    {canCancelOrder(order) && (
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleCancelOrder(order.id)}
                        disabled={cancellingOrderId === order.id}
                      >
                        {cancellingOrderId === order.id ? 'Cancelling...' : 'Cancel'}
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}