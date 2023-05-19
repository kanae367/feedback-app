import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    feedbacksLoadingStatus: 'idle',
    feedbacks: false,
    feedbackIndex: -1,
    currentFeedback: false,
    roadmap: [{name: 'planned'}, {name: 'in-progress'}, {name: 'live'}],
    comments: false,
    user: false,
    filter: 'all',
    sortingMethod: 'mu'
};

const feedbackSlice = createSlice({
    name: 'feedbacks',
    initialState,
    reducers: {
        feedbacksFetching: state => {state.feedbacksLoadingStatus = 'loading'},
        feedbacksFetched: (state, action) => {
            state.feedbacksLoadingStatus = 'idle';
            state.feedbacks = action.payload;
        },
        feedbacksFetchingError: state => {state.feedbacksLoadingStatus = 'error'},
        feedbackOpened: (state, action) => {
            state.feedbackIndex = action.payload.id;
            state.currentFeedback = action.payload.feedback;
        },
        roadmapFetched: (state, action) => {
            state.roadmap = action.payload;
        },
        commentsFetched: (state, action) => {
            state.comments = action.payload;
        },
        userFetched: (state, action) => {
            state.user = action.payload;
        },
        commentAdded: (state, action) => {
            state.currentFeedback.comments++;
            if(state.comments) {
                state.comments.push(action.payload);
            }else{
                state.comments = [action.payload];
            }
        },
        filterSelected: (state, action) => {
            state.filter = action.payload;
        },
        sortingSelected: (state, action) => {
            state.sortingMethod = action.payload;
        }
    }
});

const {actions, reducer} = feedbackSlice;

export default reducer;
export const {
    feedbacksFetching,
    feedbacksFetched,
    feedbacksFetchingError,
    feedbackOpened,
    roadmapFetched,
    commentsFetched,
    userFetched,
    commentAdded,
    filterSelected,
    sortingSelected
} = actions;