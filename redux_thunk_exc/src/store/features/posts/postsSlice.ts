import { createAsyncThunk, createSlice, nanoid, PayloadAction } from "@reduxjs/toolkit";
import { sub } from 'date-fns';
import { Post, RootState, Status } from "../../../types";
import axios from 'axios';

const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// הגדרת טיפוס למצב ההתחלתי
interface PostStateType {
    posts: Post[];
    status:Status;
    error: string | null;
}

const initialState: PostStateType = {
    posts: [],
    status: 'idle',
    error: null
};

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () :Promise<Post[]|undefined> => {
    const response = await axios.get(POSTS_URL);
    return response.data;
    
})

// הגדרת טיפוס לפעולת הוספת תגובה


const postsSlice = createSlice({
    name: 'posts',
    initialState,
    reducers: {
        postAdded: {
            reducer(state, action: PayloadAction<Post>) {
                state.push(action.payload);
            },
            prepare(title: string, content: string, userId: string) {
                return {
                    payload: {
                        id: nanoid(),
                        title,
                        content,
                        date: new Date().toISOString(),
                        userId,
                        reactions: {
                            thumbsUp: 0,
                            wow: 0,
                            heart: 0,
                            rocket: 0,
                            coffee: 0
                        }
                    }
                };
            }
        },
        reactionAdded(state, action: PayloadAction<ReactionAddedPayload>) {
            const { postId, reaction } = action.payload;
            const existingPost = state.find(post => post.id === postId);
            if (existingPost) {
                existingPost.reactions[reaction]++;
            }
        }
    }
});

// סלקטור עם טיפוס מדויק
export const selectAllPosts = (state: RootState): Post[] => state.posts;

export const { postAdded, reactionAdded } = postsSlice.actions;

export default postsSlice.reducer;