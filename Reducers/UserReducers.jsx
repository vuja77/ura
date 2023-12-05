const initialState = {
  userData: {},
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_USER_DATA":
      console.log(state);
      return {
        ...state,
        userData: {
          ...state.userData,
          ...action.payload,
        },
      };
    default:
      return state;
  }
};

export default userReducer;
