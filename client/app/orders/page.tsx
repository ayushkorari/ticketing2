import axios from "axios";
import { headers } from "next/headers";
import { Order } from "@/types";
import Link from "next/link";
import OrdersList from "./orders-list";

export default async function OrdersIndex() {
  try {
    const headersList = headers();
    const res = await axios.get(
      'http://ingress-nginx-controller.ingress-nginx.svc.cluster.local/api/orders',
      {
        headers: headersList as any
      }
    );
    
    const orders: Order[] = res.data;
    
    return (
      <div className="container mt-4">
        <h1>My Orders</h1>
        
        {orders.length === 0 ? (
          <div className="alert alert-info">
            <h4>No orders found</h4>
            <p>You haven&apos;t made any orders yet.</p>
            <Link href="/" className="btn btn-primary">
              Browse Tickets
            </Link>
          </div>
        ) : (
          <OrdersList initialOrders={orders} />
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger">
          <h4>Error loading orders</h4>
          <p>Please sign in to view your orders.</p>
          <Link href="/auth/signin" className="btn btn-primary">
            Sign In
          </Link>
        </div>
      </div>
    );
  }
}