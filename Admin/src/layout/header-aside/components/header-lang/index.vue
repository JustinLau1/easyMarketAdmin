<template>
  <div>
    <el-dropdown >
      <span class="btn-text">
        <el-button class="d2-ml-0 d2-mr btn-text can-hover" type="text" @click="dialogVisible = true">
          <d2-icon name="language" style="font-size: 20px"/>
          <span style="margin-left: 5px">{{$i18n.locale == 'ch'?'中文':'英文'}}</span>
        </el-button>
      </span>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item @click.native="$i18n.locale = 'ch'">
          中文
        </el-dropdown-item>
        <el-dropdown-item @click.native="$i18n.locale = 'en'">
          英文
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
    export default {
    }
</script>