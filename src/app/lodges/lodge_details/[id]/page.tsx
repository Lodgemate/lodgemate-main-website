import SearchBar from "./SearchBar";
import LodgeInfo from "./LodgeInfo";

const LodgeDetailPage: React.FC = () => {
  return (
    <div className="mt-[80px] sm:mt-[120px] text-[16px]">
      <div className="hidden sm:block">
        <SearchBar  />
      </div>
        <LodgeInfo  />
      
    </div> 
  );
};

export default LodgeDetailPage;
