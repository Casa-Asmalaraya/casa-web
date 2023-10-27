import { Orb } from "worb";
import Header from "~/components/Header";
import SearchBar from "~/components/SearchBar";

export default function PageHeader({ searchQuery }: { searchQuery: Orb<string | undefined> }) {
  return (
    <Header title="Cek Booking">
      <SearchBar onChanged={(value) => (searchQuery.value = value)} />
    </Header>
  );
}
