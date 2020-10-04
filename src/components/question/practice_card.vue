<template>
  <div class="practice_card">
    <h2>This is practice_card.vue.</h2>
    <!--页眉-->
    <div style="position: absolute;top:70px;left:90%;text-align:right;">
      <p>{{question.questiontype}},{{question.questionstar}}星</p>
      <p>第{{index+1}}题, 共{{questions.length}}题</p>
    </div>
    <!--问题和选项-->
    <div class="content">
        <h2>{{question.questioncontent}}</h2>
        <hr>
    </div>
    <div>
      <el-radio v-model="radio" label="A">A.{{question.questiona}}</el-radio>
      <el-radio v-model="radio" label="B">B.{{question.questionb}}</el-radio>
      <el-radio v-model="radio" label="C">C.{{question.questionc}}</el-radio>
      <el-radio v-model="radio" label="D">D.{{question.questiond}}</el-radio>
    </div>
    <hr>
    <!--提交，上一题，下一题按钮-->
    <div height="200px">
      <div>
        <el-button :disabled="isRadio" @click="submit" type="primary" size="small">提交</el-button>
        <el-button :disabled="isLastDisabled" class="lastbutton" @click="last" type="success" size="small">上一题</el-button>
        <el-button :disabled="isNextDisabled" class="nextbutton" @click="next" type="success" size="small">下一题</el-button>
      </div>
    </div>

    <div v-if="isAnalysisDisplay" class="analysis">
      <div style="height: 50px;margin-bottom: 30px">
          <span><img v-bind:src="url"></span>{{answer()}}
      </div>
      <div>
        解析：{{question.questionanalysis}}
      </div>
      <div class="addWrongDiv" v-if="isAddWrongDisplay" margin="0px 10px">
        <el-button v-if="!isAddWrong" type="danger" icon="el-icon-edit" @click="AddWrong" size="small">加入错题集</el-button>
        <el-button v-if="isAddWrong" :disabled="true" type="success" icon="el-icon-check" size="small">已加入错题集</el-button>
        <hr>
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
      isAnalysisDisplay: false, // 是否显示答案解析
      isAddWrong: false // 是否显示加入错题本
    }
  },
  props: ['questions'], // 父组件给子组件传的题目内容
  computed: {
    isLastDisabled: function () {
      return this.index <= 0
    },
    isNextDisabled: function () {
      return this.index + 1 >= this.length
    },
    isRadio: function () {
      if (this.isAnalysisDisplay) {
        // 如果每道题的解析显示了, 说明这道题用户刚提交过, 则此时不可以再点击提交按钮
        return true
      } else {
        // 否则说明用户正在思考阶段, 如果用户什么选项都没选, 则此时不能点击提交按钮
        return !this.radio
      }
    },
    question: function () {
      return this.questions[this.index]
    },
    isAddWrongDisplay: function () {
      return !(this.radio === this.question.questionanswer)
    }

  },
  methods: {
    answer: function () {
      if (this.radio === this.question.questionanswer) {
        this.url = yes
        return '您选择的是' + this.radio + ',回答正确'
      } else {
        this.url = no
        return '您选择的是' + this.radio + ',回答错误，正确答案是：' + this.question.questionanswer
      }
    },
    submit: function () {
      this.axios.get('/api/question/query/wrong', {
        params: {
          token: this.$store.getters.getToken,
          questionId: this.question.questionid
        }
      }).then(body => { this.isAddWrong = body.data })
      this.isAnalysisDisplay = true
    },
    next: function () {
      this.index++
      this.isAnalysisDisplay = false
      this.radio = ''
    },
    last: function () {
      this.index--
      this.isAnalysisDisplay = false
      this.radio = ''
    },
    AddWrong () {
      this.axios.post('/api/question/add/wrong', {
        token: this.$store.getters.getToken,
        questionid: this.question.questionid
      }).then(body => {
        this.isAddWrong = true
      })
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
    /* box-shadow: 0 4px 8px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);*/
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
    /* margin-left: 10px;*/
    margin-top: 20px;
    /* text-align: center;*/
    white-space: pre;
    /* box-shadow: 0 4px 8px 0 rgba(28, 31, 33, .1);*/
  }

  .analysis {
    height: 300px;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .addWrongDiv {
    margin-top: 20px;
    margin-bottom: 20px
  }
</style>
