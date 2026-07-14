import { useDispatch, useSelector } from "react-redux";
import { fetchData, fetchDataByQuery, setUpdateNews } from "../store/Features/newsSlice";
import { useEffect, useState, useMemo } from "react";
import { setTab } from "../store/Features/tabSlice";
import { Clock, Bookmark } from "lucide-react";
import { Link } from "react-router";

const NewsPage = () => {

  const categories = [
    "all",
    "tech",
    "finance",
    "sports",
    "politics",
    "science",
  ];

  const dispatch = useDispatch();
  const apiKey = import.meta.env.VITE_API_KEY;
  const status = useSelector((state) => state.news.status);
  const newsData = useSelector((state) => state.news.data);
  const categoryResults = useSelector((state) => state.news.searchData);
  const [activeCategory, setActiveCategory] = useState(categories[0]);

  const properNewsData = useMemo(() => {
    if (categoryResults.length == 0) {
      if (!newsData.newData || !Array.isArray(newsData.newData)) return [];
      return newsData.newData
        .filter(
          (news) =>
            news.article_id &&
            news.image_url !== null &&
            news.pubDate &&
            news.title &&
            news.description &&
            news.source_name &&
            news.category &&
            news.source_url,
        )
        .map((news) => ({
          article_id: news.article_id,
          image_url: news.image_url,
          pubDate: news.pubDate,
          title: news.title,
          description: news.description,
          source_name: news.source_name,
          category: news.category,
          source_url: news.source_url,
          isSaved: news.isSaved,
        }));
    } else {
      if (!categoryResults.newData || !Array.isArray(categoryResults.newData))
        return [];
      return categoryResults.newData
        .filter(
          (news) =>
            news.article_id &&
            news.image_url !== null &&
            news.pubDate &&
            news.title &&
            news.description &&
            news.source_name &&
            news.category,
        )
        .map((news) => ({
          article_id: news.article_id,
          image_url: news.image_url,
          pubDate: news.pubDate,
          title: news.title,
          description: news.description,
          source_name: news.source_name,
          category: news.category,
          isSaved: news.isSaved,
        }));
    }
  }, [newsData, categoryResults]);

  const handleCategory = (category) => {
    dispatch(fetchDataByQuery({ apiKey, query: category }));
  };

  const toggleSave = (id) => {
    dispatch(setUpdateNews({ id }));
  };

  useEffect(() => {
    dispatch(setTab("Global Briefing"));
    if (status === "idle") {
      dispatch(fetchData(apiKey));
    }
  }, []);

  return (
    <>
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 w-full">
        <div className="xl:col-span-3 space-y-8 w-full">
          <div className="flex gap-2 overflow-x-auto pb-2 no-scrollbar">
            {categories.map((cat) => (
              <button
                type="button"
                key={cat}
                onClick={() => {
                  (setActiveCategory(cat), handleCategory(cat));
                }}
                className={`px-5 py-2 rounded-lg cursor-pointer text-xs font-black uppercase tracking-widest transition-all border ${
                  activeCategory === cat
                    ? "bg-indigo-600 text-white border-indigo-500 shadow-lg shadow-indigo-600/20"
                    : "bg-[#1E293B] text-slate-500 border-white/5 hover:border-white/10"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
            {properNewsData.map((news, idx) => {
              return (
                <div
                  key={news.article_id}
                  className={`group relative overflow-hidden w-full rounded-3xl cursor-pointer bg-[#1E293B] border border-white/5 hover:border-indigo-500/50 transition-all duration-500 
                        ${idx === 0 ? "md:col-span-2 h-100" : "h-87.5"}
                        `}
                >
                  <img
                    src={news.image_url}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700"
                    alt="image"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-[#0F172A] via-[#0F172A]/40 to-transparent" />

                  <div className="absolute bottom-0 p-8 w-full space-y-3">
                    <div className="flex items-center gap-3">
                      <div className="flex flex-row gap-2 items-center">
                        {news.category.map((cat, idx) => {
                          return (
                            <span
                              className="px-2 py-0.5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded text-[10px] font-black uppercase tracking-tighter"
                              key={idx}
                            >
                              {cat}
                            </span>
                          );
                        })}
                      </div>
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1">
                        <Clock size={12} />
                        {news.pubDate}
                      </span>
                    </div>
                    <Link
                      to={`/news-detail/${news.article_id}`}
                      className={`
                        ${idx === 0 ? "text-3xl" : "text-xl"} 
                        font-black text-white leading-tight line-clamp-2 group-hover:text-indigo-400 transition-colors`}
                    >
                      {news.title}
                    </Link>
                    {idx === 0 && (
                      <p className="text-slate-300 text-sm font-medium line-clamp-2 max-w-2xl">
                        {news.description}
                      </p>
                    )}

                    <div className="pt-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-black uppercase text-slate-500">
                          {news.source_name}
                        </span>
                      </div>
                      <button
                        onClick={() => toggleSave(news.article_id)}
                        type="button"
                        className={`p-2 rounded-lg transition-all ${news.isSaved ? "bg-indigo-600 text-white" : "bg-white/5 text-white/50 hover:bg-white/10"}`}
                      >
                        <Bookmark size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsPage;