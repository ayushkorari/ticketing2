import { Publisher, OrderCreatedEvent, Subjects } from '@koraritickets/common';

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
