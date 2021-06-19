export const response = (
  success: boolean,
  message: string,
  data: object | null
) => {
  const res = { success, message, data };
  return res;
};
