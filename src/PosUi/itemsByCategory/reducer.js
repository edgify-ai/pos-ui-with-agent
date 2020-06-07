var request = new XMLHttpRequest ();
request.open ('GET', '/item_images/config.json', false); // `false` makes the request synchronous
request.send (null);
const defaultState = JSON.parse (request.response);

const items = (() => {
  let res = {};
  Object.keys (defaultState).forEach (category => {
    res = {...res, ...defaultState[category]};
  });
  Object.keys (res).forEach (key => {
    res[key].real_label = key;
  });
  return res;
}) ();

export default (state = defaultState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export const getItemsByCategory = data => data;
export const getItems = () => items;
