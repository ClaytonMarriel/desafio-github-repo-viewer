import React from 'react';
import { Modal, Box, Typography, IconButton } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { closeModal } from '../../store/modalSlice';
import { RootState } from '../../store';

export default function RepositoryModal() {
  const dispatch = useDispatch();
  const { isOpen, repository } = useSelector((state: RootState) => state.modal);

  if (!repository) return null;

  const handleClose = () => {
    dispatch(closeModal());
  };

  return (
    <Modal
      open={isOpen}
      onClose={handleClose}
      aria-labelledby="repository-modal-title"
      aria-describedby="repository-modal-description"
    >
      <Box sx={{ p: 4, bgcolor: 'background.paper', borderRadius: 1, boxShadow: 24, maxWidth: 600, mx: 'auto', mt: 8 }}>
        {repository && (
          <>
            <Box display="flex" alignItems="center" mb={2}>
              <Box
                component="img"
                src={repository.owner.avatarUrl}
                alt={repository.owner.login}
                sx={{ width: 120, height: 120, borderRadius: '50%', mr: 2 }}
              />
              <Typography variant="h5" component="h2">
                {repository.name}
              </Typography>
            </Box>
            <Typography variant="body1" id="repository-modal-description">
              {repository.description}
            </Typography>
            <Box mt={2}>
              <Typography variant="body2">
                <strong>Stars:</strong> {repository.stargazerCount}
              </Typography>
              <Typography variant="body2">
                <strong>Forks:</strong> {repository.forkCount}
              </Typography>
              <Typography variant="body2"><strong>Commits:</strong> {repository.defaultBranchRef?.target.history.totalCount}</Typography>
              <Typography variant="body2"><strong>Open Issues:</strong> {repository.issues?.totalCount}</Typography>
              <Typography variant="body2"><strong>Open Pull Requests:</strong> {repository.pullRequests?.totalCount}</Typography>
            </Box>
          </>
        )}
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={{ position: 'absolute', top: 8, right: 8 }}
        >
          &times;
        </IconButton>
      </Box>
    </Modal>
  );
};