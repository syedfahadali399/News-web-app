import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router";
import { ArrowLeft, Globe, Share2, Bookmark } from "lucide-react";
import { setUpdateNews } from "../store/Features/newsSlice";
import { useState, useEffect } from "react";

const NewsDetail = () => {
    
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const newsData = useSelector((state) => state.news.data);
  const savedNewsData = useSelector((state) => state.news.savedNews);
  const searchData = useSelector((state) => state.news.searchData);
  let [findNews] = useState();

  findNews = newsData.newData.find((news) => news.article_id === id);
  if (findNews == undefined || null) {
    findNews = savedNewsData.find((news) => news.article_id === id);
    if (findNews == undefined || null) {
      findNews = searchData.newData.find((news) => news.article_id === id);
    }
  }

  useEffect(() => {
    if (!findNews) {
      navigate(-1);
    }
  }, [findNews, navigate]);

  if (!findNews) return null;

  const saveNews = (id) => {
    dispatch(setUpdateNews({ id }));
  };

  return (
    <>
      <div className="mx-auto animate-in fade-in duration-700 pb-20">
        <button
          type="button"
          onClick={() => navigate(-1)}
          className="flex cursor-pointer items-center gap-2 text-slate-400 font-bold mb-8 hover:text-white transition-colors"
        >
          <ArrowLeft size={18} /> Back to Briefing
        </button>

        <div className="space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-4">
              {findNews.category.map((cat) => {
                return (
                  <span
                    key={cat}
                    className="px-3 cursor-pointer py-1 bg-indigo-600 text-white rounded font-black text-[10px] uppercase tracking-widest"
                  >
                    {cat}
                  </span>
                );
              })}
              <Link
                to={`${findNews.source_url}`}
                target="_blank"
                className="text-slate-500 text-xs font-bold cursor-pointer flex items-center gap-2 uppercase tracking-widest"
              >
                <Globe size={14} /> {findNews.source_name}
              </Link>
            </div>
            <h1 className="text-4xl md:text-6xl font-black text-white leading-tight">
              {findNews.title}
            </h1>
            <p className="text-xl text-slate-400 font-medium leading-relaxed italic border-l-4 border-indigo-500 pl-6 py-2">
              {findNews.description}
            </p>
          </div>

          <div className="aspect-video rounded-[3rem] overflow-hidden">
            <img
              src={findNews.image_url}
              className="w-full h-full object-cover"
              alt="image"
            />
          </div>

          <div className="flex items-center justify-between py-6 border-b border-white/5">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-indigo-500 rounded-2xl flex items-center justify-center font-black text-xl text-white">
                {findNews.source_name.charAt(0)}
              </div>
              <div>
                <Link
                  to={`${findNews.source_url}`}
                  target="_blank"
                  className="font-black cursor-pointer text-white"
                >
                  {findNews.source_name}
                </Link>
                <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">
                  Staff Writer
                </p>
              </div>
            </div>
            <div className="flex gap-2">
              <button className="p-3 bg-white/5 cursor-pointer rounded-xl text-slate-400 hover:text-white hover:bg-white/10 transition-all">
                <Share2 size={20} />
              </button>
              <button
                type="button"
                onClick={() => saveNews(findNews.article_id)}
                className={`p-3 ${findNews.isSaved ? "bg-indigo-500" : "bg-white/5"} cursor-pointer rounded-xl text-white transition-all`}
              >
                <Bookmark size={20} />
              </button>
            </div>
          </div>

          <div className="text-slate-300 text-lg leading-loose space-y-6 pt-6">
            <div className="bg-indigo-600/10 border border-indigo-500/20 p-8 rounded-4xl flex flex-col md:flex-row items-center gap-8 text-center md:text-left mt-12">
              <div className="flex-1 space-y-2">
                <h4 className="text-white font-black text-xl">
                  Access Full Report
                </h4>
                <p className="text-slate-400 text-sm font-medium">
                  This article is part of our morning executive briefing.
                  Continue reading on our main portal.
                </p>
              </div>
              <button className="px-8 py-4 cursor-pointer bg-white text-indigo-600 rounded-2xl font-black uppercase text-xs tracking-[0.2em] shadow-lg shadow-indigo-600/20 hover:scale-105 transition-all">
                Read More At Source
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NewsDetail;
