"use client";

import React, { useState, useEffect } from "react";
import { Box, Stack, Heading, Text, Button, Flex } from "@chakra-ui/react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation"; // <-- added

// Motion components
const MotionHeading = motion(Heading);
const MotionText = motion(Text);
const MotionButton = motion(Button);
const MotionBox = motion(Box);

// Rotating texts
const rotatingTexts = [
  "Join the ultimate fitness carnival featuring high-intensity Tabata workouts!",
  "Expert trainers, live music, games, and endless fun await!",
  "Don’t miss out on this unforgettable celebration of energy, power, and transformation!",
];

// Sparkle component
const Sparkle = () => {
  const top = Math.random() * 100;
  const left = Math.random() * 100;
  const size = 2 + Math.random() * 4;
  const opacity = 0.4 + Math.random() * 0.6;
  return (
    <MotionBox
      style={{
        position: "absolute",
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: "50%",
        background: "linear-gradient(45deg, #ff7ce5, #ffeb3b, #00e5ff)",
        top: `${top}%`,
        left: `${left}%`,
        opacity,
        pointerEvents: "none",
      }}
      animate={{ scale: [0.5, 1.5, 0.5], rotate: [0, 360] }}
      transition={{ duration: 1 + Math.random(), repeat: Infinity }}
    />
  );
};

export default function HomePage() {
  const router = useRouter(); // <-- initialize router
  const eventDate = new Date("2025-12-06T07:00:00");
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  // Lock scrolling on mobile
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  // Countdown timer
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

  // Rotate subtexts
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTextIndex((prev) => (prev + 1) % rotatingTexts.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  // Animate numbers
  const numberAnimation = {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 0.8, opacity: 0 },
    transition: { duration: 0.6 },
  };

  return (
    <Box
      minH="100vh"
      w="100vw"
      backgroundImage="url('/images/foto.jpg')"
      backgroundSize="cover"
      backgroundPosition="center"
      color="white"
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="flex-start"
      px={6}
      pt={24}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: "absolute",
        inset: 0,
        bg: "blackAlpha.700",
      }}
    >
      {/* Sparkles */}
      {Array.from({ length: 15 }).map((_, i) => (
        <Sparkle key={i} />
      ))}

      <Stack
        textAlign="center"
        direction="column"
        position="relative"
        zIndex={10}
        maxW="3xl"
        alignItems="center"
        gap={6}
      >
        {/* Hero Heading */}
        <MotionHeading
          fontSize={["3xl", "4xl", "5xl"]}
          fontWeight="extrabold"
          color="pink.300"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Tabata Festival <span role="img" aria-label="party">🎉</span> with Stan
        </MotionHeading>

        {/* Event details */}
        <MotionText
          fontSize={["lg", "xl", "2xl"]}
          fontWeight="bold"
          color="pink.200"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Date: 6th December 2025 • Time: 7:00am • Venue: The Base Landmark, Independence Layout, Enugu
        </MotionText>

        {/* Rotating description */}
        <AnimatePresence mode="wait">
          <MotionText
            key={rotatingTexts[currentTextIndex]}
            fontSize={["md", "lg", "xl"]}
            fontWeight="semibold"
            color="yellow.300"
            textAlign="center"
            px={[2, 4]}
            lineHeight="1.5"
            initial={{ scale: 0.8, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: -20 }}
            transition={{ duration: 0.7 }}
          >
            {rotatingTexts[currentTextIndex]}
          </MotionText>
        </AnimatePresence>

        {/* Countdown Timer */}
        <Text fontSize={["2xl", "3xl"]} fontWeight="bold" color="yellow.200">
          Countdown to the Event
        </Text>
        <Flex justify="center" gap={[3, 6]} flexWrap="wrap">
          {["Days Left", "Hours", "Minutes", "Seconds"].map((label, i) => (
            <MotionBox
              key={i}
              bgGradient="linear(to-r, pink.400, yellow.400, red.400)"
              px={6}
              py={4}
              borderRadius="2xl"
              minW="90px"
              textAlign="center"
              animate={{ scale: [1, 1.1, 1], rotate: [0, 2, -2, 0] }}
              transition={{ duration: 2, repeat: Infinity, repeatType: "loop", delay: i * 0.1 }}
            >
              <MotionText fontSize={["2xl", "3xl"]} fontWeight="extrabold" {...numberAnimation} color="white">
                {i === 0 ? timeLeft.days : i === 1 ? timeLeft.hours : i === 2 ? timeLeft.minutes : timeLeft.seconds}
              </MotionText>
              <MotionText fontSize="sm" fontWeight="bold" textTransform="uppercase" color="whiteAlpha.800">
                {label}
              </MotionText>
            </MotionBox>
          ))}
        </Flex>

        {/* Register Button */}
        <MotionButton
          mt={6}
          fontSize={["md", "lg", "xl"]}
          py={6}
          px={12}
          fontWeight="extrabold"
          borderRadius="full"
          bgGradient="linear(to-r, #ff0080, #ff8c00, #ffd700)"
          color="white"
          _hover={{
            bgGradient: "linear(to-r, #ffd700, #ff8c00, #ff0080)",
            transform: "scale(1.15)",
            boxShadow: "0 0 25px #ffd700, 0 0 35px #ff0080",
          }}
          animate={{ scale: [1, 1.05, 1], rotate: [0, 2, -2, 0] }}
          transition={{ duration: 2, repeat: Infinity, repeatType: "loop" }}
          onClick={() => router.push("/register")} // <-- navigate to register page
        >
          ⏳ Register Now & Secure Your Spot
        </MotionButton>
      </Stack>
    </Box>
  );
}
