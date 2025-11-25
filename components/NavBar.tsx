"use client";

import { Box, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const Light = motion(Box);

export default function NavBar() {
  return (
    <Box
      position="fixed"
      top={0}
      left={0}
      w="100%"
      h="80px"
      display="flex"
      alignItems="center"
      justifyContent="space-between"
      px={8}
      zIndex={1000}
      bg="rgba(0,0,0,0.4)"
      borderBottom="2px solid rgba(255,255,255,0.1)"
    >
      {/* Logo */}
      <Image
        src="/images/logo.jpg"
        alt="Tabata Festival Logo"
        boxSize="60px"
        objectFit="contain"
        cursor="pointer"
      />

      {/* Top-right festival title */}
      <Box display="flex" justifyContent="flex-end" alignItems="center" gap="4px">
        <Text
          fontSize={["lg", "xl", "2xl"]}
          fontWeight="bold"
          color="white"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          
        </Text>

        <Text
          fontSize={["md", "lg", "xl"]}
          fontWeight="medium"
          color="gray.300"
        >
        
          {/* Optional emoji: <span role="img" aria-label="sparkles">✨</span> */}
        </Text>

        <Text
          fontSize={["lg", "xl", "2xl"]}
          fontWeight="extrabold"
          fontFamily="'Pacifico', cursive" // different font for Super Stan
          color="pink.300"
          textTransform="uppercase"
          letterSpacing="wider"
        >
          
        </Text>
      </Box>

      {/* Carnival Lights Animation (positioned at bottom of navbar) */}
      <Box
        position="absolute"
        left={0}
        bottom={0}
        w="100%"
        h="8px"
        display="flex"
        justifyContent="space-between"
        px={6}
      >
        {Array.from({ length: 25 }).map((_, i) => (
          <Light
            key={i}
            w="10px"
            h="10px"
            borderRadius="50%"
            bg="yellow.300"
            animate={{
              opacity: [0.2, 1, 0.2],
              scale: [1, 1.4, 1],
            }}
            transition={{
              duration: 1.2,
              repeat: Infinity,
              delay: i * 0.08,
            }}
          />
        ))}
      </Box>
    </Box>
  );
}
