import { useEffect } from "react";
import { X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { setTab } from "../store/Features/tabSlice";
import { Link } from "react-router";
import { setDeleteNews } from "../store/Features/newsSlice";

const SavedNews = () => {
  const dispatch = useDispatch();
  const savedNews = useSelector((state) => state.news.savedNews);

  const deleteNews = (id) => {
    dispatch(setDeleteNews({ id }));
  };

  useEffect(() => {
    dispatch(setTab("Your WatchList"));
  }, []);

  return (
    <>
      {savedNews.length == 0 ? (
        <p className="text-white text-2xl font-bold uppercase">No News to Show</p>
      ) : (
        <div className="animate-in slide-in-from-bottom-4 duration-500">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {savedNews.map((news) => (
              <div
                key={news.article_id}
                className="bg-[#1E293B] rounded-3xl overflow-hidden border border-white/5 group cursor-pointer h-full"
              >
                <img
                  src={news.image_url}
                  className="w-full h-48 object-cover"
                  alt="image"
                />
                <div className="p-6 space-y-3">
                  <div className="flex flex-row gap-2 items-center">
                    {news.category.map((cat, idx) => {
                      return (
                        <p
                          key={idx}
                          className="text-[10px] px-2 py-0.5 font-black bg-indigo-600/20 p-2 text-indigo-400 border border-indigo-500/30 uppercase tracking-tighter"
                        >
                          {cat}
                        </p>
                      );
                    })}
                  </div>
                  <Link
                    to={`/news-detail/${news.article_id}`}
                    className="font-bold text-lg group-hover:text-indigo-400 transition-colors"
                  >
                    {news.title}
                  </Link>
                  <button
                    type="button"
                    onClick={() => deleteNews(news.article_id)}
                    className="flex items-center gap-2 text-xs font-bold text-rose-400 mt-4"
                  >
                    <X size={14} /> Remove from watchlist
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default SavedNews;
