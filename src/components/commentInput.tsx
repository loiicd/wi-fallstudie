// CommentInput.tsx
import React from 'react';
import { Input, Grid, Button } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

interface CommentInputProps {
  commentContent: string;
  setCommentContent: (value: string) => void;
  handleComment: (content: string) => void;
  commentSaving: boolean;
  resetInput: () => void;
}

const CommentInput: React.FC<CommentInputProps> = ({
  commentContent,
  setCommentContent,
  handleComment,
  commentSaving,
  resetInput,
}) => {
  return (
    <>
      <Input
        placeholder={'Kommentar'}
        multiline
        rows={4}
        fullWidth
        sx={{ padding: 2 }}
        value={commentContent}
        onChange={(e) => setCommentContent(e.target.value)}
        onSubmit={() => handleComment(commentContent)}
      />
      <Grid container justifyContent={'flex-end'} sx={{ marginBottom: 2, marginTop: 1 }}>
        <Grid item>
          <Button onClick={resetInput}>Abbrechen</Button>
        </Grid>
        <Grid item>
          <LoadingButton loading={commentSaving} onClick={() => handleComment(commentContent)}>Senden</LoadingButton>
        </Grid>
      </Grid>
    </>
  );
};

export default CommentInput;