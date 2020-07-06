import { useEffect, useState, useRef } from 'react';
import { toastr } from 'react-redux-toastr';

export default (
  makePrediction,
  addItemsToReciept,
  createGroundTruthHasError,
  createGroundTruthIsLoading,
  gt,
  predictions
) => {
  const prevGroundTruthIsLoading = useRef(false);
  const [count, setCount] = useState(0);

  useEffect(() => {
    makePrediction();
  }, [makePrediction]);

  useEffect(() => {
    if (createGroundTruthHasError) {
      toastr.error(
        'Failed to store ground truth',
        'Probably you use this snapshot already. Or check if agent is running'
      );
    }
    if (
      !createGroundTruthIsLoading &&
      prevGroundTruthIsLoading.current &&
      !createGroundTruthHasError
    ) {
      toastr.success('Sample stored', '', { timeOut: 600 });
      setCount(count + 1);
    }
    prevGroundTruthIsLoading.current = createGroundTruthIsLoading;
  }, [createGroundTruthHasError, createGroundTruthIsLoading]);

  useEffect(() => {
    const onKeyDown = (event) => {
      switch (event.keyCode) {
        case 16:
          makePrediction();
          break;
        case 32:
          event.preventDefault();
          addItemsToReciept(gt, predictions);
          break;
        default:
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [makePrediction, addItemsToReciept, gt, predictions]);

  return { count, setCount };
};
