import React from 'react';
import { Box, FormControl, FormLabel, Input, VStack } from '@chakra-ui/react';

function Settings() {
  return (
    <VStack spacing={4}>
      <FormControl id="openai-api-key">
        <FormLabel>Open AI API Key</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl id="openai-assistant-key">
        <FormLabel>Open AI Assistant Key</FormLabel>
        <Input type="text" />
      </FormControl>
      <FormControl id="prompt">
        <FormLabel>Prompt</FormLabel>
        <Input type="text" />
      </FormControl>
    </VStack>
  );
}

export default Settings;