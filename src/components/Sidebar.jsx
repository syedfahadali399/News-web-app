import { LayoutGrid, Bookmark, Bell, Newspaper, X } from "lucide-react"
import { Link, NavLink } from "react-router"

const Sidebar = ({ isSidebarOpen, setIsSidebarOpen }) => {
  const closeSidebar = () => setIsSidebarOpen(false)

  return (
    <>
      <div
        className={`fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm transition-opacity duration-300 md:hidden ${isSidebarOpen ? "opacity-100" : "pointer-events-none opacity-0"}`}
        onClick={closeSidebar}
      />

      <aside className={`fixed inset-y-0 left-0 z-[60] flex w-72 flex-col border-r border-white/5 bg-[#1E293B]/90 py-8 px-4 backdrop-blur-xl transition-transform duration-300 md:w-20 lg:w-64 ${isSidebarOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
          <div className="mb-8 flex items-center justify-between px-2">
            <Link to={"/"} className="flex cursor-pointer items-center gap-3" onClick={closeSidebar}>
              <div className="bg-indigo-500 p-2 rounded-lg text-white">
                <Newspaper size={24} />
              </div>
              <span className="font-black text-xl hidden lg:block tracking-tighter">GRID NEWS</span>
            </Link>
            <button
              onClick={closeSidebar}
              className="flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 text-slate-400 transition-colors hover:border-indigo-400/20 hover:text-indigo-400 md:hidden"
              aria-label="Close sidebar"
            >
              <X size={18} />
            </button>
          </div>

          <nav className="space-y-2 flex-1">
            <NavLink
                to={"/"}
                onClick={closeSidebar}
                className={({isActive}) => `w-full flex items-center gap-4 p-3 rounded-xl transition-all ${isActive?"bg-indigo-500/10 text-indigo-400":"text-slate-400 hover:bg-white/5"}`}
            >
              <LayoutGrid size={20} /> <span className="font-bold text-sm">Dashboard</span>
            </NavLink>
            <NavLink
               to={"/saved-news"}
               onClick={closeSidebar}
                className={({isActive}) => `w-full flex items-center gap-4 p-3 rounded-xl transition-all ${isActive?"bg-indigo-500/10 text-indigo-400":"text-slate-400 hover:bg-white/5"}`}

            >
              <Bookmark size={20} /> <span className="font-bold text-sm">Watchlist</span>
            </NavLink>
          </nav>

          <div className="mt-auto space-y-4">
            <div className="p-4 bg-indigo-500/5 border border-indigo-500/20 rounded-2xl hidden lg:block">
              <p className="text-[10px] font-black text-indigo-400 uppercase mb-2">Pro Member</p>
              <p className="text-xs font-medium text-slate-400">Unlock deeper analytics & global trade insights.</p>
            </div>
            <button className="w-full flex items-center gap-4 p-3 text-slate-400 hover:text-white transition-colors" onClick={closeSidebar}>
              <Bell size={20} /> <span className="font-bold text-sm">Alerts</span>
            </button>
          </div>
        </aside>
    </>
  )
}

export default Sidebar
