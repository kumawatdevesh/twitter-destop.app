import {GET_SIGNIN_LOADING, GET_SIGNIN_SUCCESS, GET_SIGNIN_FAILURE, GET_SIGNIN_RESET, POST_SIGNIN_LOADING, POST_SIGNIN_SUCCESS, POST_SIGNIN_FAILURE, POST_SIGNIN_RESET} from '../../actions/types';

const INITIAL_STATE = {
	signin: {
    post: {
			loading: false,
			reset: false,
			success: {
			  ok: false,
			  data: null,
			},
			failure: {
			  error: false,
			  message: '',
			},
		},
  },
};

const getSignInReducers = (state=INITIAL_STATE, action) => {
    switch(action.type) {
          case POST_SIGNIN_LOADING:
            return {
              ...state,
              signin: {
                ...state.signin,
                post: {
                  ...state.signin.post,
                  loading: true,
                  reset: false,
                  success: {
                    ...state.signin.post.success,
                    ok: false,
                  },
                  failure: {
                    error: false,
                    message: '',
                  },
                },
              },
            };
          case POST_SIGNIN_SUCCESS:
            return {
              ...state,
              signin: {
                ...state.signin,
                post: {
                  ...state.signin.post,
                  loading: false,
                  reset: false,
                  success: {
                    ...state.signin.post.success,
                    ok: true,
                    data: action.payload,
                  },
                  failure: {
                    error: false,
                    message: '',
                  },
                },
              },
            };
          case POST_SIGNIN_FAILURE:
            return {
              ...state,
              signin: {
                ...state.signin,
                post: {
                  ...state.signin.post,
                  loading: false,
                  reset: false,
                  success: {
                    ...state.signin.post.success,
                    ok: false,
                    data: null,
                  },
                  failure: {
                    error: true,
                    message: action.payload.message,
                  },
                },
              },
            };
          case POST_SIGNIN_RESET:
            return {
              ...state,
              signin: {
                ...state.signin.post,
                post: {
                  ...INITIAL_STATE.signin.post,
                  reset: true,
                },
              },
            }
    }
    return INITIAL_STATE;
}

export default getSignInReducers;