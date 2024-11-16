import React, { useState } from 'react';
import { Container, TextInput, Button, Title, Paper, Stack, Group, Text, Loader, Alert } from '@mantine/core';
import { IconSearch, IconAlertCircle } from '@tabler/icons-react';
import { ContentSummary } from './components/ContentSummary';
import { VideoPlan } from './components/VideoPlan';

function App() {
  const [topic, setTopic] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSearch = async () => {
    if (!topic.trim()) return;

    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/search?topic=${encodeURIComponent(topic)}`);
      if (!response.ok) throw new Error('Failed to fetch results');
      
      const data = await response.json();
      setResults(data);
    } catch (err) {
      setError(err.message);
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container size="lg" py="xl">
      <Stack spacing="xl">
        <Title order={1} align="center">Content Retrieval System</Title>
        
        <Paper shadow="sm" p="md">
          <Group>
            <TextInput
              placeholder="Enter a topic..."
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              style={{ flex: 1 }}
              leftSection={<IconSearch size={16} />}
            />
            <Button onClick={handleSearch} loading={loading}>
              Search
            </Button>
          </Group>
        </Paper>

        {error && (
          <Alert icon={<IconAlertCircle size={16} />} title="Error" color="red">
            {error}
          </Alert>
        )}

        {loading && (
          <Paper p="xl" align="center">
            <Stack align="center" spacing="md">
              <Loader size="lg" />
              <Text>Retrieving content...</Text>
            </Stack>
          </Paper>
        )}

        {results && !loading && (
          <Stack spacing="xl">
            <ContentSummary content={results.content} />
            <VideoPlan videoPlan={results.videoPlan} />
          </Stack>
        )}
      </Stack>
    </Container>
  );
}