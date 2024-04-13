import logo from './logo.svg';
import './App.css';
import {Elements} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';
import CheckoutForm from './CheckoutForm';
const stripePromise = loadStripe('pk_test_51BTUDGJAJfZb9HEBwDg86TN1KNprHjkfipXmEDMb0gSCassK5T3ZfxsAbcgKVmAIXF7oZ6ItlZZbXO6idTHE67IM007EwQ4uN3');

function App() {
  const makePayment=async()=>{
    // the belpw is the publishable key
    const stripe= await loadStripe('pk_test_51P4vrISFzPcbM2q1zmsx6NdZrXP3Z0dR7RGDIHlh0TqubYkV5NTEen7gGrqoDLJhAJtSrsFBsVcogUXjGCzOraKh00NBr11mI4')
    const body={
      products:[
        {
          'name':"prod1",
          'price':100,
          'quantity':1

        }
      ]
    } 
    const headers={
      'Content-Type':'application/json'
    }

    const response=await fetch('http://127.0.0.1:3001/create-checkout-session',{
      method:'POST',
      headers:headers,
      body:JSON.stringify(body)
    })
    const session=await response.json()
    const result=await stripe.redirectToCheckout({sessionId:session.id})
  }


  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <br></br>
      <button onClick={makePayment} className='text-white'>make payment</button>
   

      </header>
    </div>
  );
}

export default App;
