import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  status: "",
  colors: [],
};

const filterSlice = createSlice({
  name: "filterTodo",
  initialState,
  reducers: {
    statusChnage: (state, action) => {
      state.status = action.payload;
    },

    colorChange: (state, action) => {
      const { color, changeType } = action.payload;

      switch (changeType) {
        case "add":
          state.colors.push(color);
          return
        case "remove":
            (state.colors = state.colors.filter((c) => c !== color));
            return 

        default:
          return state;
      }
    },
  },
});

export default filterSlice.reducer;
export const { statusChnage, colorChange } = filterSlice.actions;
