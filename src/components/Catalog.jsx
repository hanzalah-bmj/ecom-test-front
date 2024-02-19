import axios from 'axios';
import React, { useState } from 'react';


export default function Catalog() {
  const [products, setProducts] = useState([]);
  const url = 'http://localhost:5000/catalog';
  axios
      .post(url, products)
      .then((res) => {
        console.log(products);
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  return (
    <div className="mx-auto grid w-full max-w-7xl items-center space-y-4 px-2 py-10 md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-4">
      {products.map((items, index) => (
        <div key={index} className="rounded-md border">
          <img
           src={items.productImg}
            alt="Laptop"
            className="aspect-[16/9] w-full rounded-md md:aspect-auto md:h-[300px] lg:h-[200px]"
          />
          <div className="p-4">
            <h1 className="inline-flex items-center text-lg font-semibold">{items.productName}</h1>
            <p className="mt-3 text-sm text-gray-600">
              {items.productDes}
            </p>
            <div className="mt-3 flex items-center space-x-2">
            <span className="block text-sm font-semibold">Price :</span>
              <span className="block text-sm font-semibold">{items.productPrice} </span>
              <span className="block text-sm font-semibold">{items.discountedPrice} </span>

            </div>
            <button
              type="button"
              className="mt-4 w-full rounded-sm bg-black px-2 py-1.5 text-sm font-semibold text-white shadow-sm hover:bg-black/80 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
            >
              Add to Cart
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
