// @flow
import {connect} from 'react-redux';
import Categories from './component';
import {getCategories} from '../../rootReducer';

const mapStateToProps = state => {
  const categories = getCategories (state);
  return {
    categories,
  };
};

const ConnectedComponent = connect (mapStateToProps, null) (Categories);

export default ConnectedComponent;
