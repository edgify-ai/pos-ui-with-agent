const categories = [
  { name: 'fruits', image: '' },
  { name: 'vegetables', image: '' },
  { name: 'pastries', image: '' },
  { name: 'meat', image: '' },
  // { name: 'dairy', image: '' },
  { name: 'groceries', image: '' },
  { name: 'more', image: '', style: 'moreOptions' },
];

export default (state = categories) => {
  return state;
};

export const getCategories = (state) => state;
