import { LayoutGrid, Bookmark, Bell, Newspaper } from "lucide-react"
import { Link, NavLink } from "react-router"

const Sidebar = () => {
  return (
    <>
      <aside className="w-20 lg:w-64 border-r border-white/5 bg-[#1E293B]/50 backdrop-blur-xl hidden md:flex flex-col py-8 px-4 fixed h-full">
          <Link to={"/"} className="flex cursor-pointer items-center gap-3 mb-12 px-2">
            <div className="bg-indigo-500 p-2 rounded-lg text-white">
              <Newspaper size={24} />
            </div>
            <span className="font-black text-xl hidden lg:block tracking-tighter">GRID NEWS</span>
          </Link>

          <nav className="space-y-2 flex-1">
            <NavLink
                to={"/"} 
                className={({isActive}) => `w-full flex items-center gap-4 p-3 rounded-xl transition-all ${isActive?"bg-indigo-500/10 text-indigo-400":"text-slate-400 hover:bg-white/5"}`}
            >
              <LayoutGrid size={20} /> <span className="hidden lg:block font-bold text-sm">Dashboard</span>
            </NavLink>
            <NavLink
               to={"/saved-news"} 
                className={({isActive}) => `w-full flex items-center gap-4 p-3 rounded-xl transition-all ${isActive?"bg-indigo-500/10 text-indigo-400":"text-slate-400 hover:bg-white/5"}`}

            >
              <Bookmark size={20} /> <span className="hidden lg:block font-bold text-sm">Watchlist</span>
            </NavLink>
          </nav>

          <div className="mt-auto space-y-4">
            <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl hidden lg:block">
              <p className="text-[10px] font-black text-indigo-400 uppercase mb-2">Pro Member</p>
              <p className="text-xs font-medium text-slate-400">Unlock deeper analytics & global trade insights.</p>
            </div>
            <button className="w-full flex items-center gap-4 p-3 text-slate-400 hover:text-white transition-colors">
              <Bell size={20} /> <span className="hidden lg:block font-bold text-sm">Alerts</span>
            </button>
          </div>
        </aside>      
    </>
  )
}

export default Sidebar
