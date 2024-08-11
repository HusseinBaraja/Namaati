<script setup>
import { ref, reactive, computed } from "vue";
import sTitleButton from "@/components/BaseComponents/SectionTitleLineWithButton.vue";
import CardBox from "@/components/BaseComponents/BaseCardBox.vue";
import fField from "@/components/BaseComponents/FormField.vue";
import fControl from "@/components/BaseComponents/FormControl.vue";
import Divider from "@/components/BaseComponents/BaseDivider.vue";
import Button from "@/components/BaseComponents/BaseButton.vue";
import Buttons from "@/components/BaseComponents/BaseButtons.vue";
import sTitle from "@/components/BaseComponents/SectionTitle.vue";
import fRadioGroup from "@/components/BaseComponents/FormCheckRadioGroup.vue";
import fFilePicker from "@/components/BaseComponents/FormFilePicker.vue";
import NotificationBarInCard from "@/components/BaseComponents/NotificationBarInCard.vue";
import { icons } from "@/assets/icons";
import AuthLayout from "@/components/LayoutAuthenticated.vue";
import sContainer from "@/components/SectionContainer.vue";

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
  <AuthLayout>
    <sContainer>
      <div class="p-6 xl:max-w-6xl xl:mx-auto">
        <sTitleButton
          :icon="icons.file"
          title="Forms example"
          color="blue"
          :button-icon="icons.excavator"
        />

        <CardBox>
          <form @submit.prevent="submit" class="p-6">
            <fField label="Grouped with icons">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-3">
                <fControl
                  v-model="form.name"
                  :icon="icons.user"
                  placeholder="Name"
                />
                <fControl
                  v-model="form.email"
                  type="email"
                  :icon="icons.mail"
                  placeholder="Email"
                />
              </div>
            </fField>

            <fField label="With help line" help="Do not enter the leading zero">
              <fControl
                v-model="form.phone"
                type="tel"
                placeholder="Your phone number"
              />
            </fField>

            <fField label="Dropdown">
              <fControl v-model="form.department" :options="selectOptions" />
            </fField>

            <Divider />

            <fField label="Question" help="Your question. Max 255 characters">
              <fControl
                v-model="form.question"
                type="textarea"
                placeholder="Explain how we can help you"
              />
            </fField>

            <Buttons>
              <Button color="info" type="submit" label="Submit" />
              <Button color="info" label="Options" outline />
            </Buttons>
          </form>
        </CardBox>

        <sTitle>Custom elements</sTitle>

        <CardBox>
          <fRadioGroup
            v-model="customElementsForm.checkbox"
            :options="checkboxOptions"
            type="checkbox"
          />
          <Divider />
          <fRadioGroup
            v-model="customElementsForm.radio"
            :options="radioOptions"
            type="radio"
          />
          <Divider />
          <fRadioGroup
            v-model="customElementsForm.switch"
            :options="switchOptions"
            type="switch"
          />
          <Divider />
          <fFilePicker v-model="customElementsForm.file" label="Upload" />
        </CardBox>

        <sTitle>Form with status example</sTitle>

        <CardBox class="md:w-7/12 lg:w-5/12 xl:w-4/12 mx-auto">
          <NotificationBarInCard :color="notificationColorClass">
            <b class="capitalize">{{ formStatusOptions[formStatusCurrent] }}</b>
            state
          </NotificationBarInCard>
          <form @submit.prevent="formStatusSubmit" class="p-6">
            <fField label="Fields">
              <fControl
                v-model="form.name"
                :icon="icons.user"
                placeholder="Name"
                help="Your full name"
              />
            </fField>
            <Button type="submit" color="blue" label="Trigger" />
          </form>
        </CardBox>
      </div>
    </sContainer>
  </AuthLayout>
</template>
