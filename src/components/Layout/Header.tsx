import LogOut from "../LogOut";
import UserAvatar from "../UserAvatar";
import ThemeToggle from "../ui/ThemeToggle";

const Header = () => {
  return (
    <header className="bg-primary text-white p-4">
      <div className="flex justify-between items-center container mx-auto">
        <div className="flex items-center gap-4">
          <ThemeToggle />
        </div>
        <div className="flex items-center gap-4">
          <UserAvatar />
          <LogOut />
        </div>
      </div>
    </header>
  );
};

export default Header;
