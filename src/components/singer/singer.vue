<!--
Description
@authors Your Name (you@example.org)
@date    2017-12-30 20:39:56
@version 1.0.0
-->
<template>
    <transition name="slide">
        <div class="singer" ref="singer">
            <div class="back" @click="back">
                <i class="icon-left"></i>
            </div>
            <h1 class="title">歌手</h1>
            <list-view @select="selectSinger" :data="singers" ref="list"></list-view>
            <router-view></router-view>
        </div>
    </transition> 
</template>

<script>
  import ListView from 'base/listview/listview'
  import {getSingerList} from 'api/singer'
  import {ERR_OK} from 'api/config'
  import Singer from 'common/js/singer'
  import {mapMutations} from 'vuex'
import {playlistMixin} from 'common/js/mixin'

  const HOT_SINGER_LEN = 10
  const HOT_NAME = '热门'

  export default {
      mixins:[playlistMixin],
      data() {
          return{
            singers:[]
          }
      },
      created(){
          this._getSingerList()
      },
      methods:{
        handlePlaylist(playlist) {
            const bottom = playlist.length > 0 ? '60px' : ''
            this.$refs.singer.style.bottom = bottom
            this.$refs.list.refresh()
        },
        back(){
            this.$router.push('/music')
           // this.$router.back()
        },
        //  发送Post请求将歌手数据传到后台
        //   sendSingersMes(singer) {
        //         this.singers = singer
        //         console.log(JSON.stringify(this.singers) + 'singers')
                // this.$http.post('http://localhost:81/music/admin/singer/getSingerMes', {singer: this.singers}, {emulateJSON: true})
                // .then(
                //     (response) => {
                //     console.log(response)
                //     },
                //     (error) => {
                //     console.log(error)
                //     }
                // )
        //     },
        selectSinger(singer){
            this.$router.push({
                path:`singer/${singer.id}`
            })
            this.setSinger(singer)
        },
        _getSingerList(){
            this.$http.get('http://localhost:81/music/admin/api/sendSingersMes', {emulateJSON: true})
            .then(
                (response) => {
                    this.singers = this._normalizeSinger(response.data)
                    console.log(this.singers)
                },
                (error) => {
                console.log(error)
                }
            )
        },
        _normalizeSinger(list) {

        let map = {

            hot: {
                title: HOT_NAME,
                items: []
            }
        }
        list.forEach((item, index) => {
            const key = item.singer_findex
            if (!map[key]) {
                map[key] = {
                title: key,
                items: []
                }
            }
            map[key].items.push(new Singer({
                name: item.singer_name,
                id: item.singer_mid
            }))
            })
            // 为了得到有序列表，我们需要处理 map
            let ret = []
            let hot = []
            for (let key in map) {
            let val = map[key]
            if (val.title.match(/[a-zA-Z]/)) {
                ret.push(val)
            } 
            }
            ret.sort((a, b) => {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
            })
            return hot.concat(ret)
        },
        ...mapMutations({
            setSinger:'SET_SINGER'
        })
      },
      components: {
        ListView
      }
  }
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  @import "~common/stylus/variable"
    .slide-enter-active, .slide-leave-active
        transition: all 0.3s ease

    .slide-enter, .slide-leave-to
        transform: translate3d(100%, 0, 0)
  .singer
    position: fixed
    top: 0
    bottom: 0
    width: 100%
    background:$color-background 
    .back
        position absolute
        top: 0
        left: 6px
        z-index: 50
        .icon-left
            display: block
            padding: 10px
            font-size: $font-size-large-x
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
</style>
