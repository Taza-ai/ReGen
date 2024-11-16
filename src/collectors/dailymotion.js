import fetch from 'node-fetch';

export class DailymotionCollector {
  constructor() {
    this.apiEndpoint = 'https://api.dailymotion.com';
  }

  async collect(topic) {
    try {
      const response = await fetch(
        `${this.apiEndpoint}/videos?fields=id,title,description&search=${encodeURIComponent(topic)}&limit=10`
      );
      
      if (!response.ok) {
        throw new Error(`Dailymotion API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.list || [];
    } catch (error) {
      console.error('Error collecting Dailymotion content:', error);
      return [];
    }
  }
}