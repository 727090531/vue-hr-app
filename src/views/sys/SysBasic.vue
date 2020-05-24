<template>
    <div>
        <el-tabs v-model="activeName" type="card">
        <el-tab-pane label="部门管理" name="first"><Department></Department></el-tab-pane>
        <el-tab-pane label="职位管理" name="second"><Position></Position></el-tab-pane>
        <el-tab-pane label="职称管理" name="third"><JobLevel></JobLevel></el-tab-pane>
        <el-tab-pane label="奖惩管理" name="fourth"><Reward></Reward></el-tab-pane>
        <el-tab-pane label="权限组" name="fifth"><Permission></Permission></el-tab-pane>
    </el-tabs></div>
</template>

<script>
    import Position from "../../components/sys/basic/Position";
    import Department from "../../components/sys/basic/Department";
    import Reward from "../../components/sys/basic/Reward";
    import JobLevel from "../../components/sys/basic/JobLevel";
    import Permission from "../../components/sys/basic/Permission";
    export default {
        name: "SysBasic",
        data(){
            return{
             activeName:'second'
            }
        },
        components:{
            Department,
            Reward,
            Position,
            JobLevel,
            Permission
        }
    }
</script>

<style scoped>

</style>