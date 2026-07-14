import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchData = createAsyncThunk(
    "posts/fetchAll",
    async (apiKey, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${apiKey}&language=ar,en,ur`)
            const data = await response.json()
            const newData = data.results.map((data) => {
                const news = {
                    ...data,
                    isSaved: false
                }
                return news
            })
            const finalData = {
                newData
            }
            return finalData
        } catch (error) {
            return rejectWithValue("Failed to Fetch Data", error)
        }
    },
    {
        condition: (_, { getState }) => {
            const { status } = getState().news
            if (status === 'rejected' || status === 'succeeded') return false
        }
    },

)

export const fetchDataByQuery = createAsyncThunk(
    "posts/fetchQuery",
    async ({ apiKey, query }, { rejectWithValue }) => {
        try {
            const response = await fetch(`https://newsdata.io/api/1/latest?apikey=${apiKey}&q=${query}&language=ar,en,ur&image=1`)
            const data = await response.json()
            const newData = data.results.map(data => {
                const news = {
                    ...data,
                    isSaved: false
                }
                return news
            })
            const finalData = {
                newData
            }
            return finalData
        } catch (error) {
            return rejectWithValue("Failed to fetch data", error)
        }
    },
)

export const newsSlice = createSlice({
    name: "news",
    initialState: {
        data: [],
        savedNews: JSON.parse(localStorage.getItem("saved-news")) || [],
        searchData: [],
        loading: false,
        status: "idle",
        error: null,
        searchLoading: false,
        searchStatus: "idle",
        searchError: null
    },
    reducers: {
        
        setUpdateNews: (state, action) => {    
            const { id } = action.payload
            let findNews;
            findNews = state.data.newData.find((news) => news.article_id === id)
            if(findNews == undefined) {
                findNews = state.savedNews.find(news => news.article_id === id)
                if(findNews == undefined) {
                    findNews = state.searchData.newData.find(news => news.article_id === id)
                }
            }
            if(findNews) {
                if(findNews.isSaved == false) {
                    findNews.isSaved = !findNews.isSaved
                    state.savedNews.push(findNews)
                    localStorage.setItem("saved-news", JSON.stringify(state.savedNews))
                } else {
                    findNews.isSaved = !findNews.isSaved
                    state.savedNews = state.savedNews.filter(news => news.article_id !== id)
                    localStorage.setItem("saved-news", JSON.stringify(state.savedNews))
                }
            }
        },

        setDeleteNews: (state, action) => {
            const { id } = action.payload
            state.savedNews = state.savedNews.filter(news => news.article_id !== id)
            localStorage.setItem("saved-news", JSON.stringify(state.savedNews))
        },

    },

    extraReducers: (builder) => {
        builder
          
            .addCase(fetchData.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchData.fulfilled, (state, action) => {
                state.status = "succeeded"
                state.loading = false
                state.data = action.payload
            })
            .addCase(fetchData.rejected, (state, action) => {
                state.status = "rejected"
                state.loading = false
                state.error = `Failed to Fetch Data, ${action.payload}`
            })

            .addCase(fetchDataByQuery.pending, (state) => {
                state.searchLoading = true
            })
            .addCase(fetchDataByQuery.fulfilled, (state, action) => {
                state.searchStatus = "succeeded"
                state.searchLoading = false
                state.searchData = action.payload
            })
            .addCase(fetchDataByQuery.rejected, (state, action) => {
                state.searchStatus = "rejected"
                state.searchLoading = false
                state.searchError = `Failed to Fetch Data, ${action.payload}`
            })

    }
})

export const { setUpdateSave, setUpdateNews, setDeleteNews } = newsSlice.actions

export default newsSlice.reducer