'use client';

import { FormEvent, useState } from "react";
import useRequest from "@/hooks/use-request";
import { useRouter } from 'next/navigation';

export default function NewTicket() {
  const [title, setTitle] = useState('');
  const [price, setPrice] = useState('');
  const router = useRouter();
  
  const {doRequest, errors} = useRequest({
    url: '/api/tickets',
    method: 'post',
    body: {title, price: parseFloat(price)},
    onSuccess: () => {
      router.push('/?success=Ticket created successfully!');
    }
  });

  const onSubmit = async (event: FormEvent) => {
    event.preventDefault();
    doRequest();
  };

  const onBlur = () => {
    const value = parseFloat(price);
    if (isNaN(value)) {
      return;
    }
    setPrice(value.toFixed(2));
  };

  return (
    <div className="container mt-4">
      <h1>Create a Ticket</h1>
      <form onSubmit={onSubmit}>
        <div className="form-group mb-3">
          <label>Title</label>
          <input 
            value={title} 
            onChange={e => setTitle(e.target.value)} 
            className="form-control" 
          />
        </div>
        <div className="form-group mb-3">
          <label>Price</label>
          <input 
            value={price} 
            onBlur={onBlur}
            onChange={e => setPrice(e.target.value)} 
            className="form-control" 
          />
        </div>
        {
          !!errors?.length &&  
          <div className="alert alert-danger">
            <h4>Ooops...</h4>
            <ul className="my-0">
              {
                errors.map(
                  (err: any) => <li key={err.message}>{err.message}</li>
                )
              }
            </ul>
          </div>
        }
        <button className="btn btn-primary">Submit</button>
      </form>
    </div>
  );
}