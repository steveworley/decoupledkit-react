import {
  MOCK_GRAPHQL_BEGIN,
  MOCK_GRAPHQL_END,
  MOCK_GRAPQHL_MSG
} from '../actions/graphqlMockActions'

export default function graphqlMockReducer(state = { data: [] }, action) {
  const { type, data } = action
  switch (type) {
    case MOCK_GRAPHQL_BEGIN:
      return { ...state }
    case MOCK_GRAPHQL_END:
      return { ...state, data }
    default:
      return state
  }
}
