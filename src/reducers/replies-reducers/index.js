import { GET_REPLIES_LOADING, GET_REPLIES_SUCCESS, GET_REPLIES_FAILURE, GET_REPLIES_RESET } from '../../actions/types';

const INITIAL_STATE = {
	replies: {
      get: {
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

const getRepliesReducers = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_REPLIES_LOADING:
            return {
              ...state,
              replies: {
                ...state.replies,
                get: {
                  ...state.replies.get,
                  loading: true,
                  reset: false,
                  success: {
                    ...state.replies.get.success,
                    ok: false,
                  },
                  failure: {
                    error: false,
                    message: '',
                  },
                },
              },
            };
          case GET_REPLIES_SUCCESS:
            return {
              ...state,
              replies: {
                ...state.replies,
                get: {
                  ...state.replies.get,
                  loading: false,
                  reset: false,
                  success: {
                    ...state.replies.get.success,
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
          case GET_REPLIES_FAILURE:
            return {
              ...state,
              replies: {
                ...state.replies,
                get: {
                  ...state.replies.get,
                  loading: false,
                  reset: false,
                  success: {
                    ...state.replies.get.success,
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
          case GET_REPLIES_RESET:
            return {
              ...state,
              replies: {
            ...state.replies.get,
            get: {
              ...INITIAL_STATE.replies.get,
              reset: true,
          },
        },
      };
    }
    return INITIAL_STATE;
}

export default getRepliesReducers;