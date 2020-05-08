<template>
    <div class="header">
        <!-- 全屏 自行决定是不是用-->
        <!-- <i class="paddingLeft10 iconfont icon-Fullscreen el-dropdown-link" @click="handleFullScreen"></i> -->
        <!-- 切换中英文 -->
        <el-dropdown class="paddingLeft10" trigger="click" @command="changeLanguage">
            <span class="el-dropdown-link">
                {{language}}
                <i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="zh">中文</el-dropdown-item>
                <el-dropdown-item command="en">English</el-dropdown-item>
            </el-dropdown-menu>
        </el-dropdown>
    </div>
</template>
<script>
import screenfull from "screenfull";
export default {
    name: 'header',
    inject: ['reload'],//用于强制刷新当前页面
    data() {
        return {
            language: "中文",
        };
    },
    created() {
        // 进入的时候判断是中文还是英文
        if (!localStorage.getItem("language")) {
            this.language = "中文";
            this.$i18n.locale = "zh";
        } else if (localStorage.getItem("language") === "en") {
            this.language = "英文";
            this.$i18n.locale = localStorage.getItem("language");
        } else {
            this.language = "中文";
            this.$i18n.locale = localStorage.getItem("language");
        }
    },
    methods: {
        // 切换语言
        changeLanguage(command) {
            if (command === "zh") {
                this.language = "中文";
                this.$i18n.locale = "zh";
                localStorage.setItem("language", 'zh');
            } else if (command === "en") {
                this.language = "英文";
                this.$i18n.locale = "en";
                localStorage.setItem("language", 'en');
            }
            // 刷一次路由
            this.reload();
        },
        //点击全屏
        handleFullScreen() {
            if (!screenfull.enabled) {
                return false;
            }
            screenfull.toggle();
            // this.isFullscreen = true;
        },
        /**
        * 是否全屏并按键ESC键的方法
        */
        checkFull() {
            let isFull =
                document.fullscreenEnabled ||
                window.fullScreen ||
                document.webkitIsFullScreen ||
                document.msFullscreenEnabled;
            // to fix : false || undefined == undefined
            if (isFull === "undefined") {
                isFull = false;
            }
            return isFull;
        },
    },
    mounted() {
        window.onresize = () => {
            // 全屏下监控是否按键了ESC
            if (!this.checkFull()) {
                // 全屏下按键esc后要执行的动作
                // this.isFullscreen = false;
            }
        };
    },
};
</script>

<style lang="scss" scoped>
.header {
    background-color: #ffffff;
    height: 0.5rem;
    line-height: 0.5rem;
    color: #333;
    font-size: 16px;
    text-align: right;
    padding-right: 0.3rem;
    .el-dropdown-link {
        cursor: pointer;
    }
}
</style>
