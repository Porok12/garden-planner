import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import {gql, GraphQLClient} from "graphql-request";

const initialState: AppBrowseState = {
    status: 'idle',
    items: []
}

export const fetchBrowse = createAsyncThunk('browser/fetch', async () => {
    const query = gql`
        {
            trefle {
                commonName
                binomialName
            }
        }
    `;

    const client = new GraphQLClient('graphql');
    const response = await client.request(query);
    console.debug(response);
    return response.trefle;
})

const slice = createSlice({
    name: 'browser',
    initialState,
    reducers: {
        search(state, action) {

        }
    },
    extraReducers: builder => {
        builder
            .addCase(fetchBrowse.pending, (state) => {
                state.status = 'pending';
            })
            .addCase(fetchBrowse.fulfilled, (state, action) => {
                // console.debug(action.payload);
                state.items = [];
                state.status = 'idle';
            })
    }
})

export const { actions } = slice;

export default slice.reducer;

