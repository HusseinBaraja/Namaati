<template>
  <div class="p-6 xl:max-w-6xl xl:mx-auto">
    <div class="flex items-center justify-between mb-6">
      <div class="flex items-center">
        <div class="mr-3 bg-blue-100 text-blue-600 rounded-full p-2">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
          </svg>
        </div>
        <h1 class="text-3xl leading-tight">Forms example</h1>
      </div>
      <button class="bg-gray-800 text-white px-4 py-2 rounded-full text-sm hover:bg-gray-700 transition-colors">
        Star on GitHub
      </button>
    </div>

    <div class="bg-white rounded-2xl shadow-md">
      <form @submit.prevent="submit" class="p-6">
        <div class="mb-6">
          <label class="block font-bold mb-2">Grouped with icons</label>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div class="relative">
              <input v-model="form.name" type="text" class="pl-10 pr-3 py-2 w-full border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none" />
              <svg class="w-5 h-5 text-gray-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
              </svg>
            </div>
            <div class="relative">
              <input v-model="form.email" type="email" class="pl-10 pr-3 py-2 w-full border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none" />
              <svg class="w-5 h-5 text-gray-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div class="mb-6">
          <label class="block font-bold mb-2">With help line</label>
          <input v-model="form.phone" type="tel" class="px-3 py-2 w-full border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none" placeholder="Your phone number" />
          <div class="text-xs text-gray-500 mt-1">Do not enter the leading zero</div>
        </div>

        <div class="mb-6">
          <label class="block font-bold mb-2">Dropdown</label>
          <select v-model="form.department" class="px-3 py-2 w-full border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none">
            <option v-for="option in selectOptions" :key="option.id" :value="option">
              {{ option.label }}
            </option>
          </select>
        </div>

        <hr class="my-6 border-t border-gray-200" />

        <div class="mb-6">
          <label class="block font-bold mb-2">Question</label>
          <textarea v-model="form.question" class="px-3 py-2 w-full h-24 border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none" placeholder="Explain how we can help you"></textarea>
          <div class="text-xs text-gray-500 mt-1">Your question. Max 255 characters</div>
        </div>

        <div class="flex items-center justify-start -mb-3">
          <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded mr-3 hover:bg-blue-600 transition-colors">Submit</button>
          <button type="reset" class="bg-white text-blue-500 px-4 py-2 rounded border border-blue-500 hover:bg-blue-50 transition-colors">Reset</button>
        </div>
      </form>
    </div>

    <h2 class="text-2xl text-gray-500 text-center py-24">Custom elements</h2>

    <div class="bg-white rounded-2xl shadow-md p-6">
      <div class="mb-6">
        <label class="block font-bold mb-2">Checkbox</label>
        <div class="flex flex-wrap -mb-3">
          <label v-for="(value, key) in checkboxOptions" :key="key" class="inline-flex items-center mr-6 mb-3">
            <input type="checkbox" v-model="customElementsForm.checkbox" :value="key" class="form-checkbox h-5 w-5 text-blue-600" />
            <span class="ml-2">{{ value }}</span>
          </label>
        </div>
      </div>

      <hr class="my-6 border-t border-gray-200" />

      <div class="mb-6">
        <label class="block font-bold mb-2">Radio</label>
        <div class="flex flex-wrap -mb-3">
          <label v-for="(value, key) in radioOptions" :key="key" class="inline-flex items-center mr-6 mb-3">
            <input type="radio" v-model="customElementsForm.radio" :value="key" class="form-radio h-5 w-5 text-blue-600" />
            <span class="ml-2">{{ value }}</span>
          </label>
        </div>
      </div>

      <hr class="my-6 border-t border-gray-200" />

      <div class="mb-6">
        <label class="block font-bold mb-2">Switch</label>
        <div class="flex flex-wrap -mb-3">
          <label v-for="(value, key) in switchOptions" :key="key" class="inline-flex items-center mr-6 mb-3">
            <input type="checkbox" v-model="customElementsForm.switch" :value="key" class="form-checkbox h-5 w-5 text-blue-600" />
            <span class="ml-2">{{ value }}</span>
          </label>
        </div>
      </div>

      <hr class="my-6 border-t border-gray-200" />

      <div class="mb-6">
        <label class="block font-bold mb-2">Upload</label>
        <div class="flex items-center">
          <label class="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600 transition-colors">
            <span>Choose file</span>
            <input type="file" class="hidden" @change="handleFileUpload" />
          </label>
          <span v-if="customElementsForm.file" class="ml-3">{{ customElementsForm.file.name }}</span>
        </div>
      </div>
    </div>

    <h2 class="text-2xl text-gray-500 text-center py-24">Form with status example</h2>

    <div class="bg-white rounded-2xl shadow-md md:w-7/12 lg:w-5/12 xl:w-4/12 mx-auto">
      <form @submit.prevent="formStatusSubmit" class="p-6">
        <div :class="notificationColorClass" class="p-4 mb-6 rounded-t-2xl -mx-6 -mt-6">
          <span><b class="capitalize">{{ formStatusOptions[formStatusCurrent] }}</b> state</span>
        </div>
        <div class="mb-6">
          <label class="block font-bold mb-2">Fields</label>
          <div class="relative">
            <input v-model="form.name" type="text" class="pl-10 pr-3 py-2 w-full border border-gray-300 rounded focus:ring focus:ring-blue-200 focus:outline-none" placeholder="Name" />
            <svg class="w-5 h-5 text-gray-500 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
          </div>
          <div class="text-xs text-gray-500 mt-1">Your full name</div>
        </div>
        <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">Trigger</button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'

const selectOptions = [
  { id: 1, label: 'Business development' },
  { id: 2, label: 'Marketing' },
  { id: 3, label: 'Sales' }
]

const form = reactive({
  name: 'John Doe',
  email: 'john.doe@example.com',
  phone: '',
  department: selectOptions[0],
  subject: '',
  question: ''
})

const checkboxOptions = { lorem: 'Lorem', ipsum: 'Ipsum', dolore: 'Dolore' }
const radioOptions = { one: 'One', two: 'Two' }
const switchOptions = { one: 'One', two: 'Two' }

const customElementsForm = reactive({
  checkbox: ['lorem'],
  radio: 'one',
  switch: ['one'],
  file: null
})

const handleFileUpload = (event) => {
  customElementsForm.file = event.target.files[0]
}

const submit = () => {
  // Handle form submission
}

const formStatusCurrent = ref(0)
const formStatusOptions = ['info', 'success', 'danger', 'warning']

const formStatusSubmit = () => {
  formStatusCurrent.value = (formStatusCurrent.value + 1) % formStatusOptions.length
}

const notificationColorClass = computed(() => {
  const colors = {
    info: 'bg-blue-100 text-blue-800',
    success: 'bg-green-100 text-green-800',
    danger: 'bg-red-100 text-red-800',
    warning: 'bg-yellow-100 text-yellow-800'
  }
  return colors[formStatusOptions[formStatusCurrent.value]]
})
</script>