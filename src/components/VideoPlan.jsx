import React from 'react';
import { Paper, Title, Stack, Card, Group, Text, Badge } from '@mantine/core';

export function VideoPlan({ videoPlan }) {
  return (
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
  );
}