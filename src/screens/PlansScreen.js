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

  const loadCheckout = async (priceId) => {
    // To create or overwrite a single document, use the set() method:
    const customerRef = collection(db, `customers/${user.uid}/checkout_sessions`);

    const docRef = await addDoc(customerRef, {
      price: priceId,
      // This url is for redirecting to after successful purchase:
      success_url: window.location.origin,
      cancel_url: window.location.origin,
    });

    console.log(">>>", docRef)

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





    // const checkOutCollection = collection(db, "customers");
    // const checkOutSnapshot = checkOutCollection.getDocs();

    // const querySnapshot = await getDocs(customersRef);
    // querySnapshot.forEach((doc) => {
    //   // doc.data() is never undefined for query doc snapshots
    //   console.log(doc.id, " => ", doc.data());
    // });

    // await setDoc(doc(db, "customers", user.uid, "checkout_sessions", "123"), {
    //   test: doc(db, "customers", "123"),
    // });

    // setDoc(customerRef, {
    //   price: priceId,
    //   // This url is for redirecting to after successful purchase:
    //   success_url: window.location.origin,
    //   cancel_url: window.location.origin,
    // });

    // await setDoc(doc(db, "customers", user.uid, "checkout_sessions", customerRef.id), {
    //   price: priceId,
    //   // This url is for redirecting to after successful purchase:
    //   // success_url: window.location.origin,
    //   // cancel_url: window.location.origin,
    // });

    // customerRef.onSnapshot(async (snap) => {
    //   const { error, sessionId } = snap.data();

    //   if (error) {
    //     // Show an error to your customer and 
    //     // inspect your Cloud Function logs in the firebase console.
    //     alert(`An error occurred: ${error.message}`);
    //   }

    //   if (sessionId) {
    //     // We have a session, let's redirect to Checkout
    //     // Init Stripe
    //     const stripe = await loadStripe(env.STRIPE_PUBLISHER_KEY);
    //     console.log("Check out stripe built-in functions!", stripe)
    //     stripe.redirectToCheckout({ sessionId });
    //   }
    // })


    // const customerSnapshot = onSnapshot(customerRef, async (snap) => {
    //   console.log("Current data: ", snap.data());
    //   const { error, sessionId } = snap.data();

    //   if (error) {
    //     // Show an error to your customer and 
    //     // inspect your Cloud Function logs in the firebase console.
    //     alert(`An error occurred: ${error.message}`);
    //   }

    //   if (sessionId) {
    //     // We have a session, let's redirect to Checkout
    //     // Init Stripe
    //     const stripe = await loadStripe(env.STRIPE_PUBLISHER_KEY);
    //     console.log("Check out stripe built-in functions!", stripe)
    //     stripe.redirectToCheckout({ sessionId });
    //   }
    // });





  };

  return (
    <div className='plansScreen'>

      { // Convert products from object to array. Then map each key/value pair in the array to create divs and buttons for each plan:
        Object.entries(products).map(([productId, productData]) => {
          // TODO: add some logic to check if the user's subscription is active...
          return (
            <div className='plansScreen_plan' key={`keyid_${productId}`}>

              <div className='plansScreen_info'>
                <h5>{productData.name}</h5>
                <h6>{productData.description}</h6>
              </div>

              <button onClick={() => loadCheckout(productData.prices.priceId)}>Subscribe</button>

            </div>
          )

        })
      }
    </div>
  )
}

export default PlansScreen