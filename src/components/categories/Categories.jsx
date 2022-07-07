// import React from 'react';
import CategoryPoster from './CategoryPoster';

const Categories = () => {
  const categories = [
    {
      id: 1,
      key: 'birthday',
      title: 'Birthday',
      imageURL:
        'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YmlydGhkYXl8ZW58MHx8MHx8&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 2,
      key: 'christmas',
      title: 'Christmas',
      imageURL:
        'https://images.unsplash.com/photo-1451772741724-d20990422508?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80'
    },
    {
      id: 3,
      key: 'anniversary',
      title: 'Anniversary',
      imageURL:
        'https://images.unsplash.com/photo-1517837125937-53bd402f49d6?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHZhbGVudGluZXxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
    },
    {
      id: 4,
      key: 'thank you',
      title: 'Thank You',
      imageURL:
        'https://images.unsplash.com/photo-1499744937866-d7e566a20a61?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTR8fHRoYW5rJTIweW91fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=600'
    },
    {
      id: 5,
      key: 'wedding',
      title: 'Wedding',
      imageURL:
        'https://images.unsplash.com/photo-1519225421980-715cb0215aed?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8N3x8d2VkZGluZ3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60'
    }
  ];

  return (
    <div className='categories'>
      {categories.map((category) => (
        <CategoryPoster key={category.id} category={category} />
      ))}
    </div>
  );
};

export default Categories;
