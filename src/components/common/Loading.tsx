import { CircularProgress, Dialog, DialogContent } from '@mui/material';
import React from 'react';

interface ILoadingProps {
  message?: string;
}

export const Loading: React.FC<ILoadingProps> = ({ message }) => {
  return (
    <Dialog
      open={true}
      className='loading-dialog'
      aria-labelledby='loading'>
      <DialogContent>
        <div className='text-center'>
          <CircularProgress />
        </div>
        {message && <div className='loading'>{message}</div>}
      </DialogContent>
    </Dialog>
  );
};

export default Loading;
