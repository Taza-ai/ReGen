import dotenv from 'dotenv';
import { YouTubeCollector } from './collectors/youtube.js';
import { WikipediaCollector } from './collectors/wikipedia.js';
import { InternetArchiveCollector } from './collectors/internetArchive.js';
import { NewsCollector } from './collectors/newsApi.js';
import { VimeoCollector } from './collectors/vimeo.js';
import { DailymotionCollector } from './collectors/dailymotion.js';
import { ContentProcessor } from './processors/contentProcessor.js';
import { ContentOrganizer } from './organizers/contentOrganizer.js';
import { VideoPlanner } from './planners/videoPlanner.js';

dotenv.config();

class ContentRetrievalSystem {
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

const contentSystem = new ContentRetrievalSystem();

// Handle command line arguments
const topic = process.argv.slice(2).join(' ');
if (topic) {
  contentSystem.retrieveContent(topic)
    .then(result => console.log('Content retrieved successfully:', JSON.stringify(result, null, 2)))
    .catch(error => console.error('Failed to retrieve content:', error));
} else {
  console.log('Please provide a topic as a command line argument');
}