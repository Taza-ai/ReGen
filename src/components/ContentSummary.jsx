import React from 'react';
import { Paper, Title, SimpleGrid, Card, Group, Text } from '@mantine/core';
import { IconVideo, IconArticle, IconPhoto } from '@tabler/icons-react';

export function ContentSummary({ content }) {
  return (
    <Paper shadow="sm" p="md">
      <Title order={2} mb="md">Content Summary</Title>
      <SimpleGrid cols={3}>
        <Card shadow="sm" p="md">
          <Group>
            <IconVideo size={24} />
            <Text>Videos: {content.videos.length}</Text>
          </Group>
        </Card>
        <Card shadow="sm" p="md">
          <Group>
            <IconArticle size={24} />
            <Text>Articles: {content.articles.length}</Text>
          </Group>
        </Card>
        <Card shadow="sm" p="md">
          <Group>
            <IconPhoto size={24} />
            <Text>Images: {content.images.length}</Text>
          </Group>
        </Card>
      </SimpleGrid>
    </Paper>
  );
}