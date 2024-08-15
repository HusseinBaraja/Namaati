<script setup>
import { ref, reactive, computed } from "vue";
import { useI18n } from "vue-i18n";
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

const { t, locale } = useI18n();

const selectOptions = computed(() => [
  { id: 1, label: t("homeview.departments.businessDevelopment") },
  { id: 2, label: t("homeview.departments.marketing") },
  { id: 3, label: t("homeview.departments.sales") },
]);

const form = reactive({
  name: "",
  email: "",
  phone: "",
  department: computed(() => selectOptions.value[0]),
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

const formStatusWithHeader = ref(true);

const formStatusCurrent = ref(0);

const formStatusOptions = ["info", "success", "danger", "warning"];

const formStatusSubmit = () => {
  formStatusCurrent.value = formStatusOptions[formStatusCurrent.value + 1]
    ? formStatusCurrent.value + 1
    : 0;
};

const handleLanguageChange = (newLocale) => {
  locale.value = newLocale;
};
</script>

<template>
  <AuthLayout @changeLanguage="handleLanguageChange">
    <sContainer>
      <sTitleButton
        :icon="icons.file"
        :title="t('homeview.titles.formsExample')"
        color="blue"
        :button-icon="icons.excavator"
      />

      <CardBox form @submit.prevent="submit" class="p-6">
        <fField :label="t('homeview.forms.name')">
          <fControl
            v-model="form.name"
            :icon="icons.user"
            :placeholder="t('homeview.placeholders.name')"
          />
          <fControl
            v-model="form.email"
            type="email"
            :icon="icons.mail"
            :placeholder="t('homeview.placeholders.email')"
          />
        </fField>

        <fField :label="t('homeview.forms.phone')" :help="t('homeview.help.phone')">
          <fControl
            v-model="form.phone"
            type="tel"
            :placeholder="t('homeview.placeholders.phone')"
          />
        </fField>

        <fField :label="t('homeview.forms.department')">
          <fControl v-model="form.department" :options="selectOptions" />
        </fField>

        <Divider />

        <fField :label="t('homeview.forms.question')" :help="t('homeview.help.question')">
          <fControl
            v-model="form.question"
            type="textarea"
            :placeholder="t('homeview.placeholders.question')"
          />
        </fField>

        <Buttons>
          <Button color="info" type="submit" :label="t('homeview.forms.submit')" />
          <Button color="info" :label="t('homeview.forms.options')" outline />
        </Buttons>
      </CardBox>
    </sContainer>

    <sTitle>{{ t("homeview.titles.customElements") }}</sTitle>

    <sContainer>
      <CardBox>
        <fField :label="t('homeview.forms.checkbox')">
          <fRadioGroup
            v-model="customElementsForm.checkbox"
            :options="checkboxOptions"
            name="sample-checkbox"
            type="checkbox"
          />
        </fField>

        <Divider />

        <fField :label="t('homeview.forms.radio')">
          <fRadioGroup
            v-model="customElementsForm.radio"
            :options="radioOptions"
            name="sample-radio"
            type="radio"
          />
        </fField>

        <Divider />

        <fField :label="t('homeview.forms.switch')">
          <fRadioGroup
            v-model="customElementsForm.switch"
            :options="switchOptions"
            name="sample-switch"
            type="switch"
          />
        </fField>

        <Divider />
        <fFilePicker
          v-model="customElementsForm.file"
          :label="t('homeview.forms.upload')"
        />
      </CardBox>
    </sContainer>

    <sTitle>{{ t("homeview.titles.formStatus") }}</sTitle>

    <sContainer>
      <CardBox
        class="md:w-7/12 lg:w-5/12 xl:w-4/12 mx-auto"
        @submit.prevent="formStatusSubmit"
      >
        <NotificationBarInCard
          :color="formStatusOptions[formStatusCurrent]"
          :is-placed-with-header="formStatusWithHeader"
        >
          <span>
            <b class="capitalize">{{ formStatusOptions[formStatusCurrent] }}</b>
            state
          </span>
        </NotificationBarInCard>
        <fField :label="t('homeview.forms.name')">
          <fControl
            v-model="form.name"
            :icon="icons.user"
            :placeholder="t('homeview.placeholders.name')"
            :help="t('homeview.help.name')"
          />
        </fField>
        <template #footer>
          <Button :label="t('homeview.forms.trigger')" type="submit" color="info" />
        </template>
      </CardBox>
    </sContainer>
  </AuthLayout>
</template>
