'use client';

import Link from 'next/link';
import { Ticket } from '@/types';

interface TicketCardProps {
  ticket: Ticket;
}

export default function TicketCard({ ticket }: TicketCardProps) {
  return (
    <div className="card mb-3">
      <div className="card-body">
        <h5 className="card-title">{ticket.title}</h5>
        <p className="card-text">Price: ${ticket.price}</p>
        <Link href={`/tickets/${ticket.id}`} className="btn btn-primary">
          View Details
        </Link>
      </div>
    </div>
  );
}