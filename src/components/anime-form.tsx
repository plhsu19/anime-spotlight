import { useState } from 'react';
import dayjs from 'dayjs';
import {
  Button,
  TextField,
  Rating,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  SelectChangeEvent
} from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Anime, AnimeFields, Subtype, Status } from '@/types/anime-types';

export default function AnimeForm({ dateFormat = 'YYYY-MM-DD' }) {
  //   {
  //   submitForm,
  //   anime
  // }: {
  //   submitForm: (fields: AnimeFields) => void;
  //   anime?: Anime;
  // }
  const [fields, setFields] = useState({
    title: '',
    enTitle: '',
    description: '',
    rating: 10,
    startDate: null,
    endDate: null,
    subtype: '',
    status: '',
    posterImage: '',
    coverImage: '',
    episodeCount: null,
    categories: []
  });

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.SyntheticEvent
      | SelectChangeEvent<string>,
    value?: number | null
  ): void => {
    setFields({
      ...fields,
      [event.target.name]: value !== undefined ? value : event.target.value
    });
  };

  const handleDateChange = (name: string, value: dayjs.Dayjs | null): void => {
    setFields({
      ...fields,
      [name]: !!value ? value.format(dateFormat) : null
    });
  };

  // TODO: handleSubmit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log('form submitted');
    console.log(fields);
  };

  // TODO: validate

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            required
            id="title-input"
            label="Title"
            name="title"
            value={fields.title}
            onChange={handleChange}
          />
          <TextField
            id="en-title-input"
            label="English Title"
            name="enTitle"
            value={fields.enTitle}
            onChange={handleChange}
          />
        </div>
        <div>
          <Rating
            name="rating"
            value={fields.rating}
            onChange={handleChange}
            max={10}
            precision={0.5}
          />
          <span>{fields.rating}</span>
        </div>
        <div>
          <DatePicker
            label="Start Date *"
            // minDate={dayjs('1888-01-01', dateFormat)}
            // maxDate={dayjs()}
            value={
              fields.startDate ? dayjs(fields.startDate, dateFormat) : null
            }
            onChange={(value, context) => {
              console.log(value);
              console.log(context);
              handleDateChange('startDate', value);
            }}
            slotProps={{
              textField: {
                helperText: 'MM/DD/YYYY'
              }
            }}
          />
          <DatePicker
            label="End Date"
            // minDate={dayjs('1888-01-01', dateFormat)}
            // maxDate={dayjs()}
            value={fields.endDate ? dayjs(fields.endDate, dateFormat) : null}
            onChange={(value, context) => {
              handleDateChange('endDate', value);
            }}
            slotProps={{
              textField: {
                helperText: 'MM/DD/YYYY'
              }
            }}
          />
        </div>
        <div>
          {/* TODO: convert m(margin) and minWidth to class in CSS */}
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="subtype-label">Subtype *</InputLabel>
            <Select
              required
              labelId="subtype-label"
              id="subtype"
              name="subtype"
              value={fields.subtype}
              label="Subtype *"
              onChange={(event) => {
                handleChange(event);
              }}
            >
              {Object.values(Subtype).map((subtype, index) => (
                <MenuItem key={index} value={subtype}>
                  {subtype}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="status-label">Status *</InputLabel>
            <Select
              required
              labelId="status-label"
              id="status"
              name="status"
              value={fields.status}
              label="Status *"
              onChange={(event) => {
                handleChange(event);
              }}
            >
              {Object.values(Status).map((status, index) => (
                <MenuItem key={index} value={status}>
                  {status}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div>
          <TextField
            required
            id="poster-image-url-input"
            label="Poster Image URL"
            name="posterImage"
            type='url'
            fullWidth
            value={fields.posterImage}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            required
            id="description-input"
            label="Description"
            name="description"
            fullWidth
            multiline
            rows={7}
            value={fields.description}
            onChange={handleChange}
          />
        </div>
        <Button type="submit">Add</Button>
      </form>
    </>
  );
}
