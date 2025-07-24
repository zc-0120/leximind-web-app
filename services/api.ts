export const apiService = {
  async fetchNews() {
    try {
      const response = await fetch("/api/v1/news");
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching news:", error);
      throw error;
    }
  },

  async translate(text: string) {
    try {
      const response = await fetch(
        `/api/v1/trans?q=${encodeURIComponent(text)}`,
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error translating text:", error);
      throw error;
    }
  },
};
