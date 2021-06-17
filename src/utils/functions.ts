export const response = (
  success: boolean,
  message: string,
  data: object | null
) => {
  return { success, message, data };
};
