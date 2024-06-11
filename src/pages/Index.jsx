import React, { useState } from 'react';
import { Container, VStack, HStack, Input, Button, Text, Box, IconButton, Heading } from "@chakra-ui/react";
import { FaEdit, FaTrash } from "react-icons/fa";

const Index = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskText, setEditingTaskText] = useState("");

  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  const startEditing = (id, text) => {
    setEditingTaskId(id);
    setEditingTaskText(text);
  };

  const saveEditing = (id) => {
    setTasks(tasks.map(task => task.id === id ? { ...task, text: editingTaskText } : task));
    setEditingTaskId(null);
    setEditingTaskText("");
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <Heading as="h1" size="2xl" mb={6} textAlign="center">
        Todo App
      </Heading>
      <VStack spacing={4} w="100%">
        <HStack w="100%">
          <Input 
            placeholder="Add a new task" 
            value={newTask} 
            onChange={(e) => setNewTask(e.target.value)} 
          />
          <Button colorScheme="orange" onClick={addTask}>Add Task</Button>
        </HStack>
        <VStack spacing={2} w="100%">
          {tasks.map((task) => (
            <HStack key={task.id} w="100%" justifyContent="space-between">
              {editingTaskId === task.id ? (
                <Input 
                  value={editingTaskText}
                  onChange={(e) => setEditingTaskText(e.target.value)} 
                />
              ) : (
                <Text>{task.text}</Text>
              )}
              <HStack>
                {editingTaskId === task.id ? (
                  <Button colorScheme="green" onClick={() => saveEditing(task.id)}>Save</Button>
                ) : (
                  <IconButton icon={<FaEdit />} onClick={() => startEditing(task.id, task.text)} />
                )}
                <IconButton icon={<FaTrash />} onClick={() => deleteTask(task.id)} />
              </HStack>
            </HStack>
          ))}
        </VStack>
      </VStack>
    </Container>
  );
};

export default Index;