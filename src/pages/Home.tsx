import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../store/hooks";
import { setActiveSlide } from "../store/slices/editorSlice";
import SlidersSearch from "../components/SlidersSearch";
import SlidersTable from "../components/SlidersTable";
import SlidersPagination from "../components/SlidersPagination";

// Mock data for slides
const mockSlides = [
  { id: 1, name: "Pfizer - Global", type: "Slide", status: "Active" },
  { id: 2, name: "Merck - Group", type: "master", status: "Active" },
  { id: 3, name: "Sanofi - Group", type: "popup", status: "Active" },
  { id: 4, name: "AstraZeneca - Group", type: "slide", status: "Active" },
  { id: 5, name: "GSK - Group", type: "slide", status: "Inactive" },
  { id: 6, name: "Novartis - Group", type: "slide", status: "Inactive" },
  { id: 7, name: "Bio Pharma - Group", type: "slide", status: "Inactive" },
];

const Home = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const Search = `/Icons/search.svg`;

  const handleSlideClick = (id: number) => {
    dispatch(setActiveSlide(id.toString()));
    navigate(`/slides/${id}`);
  };

  return (
    <div className="flex-1 w-full overflow-y-auto bg-background text-foreground font-sans">
      <main className="max-w-[1200px] mx-auto py-12 px-6">
        <h1 className="text-3xl font-bold text-primary mb-8 animate-fade-in-up">
          Slides
        </h1>

        <div className="animate-fade-in-up delay-100">
          <SlidersSearch searchIconSrc={Search} />
        </div>

        <div className="animate-scale-in delay-200">
          <SlidersTable slides={mockSlides} onSlideClick={handleSlideClick} />
        </div>

        <div className="animate-fade-in-up delay-300">
          <SlidersPagination />
        </div>
      </main>
    </div>
  );
};

export default Home;
