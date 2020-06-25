import { useEffect, useRef } from 'react';
import { toastr } from 'react-redux-toastr';

export default (
  makePrediction: (...args: any[]) => any,
  addItemsToReciept: (...args: any[]) => any,
  groundTruthHasError: boolean,
  groundTruthIsLoading: boolean,
  gt: Record<string, any>,
  predictions: any[]
) => {
  const prevGroundTruthIsLoading = useRef(false);

  useEffect(() => {
    makePrediction();
  }, [makePrediction]);

  useEffect(() => {
    if (groundTruthHasError) {
      toastr.error(
        'Failed to store ground truth.',
        'Probably you use this snapshot already. Or check if agent is running'
      );
    }
    if (
      !groundTruthIsLoading &&
      prevGroundTruthIsLoading.current &&
      !groundTruthHasError
    ) {
      toastr.success('Sample stored', '');
    }
    prevGroundTruthIsLoading.current = groundTruthIsLoading;
  }, [groundTruthHasError, groundTruthIsLoading]);

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
