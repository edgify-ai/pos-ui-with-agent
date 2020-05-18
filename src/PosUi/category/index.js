// @flow
import { connect } from 'react-redux';
import Items from './component';
import {setGroundTruth} from '../groundTruth/actions'

import { getItemsByCategory } from '../../rootReducer';


const mapStateToProps = (state, ownProps) => {
  const { category } = ownProps.match.params;
  const categoryItems=getItemsByCategory(state)[category.toLowerCase()] || {};
  Object.keys(categoryItems).forEach(key => {
    categoryItems[key].key = key.toLowerCase()
  })
  return {
    items: categoryItems,
    category
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setGroundTruth: (gt) => {
      dispatch(setGroundTruth(gt))
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Items);
