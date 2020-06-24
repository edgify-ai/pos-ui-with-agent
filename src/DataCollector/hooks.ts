import { useEffect, useRef } from 'react';
import { toastr } from 'react-redux-toastr';

export default (
  makePrediction: (...args: any[]) => any,
  addItemsToReciept: (...args: any[]) => any,
  createGroundTruthHasError: boolean,
  createGroundTruthIsLoading: boolean,
  gt: Object,
  predictions: any[]
) => {
  const prevGroundTruthIsLoading = useRef(false);

  useEffect(() => {
    makePrediction();
  }, [makePrediction]);

  useEffect(() => {
    if (createGroundTruthHasError) {
      toastr.error(
        'Failed to store ground truth.',
        'Probably you use this snapshot already. Or check if agent is running'
      );
    }
    if (
      !createGroundTruthIsLoading &&
      prevGroundTruthIsLoading.current &&
      !createGroundTruthHasError
    ) {
      toastr.success('Sample stored', '');
    }
    prevGroundTruthIsLoading.current = createGroundTruthIsLoading;
  }, [createGroundTruthHasError, createGroundTruthIsLoading]);

  useEffect(() => {
    const onKeyDown = ({ keyCode }: KeyboardEvent) => {
      switch (keyCode) {
        case 16:
          makePrediction();
          break;
        case 32:
          addItemsToReciept(gt, predictions);
          break;
        default:
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [makePrediction, addItemsToReciept, gt, predictions]);
};
