<template>
  <div class="practice_card">
    <!--页眉-->
    <div style="position: absolute;top:70px;left:90%;text-align:right;">
      <p>{{question.questionType}},{{question.questionStar}}星</p>
      <p>第{{index+1}}题, 共{{questions.length}}题</p>
    </div>
    <!--问题和选项-->
    <div class="content">
        <h2>{{question.questionContent}}</h2>
        <hr>
    </div>
    <div>
      <el-radio v-model="radio" label="A">A.{{question.questionA}}</el-radio>
      <el-radio v-model="radio" label="B">B.{{question.questionB}}</el-radio>
      <el-radio v-model="radio" label="C">C.{{question.questionC}}</el-radio>
      <el-radio v-model="radio" label="D">D.{{question.questionD}}</el-radio>
    </div>
    <hr>
    <!--提交，上一题，下一题按钮-->
    <div height="200px">
      <div>
        <el-button :disabled="isRadio" @click="submit" type="primary" size="small">提交</el-button>
        <el-button :disabled="canBackOff" class="lastbutton" @click="last" type="success" size="small">上一题</el-button>
        <el-button :disabled="canGoForward" class="nextbutton" @click="next" type="success" size="small">下一题</el-button>
      </div>
    </div>

    <div v-if="isAnalysisDisplay" class="analysis">
      <div style="height: 50px;margin-bottom: 30px">
          <span><img v-bind:src="url"></span>{{submit()}}
      </div>
      <div>
        解析：{{question.questionAnalysis}}
      </div>
    </div>

  </div>
</template>

<script>
import yes from '../../assets/yes.png'
import no from '../../assets/no.png'

export default {
  name: 'practice_card',
  data () {
    return {
      radio: '', // 每道题用户选的什么
      url: '', // 正确or错误的图片
      index: 0, // 用户当前做到第几题了
      isAnalysisDisplay: false // 是否显示答案解析
    }
  },
  props: ['questions'], // 父组件给子组件传的题目内容
  computed: {
    isLastDisabled: function () { // 判断是不是第一题
      return this.index <= 0
    },
    isNextDisabled: function () { // 判断是不是最后一题
      return this.index + 1 >= this.questions.length
    },
    canGoForward: function(){ // 下一题按钮是否点亮, 如果是最后一题不点亮, 如果没显示解析也不点亮, 返回true则不点亮
      if(this.isAnalysisDisplay === false || this.isNextDisabled === true){
        return true
      }else{
        return false
      }
    },
    canBackOff: function(){ // 上一题按钮是否点亮, 如果是第一题不点亮, 如果没显示解析也不点亮
      if(this.isAnalysisDisplay === false || this.isLastDisabled === true){
        return true
      }else{
        return false
      }
    },
    isRadio: function () { // 是否可以点击提交按钮, 返回true则不可点击
      if (this.radio === '') {
        // 如果用户还没有点击任何选项, 则说明此时用户正在思考, 则此时不可以点击提交按钮
        return true
      } else {
        // 否则此时可以点击提交按钮
        return false
      }
    },
    question: function () {
      return this.questions[this.index]
    }
  },
  methods: {
    submit: function () { // 点击提交按钮后发生的事件
      this.isAnalysisDisplay = true
      if (this.radio === this.question.questionAnswer) {
        this.url = yes
        return '您选择的是' + this.radio + ',回答正确'
      } else {
        this.url = no
        return '您选择的是' + this.radio + ',回答错误，正确答案是：' + this.question.questionAnswer
      }
    },
    next: function () {
      this.isAnalysisDisplay = false
      this.index++
      this.radio = ''
    },
    last: function () {
      this.isAnalysisDisplay = false
      this.index--
      this.radio = ''
    }
  }
}
</script>

<style scoped>
  .practice_card {
    white-space: pre-line;
    height: 850px;
    width: 100%;
    padding: 10px;
    margin: 10px auto;
    background: #fbfbfb;
  }
  .content {
    overflow: hidden;
    text-overflow: ellipsis;
    height: 100px;

  }
  .el-radio {
    font-size: 20px;
    width: 80% !important;
    height: 100px !important;
    margin-top: 20px;
    white-space: pre;
  }
  .analysis {
    height: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
  }
</style>
