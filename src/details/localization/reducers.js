import types from './types';

const initialState = {
  selectedLanguage: 'en',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.SET_LANGUAGE:
      localStorage.setItem('language', action.payload); //persist for reload
      window.language = action.payload; //storing value on global storage
      return { ...state, selectedLanguage: action.payload };
    default:
      return state;
  }
};
