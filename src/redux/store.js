import { configureStore, createSlice } from "@reduxjs/toolkit";

const initialState = {
  jdList: [],
  locations: [],
  totalCount: 0,
};

const jdSlice = createSlice({
  name: "jobDescriptions",
  initialState,
  reducers: {
    addJD: (state, action) => {
      state.jdList =
        state.jdList.length > 0
          ? [...state.jdList, ...action.payload]
          : action.payload;
      state.locations = [
        ...new Set([
          ...action.payload
            .map((jd) => jd.location.toUpperCase())
            .filter(
              (location) =>
                location !== "REMOTE" &&
                location !== "HYBRID" &&
                location !== "ONSITE"
            ),
        ]),
      ];
    },

  },
});

export const { addJD, updateTotalCount, filterByExperience } = jdSlice.actions;

export default configureStore({
  reducer: jdSlice.reducer,
});
