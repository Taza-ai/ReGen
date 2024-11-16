import { YouTubeCollector } from '../src/collectors/youtube.js';
import { WikipediaCollector } from '../src/collectors/wikipedia.js';
import { InternetArchiveCollector } from '../src/collectors/internetArchive.js';
import { NewsCollector } from '../src/collectors/newsApi.js';
import { VimeoCollector } from '../src/collectors/vimeo.js';
import { DailymotionCollector } from '../src/collectors/dailymotion.js';
import { ContentProcessor } from '../src/processors/contentProcessor.js';
import { ContentOrganizer } from '../src/organizers/contentOrganizer.js';
import { VideoPlanner } from '../src/planners/videoPlanner.js';

export class ContentRetrievalSystem {
  constructor() {
    this.collectors = {
      youtube: new YouTubeCollector(),
      wikipedia: new WikipediaCollector(),
      internetArchive: new InternetArchiveCollector(),
      news: new NewsCollector(),
      vimeo: new VimeoCollector(),
      dailymotion: new DailymotionCollector()
    };
    this.processor = new ContentProcessor();
    this.organizer = new ContentOrganizer();
    this.planner = new VideoPlanner();
  }

  async retrieveContent(topic) {
    try {
      console.log(`Starting content retrieval for topic: ${topic}`);
      
      const collectionPromises = Object.entries(this.collectors).map(async ([source, collector]) => {
        try {
          const result = await collector.collect(topic);
          return [source, result];
        } catch (error) {
          console.error(`Error collecting from ${source}:`, error);
          return [source, []];
        }
      });

      const results = await Promise.all(collectionPromises);
      const content = Object.fromEntries(results);

      const processedContent = await this.processor.process(content);
      const organizedContent = await this.organizer.organize(processedContent);
      const videoPlan = await this.planner.createPlan(organizedContent);

      return {
        content: organizedContent,
        videoPlan
      };
    } catch (error) {
      console.error('Error in content retrieval:', error);
      throw error;
    }
  }
}