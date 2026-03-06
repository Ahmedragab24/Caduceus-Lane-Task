import CustomImage from "./ui/Image";

const UserAvatar = () => {
  return (
    <div className="flex items-center gap-3">
      <CustomImage src="/Images/user.png" width={8} height={8} className="" />
      <div className="flex flex-col">
        <span className="text-sm font-si tracking-wide uppercase">
          Helen Smith
        </span>
        <span className="text-[10px] text-gray-300 uppercase tracking-wider">
          Admin
        </span>
      </div>
    </div>
  );
};

export default UserAvatar;
