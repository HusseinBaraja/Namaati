<script setup>
import { ref, reactive, computed } from "vue";
import SectionTitleLineWithButton from "@/components/SectionTitleLineWithButton.vue";
import CardBox from "@/components/BaseComponents/BaseCardBox.vue";
import FormField from "@/components/BaseComponents/FormField.vue";
import FormControl from "@/components/BaseComponents/FormControl.vue";
import BaseDivider from "@/components/BaseComponents/BaseDivider.vue";
import BaseButton from "@/components/BaseComponents/BaseButton.vue";
import BaseButtons from "@/components/BaseComponents/BaseButtons.vue";
import SectionTitle from "@/components/SectionTitle.vue";
import FormCheckRadioGroup from "@/components/BaseComponents/FormCheckRadioGroup.vue";
import FormFilePicker from "@/components/BaseComponents/FormFilePicker.vue";
import NotificationBarInCard from "@/components/BaseComponents/NotificationBarInCard.vue";
import { icons } from "@/assets/icons";
import LayoutAuthenticated from "@/components/LayoutAuthenticated.vue";
import SectionContainer from "@/components/SectionContainer.vue";

const selectOptions = [
  { id: 1, label: "Business development" },
  { id: 2, label: "Marketing" },
  { id: 3, label: "Sales" },
];

const form = reactive({
  name: "John Doe",
  email: "john.doe@example.com",
  phone: "",
  department: selectOptions[0],
  subject: "",
  question: "",
});

const checkboxOptions = { lorem: "Lorem", ipsum: "Ipsum", dolore: "Dolore" };
const radioOptions = { one: "One", two: "Two" };
const switchOptions = { one: "One", two: "Two" };

const customElementsForm = reactive({
  checkbox: ["lorem"],
  radio: "one",
  switch: ["one"],
  file: null,
});

const submit = () => {
  // Handle form submission
};

const formStatusCurrent = ref(0);
const formStatusOptions = ["info", "success", "danger", "warning"];

const formStatusSubmit = () => {
  formStatusCurrent.value =
    (formStatusCurrent.value + 1) % formStatusOptions.length;
};

const notificationColorClass = computed(() => {
  const colors = {
    info: "bg-blue-100 text-blue-800",
    success: "bg-green-100 text-green-800",
    danger: "bg-red-100 text-red-800",
    warning: "bg-yellow-100 text-yellow-800",
  };
  return colors[formStatusOptions[formStatusCurrent.value]];
});
</script>

<template>
  <LayoutAuthenticated>
    <SectionContainer>
      <div class="p-6 xl:max-w-6xl xl:mx-auto">
        <SectionTitleLineWithButton :icon="icons.file" title="Forms example" />

        <CardBox>
          <form @submit.prevent="submit" class="p-6">
            <FormField label="Grouped with icons">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <FormControl v-model="form.name" :icon="icons.user" />
                <FormControl
                  v-model="form.email"
                  type="email"
                  :icon="icons.mail"
                />
              </div>
            </FormField>

            <FormField
              label="With help line"
              help="Do not enter the leading zero"
            >
              <FormControl
                v-model="form.phone"
                type="tel"
                placeholder="Your phone number"
              />
            </FormField>

            <FormField label="Dropdown">
              <FormControl v-model="form.department" :options="selectOptions" />
            </FormField>

            <BaseDivider />

            <FormField
              label="Question"
              help="Your question. Max 255 characters"
            >
              <FormControl
                v-model="form.question"
                type="textarea"
                placeholder="Explain how we can help you"
              />
            </FormField>

            <BaseButtons>
              <BaseButton color="info" type="submit" label="Submit" />
              <BaseButton color="info" label="Options" outline />
            </BaseButtons>
          </form>
        </CardBox>

        <SectionTitle>Custom elements</SectionTitle>

        <CardBox>
          <FormCheckRadioGroup
            v-model="customElementsForm.checkbox"
            :options="checkboxOptions"
            type="checkbox"
          />
          <BaseDivider />
          <FormCheckRadioGroup
            v-model="customElementsForm.radio"
            :options="radioOptions"
            type="radio"
          />
          <BaseDivider />
          <FormCheckRadioGroup
            v-model="customElementsForm.switch"
            :options="switchOptions"
            type="switch"
          />
          <BaseDivider />
          <FormFilePicker v-model="customElementsForm.file" label="Upload" />
        </CardBox>

        <SectionTitle>Form with status example</SectionTitle>

        <CardBox class="md:w-7/12 lg:w-5/12 xl:w-4/12 mx-auto">
          <NotificationBarInCard :color="notificationColorClass">
            <b class="capitalize">{{ formStatusOptions[formStatusCurrent] }}</b>
            state
          </NotificationBarInCard>
          <form @submit.prevent="formStatusSubmit" class="p-6">
            <FormField label="Fields">
              <FormControl
                v-model="form.name"
                :icon="icons.user"
                placeholder="Name"
                help="Your full name"
              />
            </FormField>
            <BaseButton type="submit" color="blue" label="Trigger" />
          </form>
        </CardBox>
      </div>
    </SectionContainer>
  </LayoutAuthenticated>
</template>
