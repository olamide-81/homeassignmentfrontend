import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import messageService from './messageservice'

const initialState = {
  messages: [],
  isError: false,
  isSuccess: false,
  isLoading: false,
  message: '',
}

// Create new message
export const createMessages = createAsyncThunk(
  'message/create',
  async (messagesData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await messageService.createMessages(messagesData, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Get user messages
export const getMessages = createAsyncThunk(
  'messages/getAll',
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await messageService.getMessages(token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

// Delete user message
export const deleteMessages = createAsyncThunk(
  'messages/delete',
  async (id, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token
      return await messageService.deleteMessages(id, token)
    } catch (error) {
      const message =
        (error.response &&
          error.response.data &&
          error.response.data.message) ||
        error.message ||
        error.toString()
      return thunkAPI.rejectWithValue(message)
    }
  }
)

export const messageSlice = createSlice({
  name: 'message',
  initialState,
  reducers: {
    reset: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(createMessages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(createMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages.push(action.payload)
      })
      .addCase(createMessages.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(getMessages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages = action.payload
      })
      .addCase(getMessages.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
      .addCase(deleteMessages.pending, (state) => {
        state.isLoading = true
      })
      .addCase(deleteMessages.fulfilled, (state, action) => {
        state.isLoading = false
        state.isSuccess = true
        state.messages = state.messages.filter(
          (messages) => messages._id !== action.payload.id
        )
      })
      .addCase(deleteMessages.rejected, (state, action) => {
        state.isLoading = false
        state.isError = true
        state.message = action.payload
      })
  },
})

export const { reset } = messageSlice.actions
export default messageSlice.reducer