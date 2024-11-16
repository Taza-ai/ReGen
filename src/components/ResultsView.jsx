import React from 'react';
import { Stack, Paper, Title, Text, SimpleGrid, Card, Badge, Group } from '@mantine/core';
import { IconVideo, IconArticle, IconPhoto } from '@tabler/icons-react';

function ResultsView({ results }) {
  const { content, videoPlan } = results;

  return (
    <Stack spacing="xl">
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

      <Paper shadow="sm" p="md">
        <Title order={2} mb="md">Video Plan</Title>
        <Stack spacing="md">
          {videoPlan.sections.map((section, index) => (
            <Card key={index} shadow="sm">
              <Group position="apart">
                <Text weight={500} transform="capitalize">
                  {section.type.replace('_', ' ')}
                </Text>
                <Badge>{section.duration}</Badge>
              </Group>
            </Card>
          ))}
          <Text align="right" weight={500}>
            Total Duration: {videoPlan.totalDuration}
          </Text>
        </Stack>
      </Paper>
    </Stack>
  );
}