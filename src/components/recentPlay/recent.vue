<!--
最近播放
@authors Your Name (you@example.org)
@date    2018-02-22 14:22:42
@version 1.0.0
-->
<template>
  <transition name="slide">
    <div class="recent">
        <div class="titlebar">
            <div class="back" @click="back">
                <i class="icon-left"></i>
            </div>
            <h1 class="title">最近播放</h1>
        </div>
        <div class="list-wrapper">
            <div class="list-inner" ref="scroll">
                <song-list :songs="playHistory" @select="selectSong"></song-list>
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
  import SongList from 'base/song-list/song-list'
  import NoResult from 'base/no-result/no-result'
  import Song from 'common/js/song'
  import {mapGetters, mapActions} from 'vuex'
  import {playlistMixin} from 'common/js/mixin'
  export default {
      mixins: [playlistMixin],
      computed:{
          noResult(){
              return !this.playHistory.length
          },
          noResultDesc(){
              return '你还没有播放过歌曲哦'
          },
          ...mapGetters([
              'playHistory'
          ])
      },
      created(){
          console.log(this.playHistory)
      },
      methods:{
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
          ...mapActions([
            'insertSong',
            'randomPlay'
          ])
      },
      components: {
        Scroll,
        SongList,
        NoResult
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
  .recent
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
            padding 0px 30px 50px
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
