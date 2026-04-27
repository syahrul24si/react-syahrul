import ErrorPage from "../components/ErrorPage";
import error401Image from "../assets/error-401.png";

export default function Error401() {
  return (
    <ErrorPage
      errorCode="401"
      description="Unauthorized"
      image={error401Image}
    />
  );
}