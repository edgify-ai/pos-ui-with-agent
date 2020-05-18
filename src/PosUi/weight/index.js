// @flow
import {connect} from 'react-redux';
import Weight from './component';
import {getWeight} from '../../rootReducer';

const mapStateToProps = state => {
  const weight = getWeight (state);
  return {
    weight,
  };
};

export default connect (mapStateToProps, null) (Weight);
