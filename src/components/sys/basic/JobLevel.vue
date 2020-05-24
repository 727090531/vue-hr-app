<template>
    <div>
        <div>
            <el-input size="small" v-model="JobLevel.name" style="width: 300px;" prefix-icon="el-icon-plus"
                      placeholder="添加职称..."></el-input>
            <el-select v-model="JobLevel.titlelevel" placeholder="职称等级" size="small"
                       style="margin-left: 5px;margin-right: 5px">
                <el-option v-for="item in titleLevels" :key="item" :label="item" :value="item">
                </el-option>
            </el-select>
            <el-button icon="el-icon-plus" type="primary" size="small" @click="addJobLevel">添加</el-button>
        </div>
        <!--展示内容-->
        <div style="margin-top: 10px">
            <el-table :data="jls" border stripe type="small" style="width: 80%"
                      @selection-change="handleSelectionChange">
                <el-table-column type="selection" width="55"></el-table-column>
                <el-table-column prop="id" label="编号" width="55"></el-table-column>
                <el-table-column prop="name" label="职称名称" width="150"></el-table-column>
                <el-table-column prop="titlelevel" label="职称级别"></el-table-column>
                <el-table-column prop="createdate" label="创建时间"></el-table-column>
                <el-table-column label="是否启用">
                    <template slot-scope="scope">
                        <el-tag type="success" v-if="scope.row.enabled">已启用</el-tag>
                        <el-tag type="danger" v-else>未启用</el-tag>
                    </template>
                </el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button size="small" @click="showEditView(scope.row)">编辑</el-button>
                        <el-button size="small" type="danger" @click="deleteHandler(scope.row)">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" size="small" style="margin-top: 10px" :disabled="multipleSelection.length==0"
                       @click="deleteMany">批量删除
            </el-button>
        </div>

        <el-dialog title="修改职称" :visible.sync="dialogVisible" width="30%">
            <div>
                <el-tag>职位名称</el-tag>
                <el-input class="update_input" size="small" v-model="updateJl.name"></el-input>
                <el-tag>职位名称</el-tag>
                <br>
                <el-select v-model="updateJl.titlelevel" placeholder="职称等级" size="small"
                           style="margin-left: 5px;margin-right: 5px">
                    <el-option
                            v-for="item in titleLevels"
                            :key="item"
                            :label="item"
                            :value="item">
                    </el-option>
                </el-select>
                <div>
                    <el-tag>是否启用</el-tag>
                    <el-switch v-model="updateJl.enabled"></el-switch>
                </div>

            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogVisible = false" size="small">取 消</el-button>
                <el-button type="primary" @click="doUpdate" size="small">确 定</el-button>
           </span>
        </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "JobLevel",
        data() {
            return {
                dialogVisible: false,
                multipleSelection: [],
                updateJl: {
                    name: '',
                    titlelevel: '',
                    enabled: false
                },
                JobLevel: {
                    name: '',
                    titlelevel: ''
                },
                titleLevels: [
                    '正高级',
                    '副高级',
                    '中级',
                    '初级',
                    '员级',
                ],
                jls: []
            }
        },
        mounted() {
            this.initJls();
        },
        methods: {
            //批量删除
            deleteMany() {
                this.$confirm('此操作将永久删除【' + this.multipleSelection.length + '】条记录, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    let ids = '?';
                    this.multipleSelection.forEach(item => {
                        ids += 'ids=' + item.id + '&';
                    })
                    this.deleteRequest("/system/basic/joblevel/" + ids).then(resp => {
                        if (resp) {
                            this.initJls();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 记录多选的处理
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            //更新操作
            doUpdate() {
                this.putRequest("/system/basic/joblevel/", this.updateJl).then(resp => {
                    if (resp) {
                        this.initJls();
                        this.dialogVisible = false;
                    }
                })
            },
            showEditView(data) {
                Object.assign(this.updateJl, data);
                this.dialogVisible = true;
            },
            //删除操作
            deleteHandler(data) {
                this.$confirm('此操作将永久' + data.name + '职称, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.deleteRequest("/system/basic/joblevel/" + data.id).then(resp => {
                        if (resp) {
                            this.initJls();
                        }
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            //添加数据
            async addJobLevel() {
                if (this.JobLevel.name && this.JobLevel.titlelevel) {
                    const resp = await this.postRequest('/system/basic/joblevel/', this.JobLevel)
                    if (resp) {
                        this.initJls();
                    }
                } else {
                    this.$message.error("添加字段不可以为空!");
                }
            },
            //初始化数据
            async initJls() {
                this.getRequest("/system/basic/joblevel/").then(resp => {
                    if (resp) {
                        this.jls = resp;
                        this.JobLevel = {
                            name: '',
                            titleLevel: ''
                        };
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>