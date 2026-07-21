import { useState } from "react"
import { Route, Routes } from "react-router"
import Header from "./components/Header"
import NewsPage from "./components/NewsPage"
import Sidebar from "./components/Sidebar"
import SavedNews from "./components/SavedNews"
import TopHeadline from "./components/TopHeadline"
import NewsDetail from "./components/NewsDetail"

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <>
      <div className="min-h-screen bg-[#0F172A] text-slate-200 font-sans">
        <TopHeadline/>
        <div className="max-w-400 mx-auto flex min-h-screen">
          <Sidebar isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} />
          <main className="flex-1 md:ml-20 lg:ml-64 p-4 lg:p-8">
            <Header setIsSidebarOpen={setIsSidebarOpen} />
            <Routes>
              <Route path="/" element={<NewsPage/>}/>
              <Route path="/saved-news" element={<SavedNews/>}/>
              <Route path="/news-detail/:id" element={<NewsDetail/>}/>
            </Routes>
          </main>
        </div>
      </div>
    </>
  )
}

export default App
