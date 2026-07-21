import { Search, Zap, History, Menu } from "lucide-react"
import { useEffect, useRef, useState, useMemo } from "react"
import { useDispatch, useSelector } from "react-redux"
import { fetchDataByQuery } from "../store/Features/newsSlice"
import { useDebounce } from "../hooks/Debounce"
import { Link } from "react-router"

const Header = ({ setIsSidebarOpen }) => {

    const date = new Date()
    const dispatch = useDispatch()
    const apiKey = import.meta.env.VITE_API_KEY
    const searchResults = useSelector((state) => state.news.searchData);
    const currentTabHeading = useSelector((state) => state.tab.tab)
    const [searchQuery, setSearchQuery] = useState("")
    const [isSearchFocused, setIsSearchFocused] = useState(false)
    const searchRef = useRef()

    const debounceQuery = useDebounce(searchQuery, 1000)

    const properNewsResults = useMemo(() => {
    
        if (!searchResults.newData || !Array.isArray(searchResults.newData)) return [];
        return searchResults.newData
          .filter((news) => news.article_id && news.image_url !== null && news.pubDate && news.title && news.description && news.source_name && news.category && news.source_url)
          .map((news) => ({
            article_id: news.article_id,
            image_url: news.image_url,
            pubDate: news.pubDate,
            title: news.title,
            description: news.description,
            source_name: news.source_name,
            category: news.category,
            source_url: news.source_url,
            isSaved: news.isSaved
          }));
    
    }, [searchResults]);

    const handleSearch = () => {
      setTimeout(() => {
        setSearchQuery("")
        setIsSearchFocused(false)
      }, 1500)
    }
    
    useEffect(() => {
        if (debounceQuery.trim() !== "") {
            dispatch(fetchDataByQuery({ apiKey, query: debounceQuery }))

        }
    }, [debounceQuery])
  return (
    <>
       <div className="relative z-0 flex flex-col lg:flex-row lg:items-center justify-between gap-6 mb-10">
            <div>
              <h1 className="text-3xl font-black tracking-tight text-white mb-1">
                {currentTabHeading}
              </h1>
              <p className="text-slate-400 text-sm font-medium">{date.toLocaleDateString()} • Real-time Updates</p>
            </div>

            <div className="relative z-10 flex items-center gap-3 flex-1 lg:flex-none" 
            ref={searchRef}
            >
              <button
                onClick={() => setIsSidebarOpen(true)}
                className="lg:hidden flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-[#1E293B]/80 text-slate-200 shadow-lg transition-all hover:border-indigo-400/20 hover:text-indigo-400"
                aria-label="Open sidebar"
              >
                <Menu size={20} />
              </button>

              <div className="relative flex-1 lg:w-112.5">
                <Search className={`absolute left-4 top-1/2 -translate-y-1/2 transition-colors 
                  ${isSearchFocused ? 'text-indigo-400' : 'text-slate-500'}
                    `} size={18} />
                <input 
                  type="text"
                  placeholder="Search news engine..."
                  className={`w-full bg-[#1E293B] border rounded-2xl py-3.5 pl-12 pr-4 focus:outline-none transition-all text-sm font-medium ${
                    isSearchFocused 
                    ? 'border-indigo-500 ring-4 ring-indigo-500/10 shadow-2xl' 
                    : 'border-white/5 hover:border-white/20 shadow-lg'
                    }`}
                  value={searchQuery}
                  onFocus={() => setIsSearchFocused(true)}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />

                {isSearchFocused && (searchQuery.length > 0 || properNewsResults.length > 0) && (
                  <div className="absolute top-full left-0 right-0 z-70 mt-3 bg-[#1E293B] border border-white/10 rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden animate-in slide-in-from-top-4 fade-in duration-200 backdrop-blur-2xl">
     
     
                    <div className="max-h-125 overflow-y-auto no-scrollbar">
                      {properNewsResults.length > 0 ? (
                        <div className="p-2">
                          <div className="px-4 py-3 flex items-center justify-between">
                             <span className="text-[10px] font-black uppercase tracking-widest text-indigo-400 flex items-center gap-2">
                               <Zap size={12} /> Top Matches
                             </span>
                             <span className="text-[10px] text-slate-500 font-bold">{properNewsResults.length} items found</span>
                          </div>
                          <div className={`space-y-1`}>
                            {properNewsResults.map((art) => {
                                
                                return (

                              <Link
                                onClick={handleSearch}
                                to={`/news-detail/${art.article_id}`}
                                key={art.article_id}
                                className="w-full text-left p-3 flex items-start gap-4 hover:bg-white/5 rounded-2xl transition-all group"
                              >
                                <img src={art.image_url} className="w-16 h-16 rounded-xl object-cover shrink-0" alt="image" />
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                      {art.category.map(cat => {
                                        return (
                                            <span key={cat} className="text-[9px] font-black text-indigo-400 uppercase tracking-tighter px-1.5 py-0.5 bg-indigo-500/10 rounded">{cat}</span>
                                        )
                                      })}
                                    <span className="text-[9px] font-bold text-slate-500 uppercase tracking-widest italic">{art.source_name}</span>
                                  </div>
                                  <h4 className="text-sm font-bold text-slate-200 line-clamp-2 group-hover:text-indigo-400 transition-colors leading-tight">
                                    {art.title}
                                  </h4>
                                </div>
                              </Link>
                                )
                            }
                            )}
                          </div>
                        </div>
                      ) : (
                        <div className="p-12 text-center space-y-3">
                           <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto text-slate-500">
                             <History size={24} />
                           </div>
                           <p className="text-sm font-bold text-slate-400">No matching headlines</p>
                           <p className="text-xs text-slate-500 font-medium px-4">Try searching for "tech", "finance", or broader keywords.</p>
                        </div>
                      )}

                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
    </>
  )
}

export default Header
