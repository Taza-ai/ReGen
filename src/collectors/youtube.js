import { google } from 'googleapis';

export class YouTubeCollector {
  constructor() {
    this.youtube = google.youtube({
      version: 'v3',
      auth: process.env.YOUTUBE_API_KEY
    });
  }

  async collect(topic) {
    try {
      if (!process.env.YOUTUBE_API_KEY) {
        console.warn('YouTube API key not configured');
        return [];
      }

      const response = await this.youtube.search.list({
        part: ['snippet'],
        q: topic,
        maxResults: 10,
        type: ['video']
      });

      return response.data.items || [];
    } catch (error) {
      console.error('Error collecting YouTube content:', error);
      return [];
    }
  }
}