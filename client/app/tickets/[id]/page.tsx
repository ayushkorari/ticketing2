import axios from "axios";
import { headers } from "next/headers";
import { Ticket } from "@/types";
import TicketDetails from "./ticket-details";

interface TicketShowProps {
  params: {
    id: string;
  };
}

export default async function TicketShow({ params }: TicketShowProps) {
  try {
    const headersList = headers();
    const res = await axios.get(
      `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/tickets/${params.id}`,
      {
        headers: headersList as any
      }
    );
    
    const ticket: Ticket = res.data;
    
    return <TicketDetails ticket={ticket} />;
  } catch (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <h4>Ticket not found</h4>
          <p>The ticket you&apos;re looking for doesn&apos;t exist.</p>
        </div>
      </div>
    );
  }
}