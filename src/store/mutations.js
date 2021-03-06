import * as types from './mutation-types'

const mutations = {
  [types.SET_IS_LOGIN](state, isLogin) {
    state.isLogin = isLogin
  },
  [types.SET_USER_MSG](state, userMsg) {
    state.userMsg = userMsg
  },
  [types.SET_IS_SHOW](state, isShow) {
    state.isShow = isShow
  },
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_PLAYING_STATE](state, flag) {
    state.playing = flag
  },
  [types.SET_FULL_SCREEN](state, flag) {
    state.fullScreen = flag
  },
  [types.SET_PLAYLIST](state, list) {
    state.playlist = list
  },
  [types.SET_SEQUENCE_LIST](state, list) {
    state.sequenceList = list
  },
  [types.SET_PLAY_MODE](state, mode) {
    state.mode = mode
  },
  [types.SET_CURRENT_INDEX](state, index) {
    state.currentIndex = index
  },
  [types.SET_DISC](state, disc) {
    state.disc = disc
  },
  [types.SET_TOP_LIST](state, topList) {
    state.topList = topList
  },
  [types.SET_SEARCH_HISTORY](state, history) {
    state.searchHistory = history
  },
  [types.SET_PLAY_HISTORY](state, history) {
    state.playHistory = history
  },
  [types.SET_FAVORITE_LIST](state, list) {
    state.favoriteList = list
  },
  [types.SET_TYPE_LIST](state, typeList) {
    state.typeList = typeList
  },
  [types.SET_TYPE_AREA](state, typeAreaList) {
    state.typeAreaList = typeAreaList
  },
  [types.SET_CAST_LIST](state, castList) {
    state.castList = castList
  }
}

export default mutations