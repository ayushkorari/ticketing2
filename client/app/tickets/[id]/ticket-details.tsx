'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Ticket } from "@/types";
import { useUser } from "@/context/user-context";
import useRequest from "@/hooks/use-request";

interface TicketDetailsProps {
  ticket: Ticket;
}

export default function TicketDetails({ ticket }: TicketDetailsProps) {
  const { user } = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  
  const { doRequest, errors } = useRequest({
    url: '/api/orders',
    method: 'post',
    body: { ticketId: ticket.id },
    onSuccess: (order) => {
      router.push(`/orders/${order.id}`);
    }
  });

  const handlePurchase = async () => {
    if (!user) {
      router.push('/auth/signin');
      return;
    }
    
    setIsLoading(true);
    await doRequest();
    setIsLoading(false);
  };

  const isReserved = !!ticket.orderId;
  const isOwner = user?.id === ticket.userId;

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h1 className="card-title">{ticket.title}</h1>
              <h4 className="text-success mb-3">${ticket.price}</h4>
              
              {isReserved && (
                <div className="alert alert-warning">
                  <strong>This ticket is currently reserved by another user.</strong>
                </div>
              )}
              
              {isOwner && (
                <div className="alert alert-info">
                  <strong>You own this ticket.</strong>
                </div>
              )}
              
              {errors?.length > 0 && (
                <div className="alert alert-danger">
                  <h4>Ooops...</h4>
                  <ul className="my-0">
                    {errors.map((err: any) => (
                      <li key={err.message}>{err.message}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {!isOwner && (
                <button
                  className={`btn ${isReserved ? 'btn-secondary' : 'btn-primary'} btn-lg`}
                  disabled={isReserved || isLoading}
                  onClick={handlePurchase}
                >
                  {isLoading ? 'Processing...' : isReserved ? 'Reserved' : 'Purchase'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}