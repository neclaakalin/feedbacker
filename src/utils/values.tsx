export const validationMessages = (t: (i: string) => string) => ({
  required: t("FORM.REQUIRED"),
  types: {
    email: t("FORM.TYPES.EMAIL"),
    number: t("FORM.TYPES.NUMBER"),
  },
  number: {
    range: t("FORM.NUMBER.RANGE"),
  },
  string: {
    min: t("FORM.STRING.MIN"),
  },
});

export const ratings = ["TERRIBLE", "BAD", "NORMAL", "GOOD", "WONDERFUL"];
