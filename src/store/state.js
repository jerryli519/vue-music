import { playMode } from 'common/js/config'
const state = {
    singer: {},
    isLogin:false,
    userMsg:[],
    playing: false,
    fullScreen: false,
    playlist: [],
    sequenceList: [], //顺序列表(根据播放模式不同 歌曲排序不一样)
    mode: playMode.sequence,
    currentIndex: -1,
    topList:{},
    typeList:{},
    disc:{},
    castList:{},
    isShow:false //评论页面

}

export default state