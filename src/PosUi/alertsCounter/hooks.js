import { useDispatch, useSelector } from 'react-redux';
import { getAlertsCounter } from '../../rootReducer';
import { resetAlerts } from './actions';

export default () => {
  const counter = useSelector(getAlertsCounter);
  const dispatch = useDispatch();
  const value = counter > 99 ? '99+' : counter;
  return {
    value,
    resetAlerts: () => dispatch(resetAlerts()),
  };
};
