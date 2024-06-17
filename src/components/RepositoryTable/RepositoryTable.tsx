import React, { useState } from 'react';
import { useQuery, gql } from '@apollo/client';
import { Table, TableBody, TableCell, TableHead, TableRow, TextField, Button, Typography, CircularProgress, Box } from '@mui/material';
import { useDispatch } from 'react-redux';
import { openModal } from '../../store/modalSlice';
import { Repository } from '../../types/Repository';
import VisibilityIcon from '@mui/icons-material/Visibility';

const GET_REPOSITORIES = gql`
  query GetRepositories($query: String!) {
    search(query: $query, type: REPOSITORY, first: 10) {
      edges {
        node {
          ... on Repository {
            id
            name
            owner {
              login
              avatarUrl
            }
            description
            stargazerCount
            forkCount
            defaultBranchRef {
              target {
                ... on Commit {
                  history {
                    totalCount
                  }
                }
              }
            }
            issues(states: OPEN) {
              totalCount
            }
            pullRequests(states: OPEN) {
              totalCount
            }
          }
        }
      }
    }
  }
`;

export default function RepositoryTable() {
  const [query, setQuery] = useState('');
  const { data, loading, error } = useQuery(GET_REPOSITORIES, {
    variables: { query },
    skip: !query,
  });
  const dispatch = useDispatch();

  const handleOpenModal = (repository: Repository) => {
    dispatch(openModal(repository));
  };

  return (
    <>
      <TextField
        label="Search Repositories"
        variant="outlined"
        fullWidth
        margin="normal"
        onChange={(e) => setQuery(e.target.value)}
      />

      {loading && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
          <CircularProgress />
        </div>
      )}
      {error && <Typography>Error: {error.message}</Typography>}
      {!loading && data && data.search.edges.length === 0 && (
        <Box display="flex" justifyContent="center">
          <Typography>No repositories found</Typography>
        </Box>
      )}
      {!loading && data && data.search.edges.length > 0 && (

        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Owner</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Stars</TableCell>
              <TableCell>Forks</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.search.edges.map(({ node }: { node: Repository }) => (
              <TableRow key={node.id}>
                <TableCell>{node.name}</TableCell>
                <TableCell>{node.owner.login}</TableCell>
                <TableCell>{node.description}</TableCell>
                <TableCell>{node.stargazerCount}</TableCell>
                <TableCell>{node.forkCount}</TableCell>
                <TableCell>
                  {/* <Button variant="contained" color="primary" > */}
                    <VisibilityIcon sx={{ ml: 1, color:'#1b78a0', cursor:'pointer' }} onClick={() => handleOpenModal(node)} titleAccess='View Details' />
                  {/* </Button> */}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </>
  );
};
