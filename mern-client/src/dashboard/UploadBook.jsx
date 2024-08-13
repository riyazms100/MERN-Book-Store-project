import React, { useState} from 'react'
import { Button, Checkbox, Label, Select, Textarea, TextInput } from "flowbite-react";

const UploadBook = () => {
  const bookCategories = [
    "Fiction",
    "Non-Fiction",
    "Mistery",
    "Programming",
    "Science Fiction",
     "Fantasy",
     "Horror",
     "Bibliography",
     "Autobiography",
     "History",
     "Self-help",
     "Memoir",
     "Buisness",
     "Children Books",
     "Travel",
     "Religion",
     "Art and Design"
  ]


const[selectedBookCategory, setSelectedBookCategory] = useState(bookCategories[0]);

const handleChangeSelectedValue = (event) => {
  console.log(event.target.value);
  setSelectedBookCategory(event.target.value);
}




//handle book submission
const handleBookSubmit = (event) => {
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
   }
   console.log(bookObj)

   {/* send data to the DB*/}

   fetch("http://localhost:5000/upload-book",{
   method: "POST",
   headers: {
    "content-type": "application/json",   
   },
   body: JSON.stringify(bookObj)
   }).then(res => res.json()).then(data =>{
    // console.log(data)
    alert("Book uploaded successfully !!!")
    form.reset();
  })

}

  return (
    <div className='px-4 my-12'>
      <h2 className='mb-8 text-3xl font-bold'>
      Upload Your Book
      </h2>
     
      <form onSubmit={handleBookSubmit} className="flex lg:w-[1180px] flex-col flex-wrap gap-4">
     
      {/*First row*/}
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
        />
        </div>

        {/*author name */}
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
        />
        </div>

       </div>

    {/*Second row*/}     
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
        />
        </div>

        {/*Category */}
        <div className='lg:w-1/2'>
        <div className='mb-2 block'>
          <Label
           htmlFor='inputState'
           value='Book Category'
          />
        </div>

         <Select id='inputState' name='categoryName' className='w-full rounded' value={selectedBookCategory}
         onChange={handleChangeSelectedValue}>
         {
          bookCategories.map((option) => <option key={option} value={option}>{option}</option>)
         }
         </Select>


       </div>
     </div>
   

   { /* bookDescription */}
   <div>
    <div className='mb-2 block'>
      <label
        htmlFor="bookDescription"
        value="Book Description"
      />     
    </div>
    <h1 className='font-medium mb-1'>Book Desription</h1>
    <Textarea
      id='bookDescription'
       name='bookDescription'
      placeholder='Write your book description'
      required
      className='w-full'
      rows={6}
    />
    
   </div>

   {/* book pdf link*/}
     <div>
    <div className='mb-2 block'>
      <label
        htmlFor='bookPDFURL'
        value="Book PDF URL"
      />
      </div>
      <h1 className='font-medium mb-1'>Book Pdf Url</h1>
      <TextInput
        id='bookPDFURL'
        name='bookPDFURL'
        placeholder='book pdf url'
        required
        type='text'
       />
    </div>

    <Button type='submit' className='mt-5 bg-blue-700'>
      Upload Book
    </Button>

   
     </form>
    </div>
  )
}

export default UploadBook