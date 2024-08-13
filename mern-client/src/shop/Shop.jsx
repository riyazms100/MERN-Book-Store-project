import React, { useEffect, useState } from 'react';
import { Card } from 'flowbite-react';

const Shop = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/all-books")
      .then(res => res.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <div className='mt-28 px-4 lg:px24'>
      <h2 className='text-5xl font-bold text-center'>All Books are Here!</h2>
      <div className='grid gap-8 lg:grid-cols-4 sm:grid-cols-2 md:grid-cols-3 grid-cols-1 mt-6 mb-6'>
        {books.map(book => (
          <Card key={book.id} className='flex flex-col justify-between max-w-xs mx-auto'>
            <img src={book.imageURl} alt='' className='h-96 object-cover' />
            <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white mt-4">
              {book.bookTitle}
            </h5>
            <div className='flex-grow'>
              <p className='font-normal text-gray-700 dark:text-gray-400 h-24 overflow-hidden'>
                {book.bookDescription}
              </p>
            </div>
            <button className='bg-blue-700 font-semibold text-white py-2 rounded mt-4'>
              Buy Now
            </button>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Shop;
