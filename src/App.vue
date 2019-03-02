<template>
    <div id="app" @click="up_up">
        <div id="score">{{score}}</div>
        <!-- 开始按钮 -->
        <img
            v-if="btn_show" 
            @click="turn_scene()"
            :src="require('@/assets/image/btn.png')" 
            alt="btn" 
            id="btn">
        <!-- loading -->
        <p
            v-if="!btn_show&&scene===1" 
            class="loading" >loading...</p>
        <!-- 管道 -->
        <pip ref="pip" />
        <!-- 陆地 -->
        <land ref="land" />
        <!-- 天空 -->
        <sky ref="sky" />
        <!-- 小鸟 -->
        <bird ref="bird" />
        <!-- 蒙板 -->
        <div v-if="scene===3" id="mark"></div>
        <!-- 音效 -->
        <audio class="fart" :src="require('../src/assets/music/a2.mp3')"></audio>
        <audio class="fart" :src="require('../src/assets/music/a3.mp3')"></audio>
        <audio class="fart" :src="require('../src/assets/music/a4.mp3')"></audio>
        <audio id="hit" :src="require('../src/assets/music/hit.ogg')"></audio>
    </div>
</template>

<script>
import bird from '@/components/bird'
import sky from '@/components/sky'
import land from '@/components/land'
import pip from '@/components/pip'
// import pipeDown from '@/components/pipe_down'
import {throttle, is_impack, ramdom} from '@/utils/utils' // 节流

export default {
    name: 'app',
    components: {bird, sky, land, pip},
    data: ()=>({
        is_game_start: true,    
        scene: 1,               // 游戏场景号
        btn_show: false,         // 是否显示按钮
        score: 0,               // 得分
        timer: null             // 定时器
    }),
    methods: {
        // 主循环
        loop() {
            let loop = () => {
                this.choose_scene()
                if(this.is_game_start) this.timer=window.requestAnimationFrame(loop)
            } // 必须使用箭头函数否则有this指向问题
            this.timer = window.requestAnimationFrame(loop)
        },
        // 选择场景=============================================================================
        choose_scene() {
            let {scene} = this
            // this[`updata_scene0${scene}`](scene)
            if(scene===1) this.updata_scene01(scene)
            if(scene===2) this.updata_scene02(scene)
            if(scene===3) this.updata_scene03(scene)
        },
        // 执行场景01
        updata_scene01(scene) {
            this.$refs['bird'].updata(scene)
            this.$refs['sky'].updata()
            this.$refs['land'].updata()
        },
        // 执行场景02
        updata_scene02(scene) {
            this.$refs['bird'].updata(scene) // 更新小鸟数据
            this.$refs['sky'].updata() // 更新天空数据
            this.$refs['land'].updata() // 更新大地数据
            this.$refs['pip'].updata() // 更新管道数据
            if(this.is_touch_land()) this.scene=3 // 检测小鸟是否着地
            if(this.is_touch_pip()) this.scene=3  // 检查小鸟是否撞墙
            if(this.can_add_score()) this.score++ // 是否有加分的管道
        },
        // 执行场景03
        updata_scene03(scene) {
            if(this.is_touch_land()) return this.btn_show=true
            this.$refs['bird'].updata(scene)
            // if(this.is_touch_land()) {

            // } // 检测小鸟是否着地
        },
        // 检测===========================================================================
        // 是否有管道可以加分
        can_add_score() {   
            let bird_left = this.$refs['bird'].get_data().left  // 获取小鸟left
            let arr = this.$refs['pip'].get_data02()            // 获取两列管道的值 
            for (let item of arr) {
                if(item.right<bird_left&&item.can_add){
                    this.$refs['pip'].add_false(item.name)      // 将这列管道设置成不可加分
                    return true
                }
            }
            return false
        },
        is_touch_land() {
            let land = document.getElementById('land').getBoundingClientRect()
            let bird = document.getElementById('bird').getBoundingClientRect()
            if(bird.top+bird.height>=land.top) {
                this.scene===2&&document.getElementById('hit').play()
                return true
            }
            return false
        },
        is_touch_pip() {
            let bird = this.$refs['bird'].get_data()
            let pipes = this.$refs['pip'].get_data()
            for (let item of pipes) {
                let is_boom = is_impack(bird, item)
                if(is_boom) {
                    document.getElementById('hit').play()
                    return true
                }
            }
        },
        // 交互事件===========================================================================
        // 点击按钮切换场景(开始游戏 或 重新开始)
        turn_scene() {
            if(this.scene===1) {
                this.scene=2
                this.btn_show=false
            }
            if(this.scene===3) {
                this.score=0
                this.scene=1
                this.$refs['bird'].init()
                this.$refs['pip'].init()
            }
        },
        // 点击屏幕,小鸟向上飞
        up_up() {
            if(this.scene!==2) return 
            this.$refs.bird.up_up()
            let audioes = document.getElementsByClassName('fart')
            audioes[ramdom(audioes.length)].play()
        }
    },
    mounted() {
        // 开始主循环
        window.setTimeout(()=>{
            this.loop()
            this.btn_show=true
        }, 3000)
        // 刷新
    }
}
</script>

<style>
    body{
        background-color: #000;
        height: 100vh;
        width: 100vw;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #app{
        overflow: hidden;
        height: 100%;
        width: 100%;
        max-height: 820px;
        max-width: 430px;
        background-color: #fff;
        margin: 0 auto;
        position: relative;
    }
    #btn{
        z-index: 10;
        position: absolute;
        top: 90%;
        left: 50%;
        margin-top: -32px;
        margin-left: -32px;
        opacity: .5;
        animation: flash .9s infinite ease-in-out;
        animation-delay: .1s;
        user-select: none;
    }
    .loading{
        position: absolute;
        left: 0;
        top: 50%;
        width: 100%;
        height: 80px;
        line-height: 80px;
        text-align: center;
        z-index: 9;
    }
    #mark{
        width: 100%;
        height: 100%;
        position: absolute;
        background-color: #000;
        opacity: .5;
        z-index: 9;
    }
    @keyframes flash {
        0% {opacity: 0;}
        100% {opacity: 1;}
    }
    #score{
        position: absolute;
        width: 60px;
        height: 60px;
        line-height: 60px;
        text-align: center;
        font-size: 38px;
        color: red;
        top: 0;
        left: 0;
        z-index: 9;
    }
</style>
