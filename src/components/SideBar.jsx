import { Sun, Moon } from "lucide-react";
import Profile from "../assets/myprofile.jpg";
import useTheme from "../hooks/useTheme";

const SideBar = () => {
    const { theme, toggleTheme } = useTheme();

    return (
        <nav className="flex sm:flex-col justify-between sm:w-15 sm:h-full w-full h-15 bg-slate-800 fixed left-0 top-0 sm:rounded-tr-2xl sm:rounded-br-2xl overflow-hidden z-100">
            <button className="sm:w-full sm:h-12 w-12 bg-blue-700 grid place-content-center rounded-tr-2xl rounded-br-2xl sm:rounded-none">
                <div className="w-8 h-8 rounded-[50%] bg-slate-300"></div>
            </button>
            <div className="flex sm:flex-col gap-4 p-3 items-center text-slate-400">
                <button onClick={toggleTheme}>
                    {theme === "light" ? <Moon /> : <Sun />}
                </button>
                <figure className="w-7.5 h-7.5 ">
                    <img
                        src={Profile}
                        alt="profile"
                        className="rounded-[50%]"
                    />
                </figure>
            </div>
        </nav>
    );
};

export default SideBar;
