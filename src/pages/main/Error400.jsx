import ErrorPage from "../../components/ErrorPage";
import error400Image from "../../assets/error-400.png";

export default function Error400() {
  return (
    <ErrorPage
      errorCode="400"
      description="Bad Request"
      image={error400Image}
    />
  );
}