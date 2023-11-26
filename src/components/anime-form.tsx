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
  SelectChangeEvent,
  IconButton
} from '@mui/material';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import RemoveCircleOutlineIcon from '@mui/icons-material/RemoveCircleOutline';
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
    categories: ['']
  });
  const [preStartDate, setPreStartDate] = useState(fields.startDate);

  if (
    fields.startDate !== 'Invalid Date' &&
    preStartDate !== fields.startDate
  ) {
    setFields({ ...fields, endDate: fields.startDate });
    setPreStartDate(fields.startDate);
  }

  const handleChange = (
    event:
      | React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      | React.SyntheticEvent
      | SelectChangeEvent<string>,
    value?: number | null
  ): void => {
    if (event.target.name === 'episodeCount') {
      setFields({
        ...fields,
        [event.target.name]: !Number.isNaN(parseInt(event.target.value, 10))
          ? parseInt(event.target.value, 10)
          : null
      });
    } else {
      setFields({
        ...fields,
        [event.target.name]: value !== undefined ? value : event.target.value
      });
    }
  };

  const handleDateChange = (name: string, value: dayjs.Dayjs | null): void => {
    setFields({
      ...fields,
      [name]: !!value ? value.format(dateFormat) : null
    });
  };

  const handleCategoryChange = (
    idx: number,
    event?: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const updatedCategories = [...fields.categories];
    if (event === undefined) {
      updatedCategories.splice(idx, 1);
    } else {
      updatedCategories[idx] = event.target.value;
    }
    setFields({
      ...fields,
      categories: updatedCategories
    });
  };

  const addEmptyCategory = (): void => {
    const updatedCategories = [...fields.categories, ''];
    setFields({
      ...fields,
      categories: updatedCategories
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
            value={
              fields.startDate ? dayjs(fields.startDate, dateFormat) : null
            }
            onChange={(value, context) => {
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
            minDate={dayjs(fields.startDate, dateFormat)}
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
          {/* TODO: convert m(margin) and minWidth to the class in CSS */}
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
          <TextField
            id="episode-count-input"
            label="Episode Count"
            name="episodeCount"
            type="number"
            value={fields.episodeCount ?? ''}
            onChange={handleChange}
          />
        </div>
        <div>
          <TextField
            required
            id="poster-image-url-input"
            label="Poster Image URL"
            name="posterImage"
            type="url"
            fullWidth
            value={fields.posterImage}
            onChange={handleChange}
          />
          <TextField
            id="cover-image-url-input"
            label="Cover Image URL"
            name="coverImage"
            type="url"
            fullWidth
            value={fields.coverImage}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="categories-container">Categories: </label>
          {fields.categories.map((category, index) => {
            return (
              <div id="categories-container" key={index}>
                <TextField
                  id={`category-input-${index}`}
                  placeholder="New Category"
                  value={fields.categories[index]}
                  onChange={(event) => {
                    handleCategoryChange(index, event);
                  }}
                />
                <IconButton
                  aria-label="remove a category"
                  id={`remove-catogery-button-${index}`}
                  size="small"
                  color="error"
                  onClick={(event) => {
                    handleCategoryChange(index);
                  }}
                >
                  <RemoveCircleOutlineIcon fontSize="small" />
                </IconButton>
              </div>
            );
          })}
          <IconButton
            aria-label="add a new category"
            size="small"
            color="success"
            onClick={(event) => {
              addEmptyCategory();
            }}
          >
            <AddCircleOutlineIcon fontSize="small" />
          </IconButton>
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
        <Button type="submit">Submit</Button>
      </form>
    </>
  );
}
