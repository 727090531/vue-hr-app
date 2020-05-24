<template>
    <div>
       <div>
            <div style="display: flex;justify-content: space-between">
                <div>
                    <el-input placeholder="请输入员工名进行搜索，可以直接回车搜索..." prefix-icon="el-icon-search"
                              clearable
                              @clear="initEmps"
                              style="width: 350px;margin-right: 10px" v-model="keyword"
                              @keydown.enter.native="initEmps" :disabled="showAdvanceSearchView"></el-input>
                    <el-button icon="el-icon-search" type="primary" @click="initEmps" :disabled="showAdvanceSearchView">
                        搜索
                    </el-button>
                    <el-button type="primary" @click="showAdvanceSearchView = !showAdvanceSearchView">
                        <i :class="showAdvanceSearchView?'fa fa-angle-double-up':'fa fa-angle-double-down'"
                           aria-hidden="true"></i>
                        高级搜索
                    </el-button>
                </div>
                <div>
                    <el-upload
                            :show-file-list="false"
                            :before-upload="beforeUpload"
                            :on-success="onSuccess"
                            :on-error="onError"
                            :disabled="importDataDisabled"
                            style="display: inline-flex;margin-right: 8px"
                            action="/employee/basic/import">
                        <el-button :disabled="importDataDisabled" type="success" :icon="importDataBtnIcon">
                            {{importDataBtnText}}
                        </el-button>
                    </el-upload>
                    <el-button type="success" @click="exportData" icon="el-icon-download">
                        导出数据
                    </el-button>
                    <el-button type="primary" icon="el-icon-plus" @click="showAddEmpView">
                        添加用户
                    </el-button>
                </div>
            </div>
            <transition name="slide-fade">
                <div v-show="showAdvanceSearchView"
                     style="border: 1px solid #409eff;border-radius: 5px;box-sizing: border-box;padding: 5px;margin: 10px 0px;">
                    <el-row style="margin-top: 10px">
                        <el-col :span="5">
                            所属部门:
                            <el-popover
                                    placement="right"
                                    title="请选择部门"
                                    width="200"
                                    trigger="manual"
                                    v-model="popVisible2">
                                <el-tree default-expand-all :data="allDeps" :props="defaultProps"
                                         @node-click="searvhViewHandleNodeClick"></el-tree>
                                <div slot="reference"
                                     style="width: 130px;display: inline-flex;font-size: 13px;border: 1px solid #dedede;height: 26px;border-radius: 5px;cursor: pointer;align-items: center;padding-left: 8px;box-sizing: border-box;margin-left: 3px"
                                     @click="showDepView2">{{inputDepName}}
                                </div>
                            </el-popover>
                        </el-col>
                        <el-col :span="5" :offset="4">
                            <el-button size="mini">取消</el-button>
                            <el-button size="mini" icon="el-icon-search" type="primary" @click="initEmps('advanced')">搜索</el-button>
                        </el-col>
                    </el-row>
                </div>
            </transition>
        </div>
        <div style="margin-top: 10px">
            <el-table
                    :data="emps"
                    stripe
                    border
                    v-loading="loading"
                    element-loading-text="正在加载..."
                    element-loading-spinner="el-icon-loading"
                    element-loading-background="rgba(0, 0, 0, 0.8)"
                    style="width: 100%">
                <el-table-column
                        type="selection"
                        width="55">
                </el-table-column>
                <el-table-column
                        prop="name"
                        fixed
                        align="left"
                        label="姓名"
                        width="90">
                </el-table-column>
                <el-table-column
                        prop="workID"
                        label="工号"
                        align="left"
                        width="85">
                </el-table-column>
                <el-table-column
                        prop="gender"
                        label="性别"
                        align="left"
                        width="85">
                </el-table-column>

                <el-table-column
                        prop="idCard"
                        width="150"
                        align="left"
                        label="身份证号码">
                </el-table-column>

                <el-table-column
                        prop="email"
                        width="180"
                        align="left"
                        label="电子邮件">
                </el-table-column>
                <el-table-column
                        prop="phone"
                        width="100"
                        align="left"
                        label="电话号码">
                </el-table-column>

                <el-table-column
                        prop="department.name"
                        width="100"
                        align="left"
                        label="所属部门">
                </el-table-column>
                <el-table-column
                        prop="salary"
                        width="220"
                        align="left"
                        label="薪水">
                </el-table-column>
                <el-table-column
                        prop="tiptopDegree"
                        width="80"
                        align="left"
                        label="最高学历">
                </el-table-column>
                <el-table-column
                        prop="specialty"
                        width="150"
                        align="left"
                        label="专业">
                </el-table-column>
                <el-table-column
                        fixed="right"
                        width="200"
                        label="操作">
                    <template slot-scope="scope">
                        <el-button @click="showEditEmpView(scope.row)" style="padding: 3px" size="mini">编辑</el-button>
                        <el-button @click="deleteEmp(scope.row)" style="padding: 3px" size="mini" type="danger">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div style="display: flex;justify-content: flex-end">
                <el-pagination
                        background
                        @current-change="currentChange"
                        @size-change="sizeChange"
                        layout="sizes, prev, pager, next, jumper, ->, total, slot"
                        :total="total">
                </el-pagination>
            </div>
        </div>
        <el-dialog
                :title="title"
                :visible.sync="dialogVisible"
                width="80%">
            <div>
                <el-form :model="emp" :rules="rules" ref="empForm">
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="姓名:" prop="name">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-edit" v-model="emp.name"
                                          placeholder="请输入员工姓名"></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="5">
                            <el-form-item label="性别:" prop="gender">
                                <el-radio-group v-model="emp.gender">
                                    <el-radio label="男">男</el-radio>
                                    <el-radio label="女">女</el-radio>
                                </el-radio-group>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">
                            <el-form-item label="电子邮箱:" prop="email">
                                <el-input size="mini" style="width: 150px" prefix-icon="el-icon-message"
                                          v-model="emp.email" placeholder="请输入电子邮箱"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>

                        <el-col :span="6">
                            <el-form-item label="所属部门:" prop="departmentId">
                                <el-popover
                                        placement="right"
                                        title="请选择部门"
                                        width="200"
                                        trigger="manual"
                                        v-model="popVisible">
                                    <el-tree default-expand-all :data="allDeps" :props="defaultProps"
                                             @node-click="handleNodeClick"></el-tree>
                                    <div slot="reference"
                                         style="width: 150px;display: inline-flex;font-size: 13px;border: 1px solid #dedede;height: 26px;border-radius: 5px;cursor: pointer;align-items: center;padding-left: 8px;box-sizing: border-box"
                                         @click="showDepView">{{inputDepName}}
                                    </div>
                                </el-popover>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="电话号码:" prop="phone">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-phone"
                                          v-model="emp.phone" placeholder="电话号码"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="5">
                            <el-form-item label="学历:" prop="tiptopDegree">
                                <el-select v-model="emp.tiptopDegree" placeholder="学历" size="mini"
                                           style="width: 150px;">
                                    <el-option
                                            v-for="item in tiptopDegrees"
                                            :key="item"
                                            :label="item"
                                            :value="item">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="7">
                            <el-form-item label="专业名称:" prop="specialty">
                                <el-input size="mini" style="width: 200px" prefix-icon="el-icon-edit"
                                          v-model="emp.specialty" placeholder="请输入专业名称"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
            </div>
            <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="doAddEmp">确 定</el-button>
  </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "StaAll"
    }
</script>

<style scoped>

</style>
