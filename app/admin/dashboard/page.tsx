"use client";

import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Spinner,
  Flex,
  Text,
} from "@chakra-ui/react";

interface Registration {
  name: string;
  email: string;
  phone: string;
  location: string;
  timestamp: string;
  code?: string;
}

export default function AdminPage() {
  const [registrations, setRegistrations] = useState<Registration[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRegistrations = async () => {
      try {
        const res = await fetch("/api/admin/registrations");
        console.log("Admin GET /api/admin/registrations called");

        if (!res.ok) throw new Error("Failed to fetch registrations");

        const data = await res.json();
        console.log("Registrations fetched:", data);

        // Support both raw array or {registrations: []} format
        const regs: Registration[] = Array.isArray(data)
          ? data
          : data.registrations || [];

        setRegistrations(regs);
      } catch (err: any) {
        console.error("Fetch error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchRegistrations();
  }, []);

  if (loading)
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Spinner size="xl" />
      </Flex>
    );

  if (error)
    return (
      <Flex minH="100vh" align="center" justify="center">
        <Text color="red.500">{error}</Text>
      </Flex>
    );

  return (
    <Box p={8} bg="gray.50" minH="100vh">
      <Heading mb={6} textAlign="center" color="pink.500">
        Tabata Festival Admin Dashboard
      </Heading>

      {registrations.length === 0 ? (
        <Text textAlign="center" color="gray.500">
          No registrations yet.
        </Text>
      ) : (
        <TableContainer bg="white" borderRadius="xl" p={4} boxShadow="md" overflowX="auto">
          <Table variant="striped" colorScheme="pink">
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Location</Th>
                <Th>Code</Th>
                <Th>Registration Time</Th>
              </Tr>
            </Thead>
            <Tbody>
              {registrations.map((reg, idx) => (
                <Tr key={idx}>
                  <Td>{reg.name}</Td>
                  <Td>{reg.email}</Td>
                  <Td>{reg.phone}</Td>
                  <Td>{reg.location}</Td>
                  <Td>{reg.code || "—"}</Td>
                  <Td>
                    {reg.timestamp
                      ? new Date(reg.timestamp).toLocaleString("en-US", {
                          dateStyle: "medium",
                          timeStyle: "short",
                        })
                      : "N/A"}
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      )}
    </Box>
  );
}
