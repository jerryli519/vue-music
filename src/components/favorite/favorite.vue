<!--
我喜欢 页面
@authors Your Name (you@example.org)
@date    2018-02-22 14:22:09
@version 1.0.0
-->
<template>
  <transition name="slide">
    <div class="favorite">
        <div class="titlebar">
            <div class="back" @click="back">
                <i class="icon-left"></i>
            </div>
            <h1 class="title">我喜欢</h1>
        </div>
        <div class="list-wrapper">
            <div class="list-inner" ref="scroll">
                <song-list :songs="favoriteList" @select="selectSong"></song-list>
            </div>
        </div>
        <div class="no-result-wrapper" v-show="noResult">
            <no-result :title="noResultDesc"></no-result>
        </div>
    </div>    
  </transition>
</template>

<script>
  import Scroll from 'base/scroll/scroll'
  import Loading from 'base/loading/loading'
  import SongList from 'base/song-list/song-list'
  import NoResult from 'base/no-result/no-result'
  import Song from 'common/js/song'
  import {mapGetters, mapActions} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'
  import {createSong} from 'common/js/song'
  import storage from 'good-storage'

  const FAVORITE_KEY = '__favorite__'

  export default {
      mixins: [playlistMixin],
      data(){
          return{
            list:[]
          }
      },
      computed:{
          noResult(){
            this.$nextTick(function(){
                return !this.favoriteList.length
            })
          },
          
          noResultDesc(){
            return '暂无收藏歌曲'
          },
          ...mapGetters([
              'favoriteList',
              'userList'
          ])
      },    
      created(){
          this._getCollect(this.userList.user_id)
         // console.log(this.favoriteList)
      },
      methods:{
            _getCollect(userid){
                this.$http.post('http://localhost:81/music/admin/api/getCollect', {uid:userid},{emulateJSON: true})
                .then(
                    (response) => {
                        this.list = this._normalizeSongs(response.data)
                        storage.set(FAVORITE_KEY,this.list)
                    },
                    (error) => {
                        console.log(error)
                    }
                )
            },
          handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? '95px' : ''
               this.$refs.scroll.style['padding-bottom'] = bottom
          },
          back(){
            this.$router.back()
          },
          selectSong(song) {
            this.insertSong(new Song(song))
          },
           _normalizeSongs(list) {
                let ret = []
                list.forEach((item) => {
                    if (item.song_mid && item.album_mid) {
                        ret.push(createSong(item,item.song_mid))
                    }
                })
                return ret
            },
          ...mapActions([
            'insertSong',
            'randomPlay'
          ])
      },
      components: {
        Scroll,
        SongList,
        NoResult,
        Loading
     }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
  @import "~common/stylus/mixin"
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease
  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
  .favorite
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background:$color-background
    .titlebar
        position fixed
        top 0px
        height:40px
        width 100% 
        border-bottom: 1px solid #5a555587
        .back
            position absolute
            top: 0
            left: 6px
            z-index: 50
            .icon-left
                display: block
                padding: 10px
                font-size: $font-size-large
                color: $color-icon-theme 
        .title
            position: absolute
            top: 0
            left: 10%
            z-index: 40
            width: 80%
            no-wrap()
            text-align: center
            line-height: 40px
            font-size: $font-size-large
            color: $color-text
    .list-wrapper
        position relative
        margin-top 40px
        overflow: scroll;
        height: 100%;
        .list-inner
            padding 0px 30px 30px
    .no-result-wrapper
      position: absolute
      width: 100%
      top: 50%
      transform: translateY(-50%)
      .loading-container
        position: absolute
        width: 100%
        top: 50%
        transform: translateY(-50%)
</style>
