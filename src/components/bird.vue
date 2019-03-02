<template>
    <div 
        id="bird"
        :style="css()" >
    </div>
</template>

<script>
    export default {
        data: () => ({
            pic: require('@/assets/image/birds.png'),           // 皮肤
            clipping_x: [9, 9+34+18, 9+34+18+34+18],            // 小鸟的三个动作
            cur_index: 0,                                       // 小鸟的当前动作
            count: 0,
            flash_speed: 0.2,                                   // 煽动翅膀的快慢
            y: 100,                                             // 小鸟的飞行高度
            v: 0,                                               // 竖直方向的初速度
            g: .1,                                              // 竖向加速度
            angle: 0                                            // 角度
        }),
        methods: {
            // 动态控制css
            css() {
                let {clipping_x, cur_index, y} = this
                return {
                    "background-position": `-${clipping_x[cur_index]}px center`,
                    "top": `${y}px`,
                    'transform': `rotate(${this.angle}deg)`,
                    'background-image': `url(${this.pic})`
                }
            },
            // 选择动画场景
            updata(scene) {
                scene = [1,2,3].find(item=>item===scene)
                this[`action0${scene}`](scene)
            },
            // 场景一的数据更新
            action01(scene) {
                this.updata_fly(scene)
                this.updata_y(scene)
            },
            // 场景二的数据更新
            action02(scene) {
                this.updata_fly(scene)
                this.updata_y(scene)
                this.updata_angle(scene)
            },
            // 场景三的数据更新
            action03(scene) {
                this.updata_y(scene)
                this.updata_angle(scene)
            },
            // 飞行动画数据更新
            updata_fly() {
                this.count += this.flash_speed
                if(this.count>=3) this.count=0
                this.cur_index = Math.floor(this.count)
            },
            updata_boom() {

            },
            // 飞行高度数据更新
            updata_y(scene) {
                let h = document.body.clientHeight
                this.v += this.g
                this.y += this.v + this.g
                if(this.y>h/2&&scene===1) this.v = -5 // 场景一, 自动上飞
                if(this.y<=-20) this.y = -20 // 限制飞行最大高度
            },
            // 小鸟旋转数据更新
            updata_angle(scene) {
                if(scene===2) this.angle+=1
                if(scene===3) this.angle+=12
            },
            // 小鸟向上飞
            up_up() {
                this.v = -3.2
                this.angle = -45
            },
            // 数据初始化
            init() {
                this.y = 100
                this.angle = 0
            },
            // 获取小鸟的数据
            get_data() {
                let left = document.getElementById('bird').offsetLeft
                return {
                    left: left,
                    right: left+30,
                    top: this.y+4,
                    bottom: this.y+30
                }
            }
        }
    }
</script>

<style scoped>
    #bird{
        background-repeat: no-repeat;
        background-position: -9px center;
        display: block;
        width: 34px;
        height: 34px;
        position: absolute;
        top: 39%;
        left: 45.5%;
        z-index: 2;
    }
</style>