<script setup>
import { ref, computed } from 'vue'

const questions = ref([
  {
    question: 'What is Vue?',
    answer: 0,
    options: [
      'A framework',
      'A library',
      'A type of hat'
    ],
    selected: null
  },
  {
    question: 'What is Pinia used for?',
    answer: 2,
    options: [
      'Eating a delicious snack',
      'Viewing things',
      'State management'
    ],
    selected: null
  },
  {
    question: 'What is Nuxt?',
    answer: 2,
    options: [
      'A type of cat',
      'A library',
      'A framework'
    ],
    selected: null
  },
  {
    question: 'What is Vue Router?',
    answer: 1,
    options: [
      'An ice cream maker',
      'A routing library for Vue',
      'Burger sauce'
    ],
    selected: null
  },
  {
    question: 'What is Vitest?',
    answer: 2,
    options: [
      'A cat',
      'A slice of pizza',
      'A testing framework'
    ],
    selected: null
  }
])

const quizCompleted = ref(false)
const currentQuestion = ref(0)
const score = computed(() => {
  let value = 0
  questions.value.map(q => {
    if (q.selected != null && q.answer == q.selected) {
      value++
    }
  })
  return value
})

const getCurrentQuestion = computed(() => {
  let question = questions.value[currentQuestion.value]
  question.index = currentQuestion.value
  return question
})

const SetAnswer = (e) => {
  questions.value[currentQuestion.value].selected = e.target.value
  e.target.value = null
}

const NextQuestion = () => {
  if (currentQuestion.value < questions.value.length - 1) {
    currentQuestion.value++
    return
  }

  quizCompleted.value = true
}
</script>

<template>
  <main class="parallax">
      <h1>The Quiz</h1>

      <section class="quiz" v-if="!quizCompleted">
        <div class="quiz-info">
          <span class="question">{{ getCurrentQuestion.question }}</span>
          <span class="score">Score {{ score }}/{{ questions.length }}</span>
        </div>

        <div class="options">
          <label
            v-for="(option, index) in getCurrentQuestion.options"
            :key="option"
            :class="`option ${getCurrentQuestion.selected == index ? index == getCurrentQuestion.answer ? 'correct' : 'wrong' : ''} ${getCurrentQuestion.selected != null && index != getCurrentQuestion.selected ? 'disabled' : ''}`"
            :for="'option' + index"
          >
            <input
              v-model="getCurrentQuestion.selected"
              :disabled="getCurrentQuestion.selected"
              :id="'option' + index"
              :name="getCurrentQuestion.index"
              :value="index"
              @change="SetAnswer"
              type="radio"
            />
            <span>{{ option }}</span>
          </label>
        </div>

        <button @click="NextQuestion" :disabled="!getCurrentQuestion.selected">
          {{
            getCurrentQuestion.index == questions.length - 1
            ? 'Finish'
            : getCurrentQuestion.selected == null
              ? 'Select an option'
              : 'Next question'
          }}
        </button>
      </section>

      <section v-else>
        <h2>You have finished the quiz!</h2>
        <p>Your score is {{ score }}/{{ questions.length }}</p>
      </section>
  </main>
</template>

<style lang="scss">
$color_1: #FFF;
$color_2: #8F8F8F;
$color_3: #2d213f;
$fontFamMontserrat: 'Montserrat', sans-serif;
$background-color_1: #271c36;
$background-color_2: #382a4b;
$inputHoverBg: #2d213f;
$successPrimary: #2cce7d;
$errorPrimary: #ff5a5f;

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: $fontFamMontserrat;
}

body {
  color: $color_1;
  height: 100%;
}

.parallax {
  background-image: url("./assets/background.jpg");
  min-height: 110vh;

  /* the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

h1 {
  font-size: 2rem;
  margin-bottom: 2rem;
}

.quiz {
  background-color: $background-color_2;
  padding: 1rem;
  margin-top: 1rem;
  width: 75vw;
  max-width: 640px;

  &-info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;

    &.question {
      color: $color_2;
      font-size: 1.25rem;
    }

    &.score {
      color: $color_1;
      font-size: 1.25rem;
    }
  }
}

.options {
  margin: 1.5rem 0;
  display: grid;
  gap: .5rem;
}

.option {
  padding: 1rem;
  display: block;
  background-color: $background-color_1;
  margin-bottom: 0.5rem;
  border-radius: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: $inputHoverBg;
  }

  &:last-of-type {
    margin-bottom: 0;
  }

  input {
    display: none;
  }

  &.correct {
    background-color: $successPrimary;
  }

  &.wrong {
    background-color: $errorPrimary;
  }

  &.disabled {
    opacity: 0.5;
  }
}

button {
  appearance: none;
  outline: none;
  border: none;
  cursor: pointer;
  padding: 0.5rem 1rem;
  background-color: $successPrimary;
  color: $color_3;
  font-weight: 700;
  text-transform: uppercase;
  font-size: 1.2rem;
  border-radius: 0.5rem;

  &:disabled {
    opacity: 0.5;
  }
}

h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  text-align: center;
}

p {
  color: $color_2;
  font-size: 1.5rem;
  text-align: center;
}
</style>