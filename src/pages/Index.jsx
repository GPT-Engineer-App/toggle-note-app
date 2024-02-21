import React, { useState } from "react";
import { Box, Button, ChakraProvider, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, HStack } from "@chakra-ui/react";
import { FaStickyNote, FaCheckCircle, FaRegTrashAlt } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [tabIndex, setTabIndex] = useState(0);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const addNote = () => {
    setNotes((prevNotes) => [...prevNotes, { content: inputValue, completed: false }]);
    setInputValue("");
  };

  const toggleNoteCompletion = (index) => {
    const newNotes = notes.map((note, i) => {
      if (i === index) {
        return { ...note, completed: !note.completed };
      }
      return note;
    });
    setNotes(newNotes);
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  const filteredNotes = (filterFn) => notes.filter(filterFn);

  return (
    <ChakraProvider>
      <Box p={4}>
        <VStack spacing={4}>
          <Input placeholder="Type your note here..." value={inputValue} onChange={handleInputChange} />
          <Button leftIcon={<FaStickyNote />} colorScheme="blue" onClick={addNote}>
            Add Note
          </Button>

          <Tabs isFitted variant="enclosed" index={tabIndex} onChange={(index) => setTabIndex(index)}>
            <TabList>
              <Tab>All</Tab>
              <Tab>Active</Tab>
              <Tab>Completed</Tab>
            </TabList>

            <TabPanels>
              <TabPanel>
                <VStack>
                  {filteredNotes(() => true).map((note, index) => (
                    <NoteItem key={index} note={note} onToggle={() => toggleNoteCompletion(index)} onDelete={() => deleteNote(index)} />
                  ))}
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack>
                  {filteredNotes((note) => !note.completed).map((note, index) => (
                    <NoteItem key={index} note={note} onToggle={() => toggleNoteCompletion(index)} onDelete={() => deleteNote(index)} />
                  ))}
                </VStack>
              </TabPanel>
              <TabPanel>
                <VStack>
                  {filteredNotes((note) => note.completed).map((note, index) => (
                    <NoteItem key={index} note={note} onToggle={() => toggleNoteCompletion(index)} onDelete={() => deleteNote(index)} />
                  ))}
                </VStack>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </VStack>
      </Box>
    </ChakraProvider>
  );
};

const NoteItem = ({ note, onToggle, onDelete }) => {
  return (
    <HStack spacing={4}>
      <Text as={note.completed ? "s" : undefined}>{note.content}</Text>
      <Button size="sm" onClick={onToggle}>
        {note.completed ? <FaCheckCircle /> : <FaStickyNote />}
      </Button>
      <Button size="sm" colorScheme="red" onClick={onDelete}>
        <FaRegTrashAlt />
      </Button>
    </HStack>
  );
};

export default Index;
