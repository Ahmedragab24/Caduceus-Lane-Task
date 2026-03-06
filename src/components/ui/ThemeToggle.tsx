import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { toggleTheme } from "../../store/slices/appSlice";
import { FaMoon, FaSun } from "react-icons/fa";

const ThemeToggle = () => {
  const dispatch = useDispatch();
  const theme = useSelector((state: RootState) => state.app.theme);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className="p-2 rounded-full hover:bg-white/10 transition-colors focus:outline-hidden"
      aria-label="Toggle theme"
    >
      {theme === "light" ? (
        <FaMoon className="w-5 h-5 text-white" />
      ) : (
        <FaSun className="w-5 h-5 text-white" />
      )}
    </button>
  );
};

export default ThemeToggle;
