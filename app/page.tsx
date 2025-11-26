"use client";

import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Heading,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";

const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);
const MotionBox = motion(Box);

const rotatingTexts = [
  "Join the ultimate fitness carnival featuring high-intensity Tabata workouts!",
  "Expert trainers, live music, games, and endless fun await!",
  "Don’t miss out on this unforgettable celebration of energy, power, and transformation!",
];

// IMAGE SLIDES
const slides = ["/images/foto3.jpg", "/images/foto4.jpg"];

export default function HomePage() {
  const router = useRouter();
  const eventDate = new Date("2025-12-06T07:00:00");

  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentSlide, setCurrentSlide] = useState(0);

  // COUNTDOWN TIMER
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const diff = eventDate.getTime() - now.getTime();

      setTimeLeft({
        days: Math.max(0, Math.floor(diff / (1000 * 60 * 60 * 24))),
        hours: Math.max(0, Math.floor((diff / (1000 * 60 * 60)) % 24)),
        minutes: Math.max(0, Math.floor((diff / (1000 * 60)) % 60)),
        seconds: Math.max(0, Math.floor((diff / 1000) % 60)),
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // ROTATING TEXT
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // SLIDESHOW
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      minH="100vh"
      w="100%"
      position="relative"
      overflow="hidden"
      display="flex"
      alignItems="center"
      justifyContent="center"
      px={[3, 4]}
      py={[10, 14]}
    >
      {/* Background SLIDES */}
      <AnimatePresence mode="wait">
        <motion.div
          key={slides[currentSlide]}
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `url(${slides[currentSlide]})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            zIndex: 0,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.2 }}
        />
      </AnimatePresence>

      {/* Dark overlay */}
      <Box
        position="absolute"
        inset={0}
        bg="rgba(0,0,0,0.6)"
        zIndex={1}
      />

      {/* HERO CONTENT */}
      <Stack
        spacing={[4, 6]}
        textAlign="center"
        zIndex={10}
        w="100%"
        maxW="420px"
        mx="auto"
        alignItems="center"
      >
        <MotionHeading
          fontSize={["2xl", "3xl", "4xl"]}
          fontWeight="extrabold"
          color="pink.300"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Tabata Festival 🎉 with Super Stan
        </MotionHeading>

        <MotionText
          fontSize={["sm", "md"]}
          fontWeight="bold"
          color="pink.200"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Date: 6th December 2025 • Time: 7:00am  
          Venue: The Base Landmark, Independence Layout, Enugu
        </MotionText>

        {/* Rotating Sub Text */}
        <AnimatePresence mode="wait">
          <MotionText
            key={rotatingTexts[currentTextIndex]}
            fontSize={["sm", "md"]}
            color="yellow.300"
            px={2}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.6 }}
          >
            {rotatingTexts[currentTextIndex]}
          </MotionText>
        </AnimatePresence>

        <Text fontSize={["lg", "xl"]} fontWeight="bold" color="yellow.200">
          Countdown to the Event
        </Text>

        {/* Countdown Boxes */}
        <Flex justify="center" gap={3} flexWrap="wrap" maxW="340px" w="100%">
          {[
            { label: "Days Left", value: timeLeft.days },
            { label: "Hours", value: timeLeft.hours },
            { label: "Minutes", value: timeLeft.minutes },
            { label: "Seconds", value: timeLeft.seconds },
          ].map((item, i) => (
            <MotionBox
              key={i}
              bgGradient="linear(to-r, pink.400, yellow.400, red.400)"
              px={4}
              py={3}
              borderRadius="xl"
              minW="70px"
              textAlign="center"
              animate={{ scale: [1, 1.05, 1] }}
              transition={{
                duration: 2,
                repeat: Infinity,
                delay: i * 0.1,
              }}
            >
              <Text fontSize="2xl" fontWeight="extrabold">
                {item.value}
              </Text>
              <Text fontSize="xs" fontWeight="bold">
                {item.label}
              </Text>
            </MotionBox>
          ))}
        </Flex>

        {/* CTA BUTTON */}
        <MotionButton
          w="100%"
          maxW="360px"
          py={4}
          fontSize={["md", "lg"]}
          fontWeight="extrabold"
          borderRadius="full"
          bgGradient="linear(to-r, #ff0080, #ff8c00, #ffd700)"
          color="white"
          whileHover={{ scale: 1.1 }}
          onClick={() => router.push("/register")}
        >
          ⏳ Register Now & Secure Your Spot
        </MotionButton>
      </Stack>
    </Box>
  );
}


