import { GET_TWEETS_LOADING, GET_TWEETS_SUCCESS, GET_TWEETS_FAILURE, GET_TWEETS_RESET, POST_TWEETS_LOADING, POST_TWEETS_SUCCESS, POST_TWEETS_FAILURE, POST_TWEETS_RESET } from '../../actions/types';

const INITIAL_STATE = {
	tweet: {
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

const getTweetsReducers = (state=INITIAL_STATE, action) => {
    switch(action.type) {
        case GET_TWEETS_LOADING:
            return {
              ...state,
              tweet: {
                ...state.tweet,
                get: {
                  ...state.tweet.get,
                  loading: true,
                  reset: false,
                  success: {
                    ...state.tweet.get.success,
                    ok: false,
                  },
                  failure: {
                    error: false,
                    message: '',
                  },
                },
              },
            };
          case GET_TWEETS_SUCCESS:
            return {
              ...state,
              tweet: {
                ...state.tweet,
                get: {
                  ...state.tweet.get,
                  loading: false,
                  reset: false,
                  success: {
                    ...state.tweet.get.success,
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
          case GET_TWEETS_FAILURE:
            return {
              ...state,
              tweet: {
                ...state.tweet,
                get: {
                  ...state.tweet.get,
                  loading: false,
                  reset: false,
                  success: {
                    ...state.tweet.get.success,
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
          case GET_TWEETS_RESET:
            return {
              ...state,
              tweet: {
                ...state.tweet.get,
                get: {
                  ...INITIAL_STATE.tweet.get,
                  reset: true,
                },
            },
        };
        case POST_TWEETS_LOADING:
            return {
              ...state,
              tweet: {
                ...state.tweet,
                post: {
                  ...state.tweet.post,
                  loading: true,
                  reset: false,
                  success: {
                    ...state.tweet.post.success,
                    ok: false,
                  },
                  failure: {
                    error: false,
                    message: '',
                  },
                },
              },
            };
          case POST_TWEETS_SUCCESS:
            return {
              ...state,
              tweet: {
                ...state.tweet,
                post: {
                  ...state.tweet.post,
                  loading: false,
                  reset: false,
                  success: {
                    ...state.tweet.post.success,
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
          case POST_TWEETS_FAILURE:
            return {
              ...state,
              tweet: {
                ...state.tweet,
                post: {
                  ...state.tweet.post,
                  loading: false,
                  reset: false,
                  success: {
                    ...state.tweet.post.success,
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
          case POST_TWEETS_RESET:
            return {
              ...state,
              tweet: {
                ...state.tweet.post,
                post: {
                  ...INITIAL_STATE.tweet.post,
                  reset: true,
                },
            },
        }
    }
    return INITIAL_STATE;
}

export default getTweetsReducers;