import axios from "axios";
import { boot } from "quasar/wrappers";

import {
  getLocaleFromProfile,
  i18n,
  resolveInitialLocale,
  setLocale,
} from "@/i18n";

export default boot(async ({ app }) => {
  app.use(i18n);
  await setLocale(resolveInitialLocale());

  if (typeof window === "undefined") {
    return;
  }

  const token = window.localStorage.getItem("access_token");

  if (!token) {
    return;
  }

  try {
    const { data } = await axios.get("/accounts/users/ui/");
    const profileLocale = getLocaleFromProfile(data);

    if (profileLocale) {
      await setLocale(profileLocale);
    }
  } catch {
    return;
  }
});
