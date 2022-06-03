import React, { useEffect, useState } from 'react';
import "./PlansScreen.css";
import { collection, query, where, getDocs, doc, onSnapshot, addDoc } from "firebase/firestore";
import db from '../firebase';
import { useSelector } from 'react-redux';
// This refers to the user logged in in the current state:
import { selectUser } from '../features/userSlice';
import { loadStripe } from '@stripe/stripe-js';
import env from "react-dotenv";


function PlansScreen() {
  const [products, setProducts] = useState([]);
  // Pull the user from the redux store:
  const user = useSelector(selectUser);
  const [subscription, setSubscription] = useState(null);

  useEffect(() => {
    (async () => {
      // Create a reference to the products collection:
      const productsRef = collection(db, "products");

      // Create a query against the collection. We want active to be true:
      const q = query(productsRef, where("active", "==", true));

      const querySnapshot = await getDocs(q);

      // We want to create our own object literal template for products:
      const products = {};

      querySnapshot.forEach(async (productDoc) => {
        products[productDoc.id] = productDoc.data()

        // Get the prices subcollection of each product (firebase v9):
        const pricesCollection = collection(db, `products/${productDoc.id}/prices`);
        const pricesSnapshot = await getDocs(pricesCollection);

        pricesSnapshot.forEach((priceDoc) => {
          // Add on prices key:
          products[productDoc.id].prices = {
            priceId: priceDoc.id,
            priceData: priceDoc.data(),
          }
        });
        setProducts(products);
      });
    })
      // for invoking?
      ();
  }, []);

  useEffect(() => {
    (async () => {
      const customerRef = collection(db, `customers/${user.uid}/subscriptions`);
      const querySnapshot = await getDocs(customerRef);

      querySnapshot.forEach(async (subscription) => {
        setSubscription({
          role: subscription.data().role,
          current_period_end: subscription.data().current_period_end.seconds,
          current_period_start: subscription.data().current_period_start.seconds
        });
      });
    })
      ()
  }, [])

  const loadCheckout = async (priceId) => {
    // To create or overwrite a single document, use the set() method:
    const customerRef = collection(db, `customers/${user.uid}/checkout_sessions`);

    const docRef = await addDoc(customerRef, {
      price: priceId,
      // This url is for redirecting to after successful purchase:
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    // onSnapshot v9 syntax:
    const unsub = onSnapshot(doc(db, `customers/${user.uid}/checkout_sessions`, `${docRef.id}`), async (snap) => {
      console.log("Current data: ", snap.data());

      const { error, sessionId } = snap.data();

      if (error) {
        // Show an error to your customer and 
        // inspect your Cloud Function logs in the firebase console.
        alert(`An error occurred: ${error.message}`);
      }

      if (sessionId) {
        // We have a session, let's redirect to Checkout
        // Init Stripe:
        const stripe = await loadStripe(`${env.STRIPE_PUBLISHER_KEY}`);
        console.log("Check out stripe built-in functions!", stripe)
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };

  return (
    <div className='plansScreen'>
      {
        subscription && <p style={{ paddingTop: "1rem" }}>Renewal Date: {new Date(subscription?.current_period_end * 1000).toLocaleDateString()}</p>
      }

      { // Convert products from object to array. Then map each key/value pair in the array to create divs and buttons for each plan:
        Object.entries(products).map(([productId, productData]) => {
          // TODO: add some logic to check if the user's subscription is active...
          // If productData.name is defined, lowercase it and check if it includes role (basic, standard, or premium)
          const isCurrentPackage = productData.name?.toLowerCase().includes(subscription?.role)

          return (
            <div
              key={`keyid_${productId}`}
              className={`${isCurrentPackage && 'plansScreen_plan--disabled'} plansScreen_plan`}>

              <div className='plansScreen_info'>
                <h5>{productData.name}</h5>
                <h6>{productData.description}</h6>
              </div>

              {/* only if isCurrentPackage is false (meaning there is no product/package), then you can click on subscribe and invoke loadCheckout */}
              <button onClick={() => !isCurrentPackage && loadCheckout(productData.prices.priceId)}>
                {isCurrentPackage ? 'Current Package' : 'Subscribe'}
              </button>

            </div>
          );
        })
      }
    </div>
  );
}

export default PlansScreen