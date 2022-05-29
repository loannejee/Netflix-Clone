import React, { useEffect, useState } from 'react';
import "./PlansScreen.css";
import { collection, query, where, getDocs } from "firebase/firestore";
import db from '../firebase';
import { useSelector } from 'react-redux';
// This refers to the user logged in in the current state:
import { selectUser } from '../features/userSlice';

function PlansScreen() {
  const [products, setProducts] = useState([]);
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

  }, [])

  const loadCheckout = async (priceId) => {
    const docRef = await collection(db, "customers");
  }

  return (
    <div className='plansScreen'>

      { // Convert products from object to array. Then map each key/value pair in the array to create divs and buttons for each plan:
        Object.entries(products).map(([productId, productData]) => {
          // TODO: add some logic to check if the user's subscription is active...
          return (
            <div className='plansScreen_plan'>

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