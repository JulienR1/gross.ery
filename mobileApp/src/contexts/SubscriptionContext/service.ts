export const getListIdFromUrl = async (url: string | undefined) => {
  if (url) {
    const potentialListId = url.split('?').reverse()?.[0];
    if (potentialListId.length === 24) {
      return potentialListId;
    }
  }
  return undefined;
};
