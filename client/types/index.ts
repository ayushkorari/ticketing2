export interface User {
  id: string;
  email: string;
}

export interface Ticket {
  id: string;
  title: string;
  price: number;
  userId: string;
  version: number;
  orderId?: string;
}

export enum OrderStatus {
  Created = 'created',
  Cancelled = 'cancelled',
  AwaitingPayment = 'awaiting:payment',
  Complete = 'complete'
}

export interface Order {
  id: string;
  userId: string;
  status: OrderStatus;
  expiresAt: string;
  ticket: Ticket;
  version: number;
}

export interface Payment {
  id: string;
  orderId: string;
  stripeId: string;
}