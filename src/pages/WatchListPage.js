import { useSelector } from "react-redux";
import NavBar from "../components/NavBar";

function WatchListPage() {
  const { user } = useSelector((state) => state.users);
  console.log(user);
  return (
    <h1>
      <NavBar />
      WatchListPage
    </h1>
  );
}

export default WatchListPage;
