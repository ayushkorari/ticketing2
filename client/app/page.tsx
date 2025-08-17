import axios from "axios";
import { headers } from "next/headers";
import type { Metadata } from "next";
import { Ticket } from "@/types";
import TicketCard from "@/components/ticket-card";

export const metadata: Metadata = {
  title: "GitTix - Buy and Sell Tickets",
  description: "Ticketing Platform",
};

export default async function Home() {
  try {
    const headersList = headers();
    const ticketsRes = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/tickets',
      {
        headers: headersList as any
      } 
    );
    
    const tickets: Ticket[] = ticketsRes.data;
    
    return (
      <div className="container mt-4">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h1>Available Tickets</h1>
        </div>
        
        {tickets.length === 0 ? (
          <div className="alert alert-info">
            <h4>No tickets available</h4>
            <p>Check back later for new tickets!</p>
          </div>
        ) : (
          <div className="row">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="col-md-6 col-lg-4">
                <TicketCard ticket={ticket} />
              </div>
            ))}
          </div>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <h4>Error loading tickets</h4>
          <p>Please try again later.</p>
        </div>
      </div>
    );
  }
}