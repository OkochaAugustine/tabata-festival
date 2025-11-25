"use client";

import React, { useState } from "react";
import {
  Box,
  Stack,
  Input,
  FormControl,
  FormLabel,
  Button,
  Heading,
  Text,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { CopyIcon } from "@chakra-ui/icons";

const MotionButton = motion(Button);
const MotionBox = motion(Box);

export default function RegisterPage() {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    location: "",
  });
  const [loading, setLoading] = useState(false);
  const [userCode, setUserCode] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const generateCode = () =>
    Math.random().toString(36).substring(2, 8).toUpperCase();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        // Show server error or email exists
        throw new Error(data.message || "Server error");
      }

      // Generate unique code
      const code = generateCode();
      setUserCode(code);

      // Open congratulations modal
      onOpen();

      // Reset form
      setFormData({ name: "", email: "", phone: "", location: "" });

      toast({
        title: "Registration successful!",
        description: "You have successfully registered.",
        status: "success",
        duration: 5000,
        isClosable: true,
      });
    } catch (error: any) {
      console.error("Registration error:", error);
      toast({
        title: "Registration failed",
        description: error.message,
        status: "error",
        duration: 7000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleModalClose = () => {
    onClose();
    router.push("/"); // Redirect to homepage
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(userCode);
    toast({
      title: "Copied!",
      description: "Your registration code has been copied to clipboard.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box minH="100vh" display="flex" alignItems="center" justifyContent="center" px={6} py={12} bg="gray.900" color="white">
      <Box maxW="md" w="100%" bg="gray.800" p={8} borderRadius="xl" boxShadow="lg">
        <Heading mb={6} textAlign="center">Register for Tabata Festival</Heading>
        <form onSubmit={handleSubmit}>
          <Stack direction="column" gap={4}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input name="name" value={formData.name} onChange={handleChange} placeholder="Your full name" required />
            </FormControl>
            <FormControl>
              <FormLabel>Email</FormLabel>
              <Input name="email" type="email" value={formData.email} onChange={handleChange} placeholder="you@example.com" required />
            </FormControl>
            <FormControl>
              <FormLabel>Phone</FormLabel>
              <Input name="phone" type="tel" value={formData.phone} onChange={handleChange} placeholder="+234 000 0000 000" required />
            </FormControl>
            <FormControl>
              <FormLabel>Location</FormLabel>
              <Input name="location" value={formData.location} onChange={handleChange} placeholder="City or Area" required />
            </FormControl>
            <MotionButton
              type="submit"
              colorScheme="pink"
              size="lg"
              mt={4}
              isLoading={loading}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Register Now
            </MotionButton>
          </Stack>
        </form>
        <Text mt={4} fontSize="sm" textAlign="center" color="gray.400">
          After registering, your information will be sent to the admin dashboard.
        </Text>
      </Box>

      {/* Congratulations Modal */}
      <Modal isOpen={isOpen} onClose={handleModalClose} isCentered>
        <ModalOverlay />
        <ModalContent bg="pink.700" color="white" textAlign="center">
          <ModalHeader>🎉 Congratulations! 🎉</ModalHeader>
          <ModalBody>
            <Text fontSize="lg" mb={4}>
              You have successfully registered for the Tabata Festival!
            </Text>
            <Text fontSize="md" mb={2}>
              Your unique code is: <strong>{userCode}</strong>
            </Text>
            <Button leftIcon={<CopyIcon />} colorScheme="yellow" mb={4} onClick={handleCopy}>
              Copy Code
            </Button>
            <Text fontSize="sm" mb={4}>
              Please keep this code safe. You will need it for entry and updates.
            </Text>
            <Button
              as="a"
              href="https://chat.whatsapp.com/your-group-link"
              target="_blank"
              colorScheme="green"
              size="md"
            >
              Join our WhatsApp group for updates
            </Button>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleModalClose} colorScheme="pink" variant="outline">Close</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
