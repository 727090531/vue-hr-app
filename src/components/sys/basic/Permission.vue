<template>
    <div>
        <div class="permission_input">
            <el-input placeholder="请输入角色英文名称" v-model="role.name" size="small">
                <template slot="prepend">ROLE_</template>
            </el-input>
            <el-input v-model="role.namezh" placeholder="请输入角色中文名" size="small"></el-input>
            <el-button type="primary" size="small" icon="el-icon-plus">添加角色</el-button>
        </div>
        <div class="permission_main">
            <el-collapse accordion v-model="activeName" size="small">
                <el-collapse-item title="item.nameZh" :name="item.id" v-for="(item,index) in roles" :key="index">
                    <el-card class="box-card">
                        <div slot="header" class="clearfix">
                            <span>可访问资源</span>
                            <el-button style="float: right; padding: 3px 0; color:#ff0000"
                                       icon="el-icon-delete"></el-button>
                        </div>
                        <div>
                            <el-tree show-checkbox node-key="id" :props="defaultProps" ref="tree" :key="index"
                                     :data="allMenus"
                                     :default-checked-keys="selectedMenus"></el-tree>
                            <div style="display: flex;justify-content: flex-end">
                                <el-button size="mini">取消修改</el-button>
                                <el-button size="mini" type="primary">确认修改</el-button>
                            </div>
                        </div>
                    </el-card>
                </el-collapse-item>
            </el-collapse>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Permission",
        data() {
            return {
                role: {
                    name: '',
                    namezh: ''
                },
                //面板激活项
                activeName: -1,

                roles: [],
                allMenus: [],
                // 数据配置项名称与后端数据的属性名称匹配
                defaultProps: {
                    children: 'children',
                    label: 'name'
                },
                // 选中菜单的 id数组
                selectedMenus: []
            }
        },
        mounted() {
            this.initRoles()
        },
        methods: {
            //获取角色初始化列表
            initRoles() {
                this.getRequest('/system/basic/permiss/').then(resp => {
                    if (resp) {
                        this.roles = resp.obj
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>