import { Zap } from "lucide-react";
import { useEffect, useState } from "react";

const TopHeadline = () => {

    const [newsIndex, setNewsIndex] = useState(0);

    const breakingNews = [
      "Tech Giants announce new AI safety protocols",
      "Global markets see 2% jump in morning trade",
      "Mars rover discovers ancient water deposits",
      "Championship finals scheduled for next Sunday"
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            if(newsIndex == 3) {
                setNewsIndex(0)
            } else {
                setNewsIndex(prev => prev + 1)
            }
        }, 3500)

        return () => clearInterval(interval)
    }, [newsIndex])
    
  return (
    <>
      <div className="bg-indigo-600 h-10 flex items-center overflow-hidden border-b border-white/10">
        <div className="flex items-center px-4 bg-indigo-700 h-full font-black text-[10px] uppercase tracking-tighter text-white z-10">
          <Zap size={14} className="mr-2" /> Breaking
        </div>
        <div className="flex-1 px-4 text-xs font-bold text-indigo-50 italic animate-in slide-in-from-right duration-700 ease-in-out" key={newsIndex}>
          {breakingNews[newsIndex]}
        </div>
      </div>
    </>
  )
}

export default TopHeadline
