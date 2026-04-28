export const validateId = (id) => {
  const num = Number(id);

  if (!Number.isInteger(num) || num <= 0) {
    return null;
  }

  return num;
};

export const validateISODate = (saved_at) => {
  if (typeof saved_at !== "string") return null;

  const date = new Date(saved_at);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  if (date.toISOString() !== saved_at) {
    return null;
  }

  return saved_at;
};
