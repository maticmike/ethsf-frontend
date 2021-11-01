// /* Action Types */
// export const SET_JWT = 'SET_JWT';
// export const CLEAR_JWT = 'CLEAR_JWT';

// export const setJwt = jwt => ({
//   type: SET_JWT,
//   payload: jwt,
// });

// export const setJwtThunk = jwt => {
//   return async (dispatch, getState) => {
//     if (typeof window.ethereum !== 'undefined') {
//       console.log(jwt, 'jwt in thunk');
//       dispatch(setJwt(jwt));
//     }
//   };
// };

// export const clearJwtRedux = () => ({
//   type: CLEAR_JWT,
//   payload: {},
// });
