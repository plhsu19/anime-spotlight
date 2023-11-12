import { Button, TextField } from '@mui/material';

const handleSubmit = async (event) => {
  event.preventDefault();
  console.log('form submitted');
};

export default function AnimeForm() {
  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            id="outlined-required"
            label="Title"
            defaultValue="Hello World"
          />
        </div>
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
