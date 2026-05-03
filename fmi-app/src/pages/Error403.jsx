import ErrorPage from "../components/ErrorPage";
import error403Image from "../assets/error-403.png";

export default function Error403() {
  return (
    <ErrorPage
      errorCode="403"
      description="Forbidden"
      image={error403Image}
    />
  );
}