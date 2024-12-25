import { useLocation } from "react-router-dom";

const usePreviousLocation = () => {
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  return from;
};

export default usePreviousLocation;
