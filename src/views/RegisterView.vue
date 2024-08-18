<script setup>
import { computed, watch, ref } from "vue";
import { useI18n } from "vue-i18n";
import sTitleButton from "@/components/BaseComponents/SectionTitleLineWithButton.vue";
import CardBox from "@/components/BaseComponents/BaseCardBox.vue";
import fField from "@/components/BaseComponents/FormField.vue";
import fControl from "@/components/BaseComponents/FormControl.vue";
import Divider from "@/components/BaseComponents/BaseDivider.vue";
import Button from "@/components/BaseComponents/BaseButton.vue";
import Buttons from "@/components/BaseComponents/BaseButtons.vue";
import AuthLayout from "@/components/LayoutAuthenticated.vue";
import sContainer from "@/components/SectionContainer.vue";
import { icons } from "@/assets/icons";
import { areas } from "@/i18n/areas.js";

const { t, locale } = useI18n();

const form = ref({
  "your-name": "",
  id: "",
  tell: "",
  "your-email": "",
  nationality: "",
  familyno: "",
  marital: "",
  "your-wife": "",
  "id-wife": "",
  jop: "",
  salary: "",
  governorate: "",
  area: "",
  block: "",
  street: "",
  avenu: "",
  home: "",
  round: "",
  Flat: "",
});

const maritalOptions = computed(() => [
  { id: "married", label: t("registerView.maritalOptions.married") },
  { id: "widowed", label: t("registerView.maritalOptions.widowed") },
  { id: "divorced", label: t("registerView.maritalOptions.divorced") },
]);

const governorateOptions = computed(() => [
  { id: "capital", label: t("registerView.governorateOptions.capital") },
  { id: "farwaniya", label: t("registerView.governorateOptions.farwaniya") },
  { id: "hawalli", label: t("registerView.governorateOptions.hawalli") },
  { id: "ahmadi", label: t("registerView.governorateOptions.ahmadi") },
  {
    id: "mubarakAlKabeer",
    label: t("registerView.governorateOptions.mubarakAlKabeer"),
  },
  { id: "jahra", label: t("registerView.governorateOptions.jahra") },
]);

const areaOptions = computed(() => {
  if (!form.value.governorate) return [];

  const currentAreas = areas[locale.value]?.[form.value.governorate] || {};
  return Object.entries(currentAreas).map(([id, label]) => ({ id, label }));
});

const showWifeFields = computed(() => form.value.marital === "married");

const submit = () => {
  // Handle form submission
  console.log(form);
};

// Watch for changes in the governorate and reset area when it changes
watch(
  () => form.value.governorate,
  (newGovernorate, oldGovernorate) => {
    if (newGovernorate !== oldGovernorate) {
      form.area = "";
    }
  },
);

const handleLanguageChange = (newLocale) => {
  locale.value = newLocale;
  // You might want to add additional logic here, such as refreshing certain data
  console.log(`Language changed to: ${newLocale}`);
};
</script>

<template>
  <AuthLayout @changeLanguage="handleLanguageChange">
    <sContainer>
      <sTitleButton
        :icon="icons.userPlus"
        :title="t('registerView.titles.registration')"
        color="blue"
      />

      <CardBox form @submit.prevent="submit" class="p-6">
        <fField :label="t('registerView.titles.info')" :columns="2">
          <fControl
            v-model="form['your-name']"
            :icon="icons.user"
            :placeholder="t('registerView.placeholders.yourName')"
            required
            :maxlength="50"
            :minlength="10"
          />

          <fControl
            v-model="form.id"
            type="number"
            :icon="icons.idCard"
            :placeholder="t('registerView.placeholders.id')"
            required
          />

          <fControl
            v-model="form.tell"
            type="tel"
            :icon="icons.phone"
            :placeholder="t('registerView.placeholders.tell')"
            required
            :maxlength="400"
          />

          <fControl
            v-model="form['your-email']"
            type="email"
            :icon="icons.mail"
            :placeholder="t('registerView.placeholders.yourEmail')"
            required
            :maxlength="400"
          />
        </fField>

        <fField :label="t('registerView.titles.nationality')">
          <fControl
            v-model="form.nationality"
            :icon="icons.flag"
            :placeholder="t('registerView.placeholders.nationality')"
            required
            :maxlength="10"
            :minlength="4"
          />
        </fField>

        <fField :label="t('registerView.titles.family')" :columns="2">
          <fControl
            v-model="form.familyno"
            type="number"
            :icon="icons.users"
            :placeholder="t('registerView.placeholders.familyno')"
            required
          />

          <fControl
            v-model="form.marital"
            :options="maritalOptions"
            :icon="icons.heart"
            :placeholder="t('registerView.placeholders.marital')"
            required
          />

          <template v-if="showWifeFields">
            <fControl
              v-model="form['your-wife']"
              :icon="icons.user"
              :placeholder="t('registerView.placeholders.yourWife')"
              required
              :maxlength="50"
              :minlength="10"
            />

            <fControl
              v-model="form['id-wife']"
              type="number"
              :icon="icons.idCard"
              :placeholder="t('registerView.placeholders.idWife')"
              required
            />
          </template>
        </fField>

        <fField :label="t('registerView.titles.employee')" :columns="2">
          <fControl
            v-model="form.jop"
            :icon="icons.briefcase"
            :placeholder="t('registerView.placeholders.jop')"
            required
            :maxlength="20"
            :minlength="4"
          />

          <fControl
            v-model="form.salary"
            type="number"
            :icon="icons.dollarSign"
            :placeholder="t('registerView.placeholders.salary')"
            required
          />
        </fField>

        <fField :label="t('registerView.titles.address')" :columns="2">
          <fControl
            v-model="form.governorate"
            :options="governorateOptions"
            :icon="icons.mapPin"
            :placeholder="t('registerView.placeholders.governorate')"
            required
          />

          <fControl
            v-model="form.area"
            :options="areaOptions"
            :icon="icons.map"
            :placeholder="t('registerView.placeholders.area')"
            required
            :disabled="!form.governorate"
          />

          <fControl
            v-model="form.street"
            :icon="icons.road"
            :placeholder="t('registerView.placeholders.street')"
            required
            :maxlength="20"
            :minlength="1"
          />

          <fControl
            v-model="form.avenu"
            type="number"
            :icon="icons.cornerUpRight"
            :placeholder="t('registerView.placeholders.avenu')"
          />

          <fControl
            v-model="form.home"
            type="number"
            :icon="icons.home"
            :placeholder="t('registerView.placeholders.home')"
            required
          />

          <fControl
            v-model="form.round"
            type="number"
            :icon="icons.repeat"
            :placeholder="t('registerView.placeholders.round')"
            required
          />

          <fControl
            v-model="form.Flat"
            type="number"
            :icon="icons.squareAsterisk"
            :placeholder="t('registerView.placeholders.Flat')"
            required
          />
        </fField>

        <Divider />

        <Buttons>
          <Button
            color="info"
            type="submit"
            :label="t('registerView.forms.submit')"
          />
        </Buttons>
      </CardBox>
    </sContainer>
  </AuthLayout>
</template>
