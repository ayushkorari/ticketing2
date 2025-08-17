export default function TestPage() {
  return (
    <div className="container mt-4">
      <h1>Test Page</h1>
      <p>This is a test page to verify the application is working correctly.</p>
      
      <div className="row mt-4">
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Frontend Features</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">✅ Home page with tickets list</li>
                <li className="list-group-item">✅ User authentication (signin/signup/signout)</li>
                <li className="list-group-item">✅ Create new tickets</li>
                <li className="list-group-item">✅ View ticket details</li>
                <li className="list-group-item">✅ Purchase tickets (create orders)</li>
                <li className="list-group-item">✅ View orders list</li>
                <li className="list-group-item">✅ Order details with payment</li>
                <li className="list-group-item">✅ Stripe payment integration</li>
                <li className="list-group-item">✅ Success notifications</li>
                <li className="list-group-item">✅ Responsive design with Bootstrap</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="col-md-6">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Backend Integration</h5>
              <ul className="list-group list-group-flush">
                <li className="list-group-item">✅ Tickets Service API</li>
                <li className="list-group-item">✅ Orders Service API</li>
                <li className="list-group-item">✅ Payments Service API</li>
                <li className="list-group-item">✅ Auth Service API</li>
                <li className="list-group-item">✅ Server-side rendering</li>
                <li className="list-group-item">✅ Client-side interactions</li>
                <li className="list-group-item">✅ Error handling</li>
                <li className="list-group-item">✅ Loading states</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}