// src/components/UserList.tsx
import React, { useEffect, useState, useMemo } from 'react';
import { User, SortOption } from '../types/userType';
import {
  Container,
  TextField,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Typography,
  Pagination,
  FormControl,
  InputLabel,
  Box,
} from '@mui/material';

const UserList = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [sortOption, setSortOption] = useState<SortOption>("name");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const itemsPerPage = 5;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const data:User[]= await response.json();
        console.log("data===>>>",data);
        let userData = data.map(user => ({ ...user, role: "User" }));
        setUsers(userData);
      } catch (err) {
        setError("Failed to load users");
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const filteredUsers = useMemo(() => {
    let filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.role.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "name") {
      filtered = filtered.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sortOption === "email") {
      filtered = filtered.sort((a, b) => a.email.localeCompare(b.email));
    }

    return filtered;
  }, [users, searchTerm, sortOption]);

  const paginatedUsers = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredUsers.slice(start, start + itemsPerPage);
  }, [filteredUsers, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);

  if (loading) return <Typography>Loading...</Typography>;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>User List</Typography>
      
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <TextField
          label="Search by name or role"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          size="small"
        />
        
        <FormControl variant="outlined" size="small">
          <InputLabel>Sort By</InputLabel>
          <Select
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value as SortOption)}
            label="Sort By"
          >
            <MenuItem value="name">Name</MenuItem>
            <MenuItem value="email">Email</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <List>
        {paginatedUsers.map((user) => (
          <ListItem key={user.id} divider>
            <ListItemText
              primary={user.name}
              secondary={`${user.email} - Role: ${user.role}`}
            />
          </ListItem>
        ))}
      </List>

      <Box display="flex" justifyContent="center" mt={3}>
        <Pagination
          count={totalPages}
          page={currentPage}
          onChange={(event, value) => setCurrentPage(value)}
          color="primary"
        />
      </Box>
    </Container>
  );
};

export default UserList;
