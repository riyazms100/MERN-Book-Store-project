import React, { useState } from 'react';
import { Button, Label, Select, Textarea, TextInput } from 'flowbite-react';
import { useLoaderData, useParams } from 'react-router-dom';

const EditBooks = () => {
  const { id } = useParams();
  const { authorName, imageURl, category, bookDescription, bookTitle, bookPDFURL } = useLoaderData();

  const bookCategories = [
    'Fiction', 'Non-Fiction', 'Mystery', 'Programming', 'Science Fiction',
    'Fantasy', 'Horror', 'Biography', 'Autobiography', 'History', 'Self-help',
    'Memoir', 'Business', 'Children Books', 'Travel', 'Religion', 'Art and Design'
  ];

  const [selectedBookCategory, setSelectedBookCategory] = useState(category);

  const handleChangeSelectedValue = (event) => {
    setSelectedBookCategory(event.target.value);
  };

  const handleUpdate = (event) => {
    event.preventDefault();
    const form = event.target;

    const bookTitle = form.bookTitle.value;
    const authorName = form.authorName.value;
    const imageURl = form.imageURl.value;
    const category = form.categoryName.value;
    const bookDescription = form.bookDescription.value;
    const bookPDFURL = form.bookPDFURL.value;

    const bookObj = {
      bookTitle, authorName, imageURl, category, bookDescription, bookPDFURL
    };

    // Update book data
    fetch(`http://localhost:5000/book/${id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(bookObj)
    }).then(res => res.json()).then(data => {
      console.log(data);
      alert('Book updated successfully!');
    });
  };

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>
        Update Your Book
      </h2>

      <form onSubmit={handleUpdate} className='flex lg:w-[1180px] flex-col flex-wrap gap-4'>

        {/* First row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className='mb-2 block'>
              <Label
                htmlFor='bookTitle'
                value='Book Title'
              />
            </div>
            <TextInput
              id='bookTitle'
              name='bookTitle'
              placeholder='Book name'
              required
              type='text'
              defaultValue={bookTitle}
            />
          </div>

          {/* Author name */}
          <div className='lg:w-1/2'>
            <div className='mb-2 block'>
              <Label
                htmlFor='authorName'
                value='Author Name'
              />
            </div>
            <TextInput
              id='authorName'
              name='authorName'
              placeholder='Author Name'
              required
              type='text'
              defaultValue={authorName}
            />
          </div>
        </div>

        {/* Second row */}
        <div className='flex gap-8'>
          <div className='lg:w-1/2'>
            <div className='mb-2 block'>
              <Label
                htmlFor='imageURl'
                value='Book Image URL'
              />
            </div>
            <TextInput
              id='imageURl'
              name='imageURl'
              placeholder='Book image URL'
              required
              type='text'
              defaultValue={imageURl}
            />
          </div>

          {/* Category */}
          <div className='lg:w-1/2'>
            <div className='mb-2 block'>
              <Label
                htmlFor='inputState'
                value='Book Category'
              />
            </div>

            <Select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory} onChange={handleChangeSelectedValue}>
              {bookCategories.map((option) => <option key={option} value={option}>{option}</option>)}
            </Select>
          </div>
        </div>

        {/* Book Description */}
        <div>
          <div className='mb-2 block'>
            <Label
              htmlFor='bookDescription'
              value='Book Description'
            />
          </div>
          <h1 className='font-medium mb-1'>Book Description</h1>
          <Textarea
            id='bookDescription'
            name='bookDescription'
            placeholder='Write your book description'
            required
            className='w-full'
            rows={6}
            defaultValue={bookDescription}
          />
        </div>

        {/* Book PDF URL */}
        <div>
          <div className='mb-2 block'>
            <Label
              htmlFor='bookPDFURL'
              value='Book PDF URL'
            />
          </div>
          <h1 className='font-medium mb-1'>Book PDF URL</h1>
          <TextInput
            id='bookPDFURL'
            name='bookPDFURL'
            placeholder='Book PDF URL'
            required
            type='text'
            defaultValue={bookPDFURL}
          />
        </div>

        <Button type='submit' className='mt-5 bg-blue-700'>
          Update Book
        </Button>
      </form>
    </div>
  );
}

export default EditBooks;
