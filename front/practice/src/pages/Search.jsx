import BottomNav from "../components/BottomNav";
import Header from "../components/Header";
import SearchBar from "../components/SearchBar";

export default function Search() {
  return (
    <div className="search">
      <Header />
      <SearchBar />
      <BottomNav />
    </div>
  );
}