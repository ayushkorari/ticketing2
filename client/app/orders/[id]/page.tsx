import axios from "axios";
import { headers } from "next/headers";
import { Order } from "@/types";
import OrderDetails from "./order-details";

interface OrderShowProps {
  params: {
    id: string;
  };
}

export default async function OrderShow({ params }: OrderShowProps) {
  try {
    const headersList = headers();
    const res = await axios.get(
      `http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/orders/${params.id}`,
      {
        headers: headersList as any
      }
    );
    
    const order: Order = res.data;
    
    return <OrderDetails order={order} />;
  } catch (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <h4>Order not found</h4>
          <p>The order you&apos;re looking for doesn&apos;t exist or you don&apos;t have permission to view it.</p>
        </div>
      </div>
    );
  }
}