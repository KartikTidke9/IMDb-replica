import { useCallback, useState } from "react";
import { useDispatch } from "react-redux";

function useThunk(thunk) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();

  const runThunk = useCallback(
    async (arg) => {
      try {
        setLoading(true);
        await dispatch(thunk(arg)).unwrap();
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    },
    [dispatch, thunk]
  );

  return [runThunk, loading, error];
}

export { useThunk };
