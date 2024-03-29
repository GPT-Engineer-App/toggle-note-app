import React, { useState } from "react";
import { Box, ChakraProvider, Input, Tab, TabList, TabPanel, TabPanels, Tabs, Text, VStack, HStack, Button, IconButton } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { FaCog } from "react-icons/fa";
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
      <Box height="100vh" width="100vw" position="relative">
        <Link to="/settings">
          <IconButton icon={<FaCog />} isRound size="lg" position="absolute" bottom={4} left={4} zIndex={2} />
        </Link>
        <Tabs isFitted variant="enclosed" index={tabIndex} onChange={(index) => setTabIndex(index)} position="fixed" width="full" zIndex={1}>
          <TabList>
            <Tab>Input</Tab>
            <Tab>Urgent</Tab>
            <Tab>Categorized</Tab>
            <Tab>Recommendations</Tab>
          </TabList>

          {/* Rest of the code remains unchanged */}
        </Tabs>
        <Box pt="48">
          {" "}
          {/* Assuming tab height to be approximately 48px, which can be adjusted based on actual height */}
          <Input
            placeholder="Type your note here..."
            value={inputValue}
            onChange={handleInputChange}
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                addNote();
              }
            }}
            size="lg"
            height="calc(100vh - 48px)" /* Adjust the 48px if the tab height is different */
            width="full"
          />
        </Box>
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
