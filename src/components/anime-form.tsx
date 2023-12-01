import { useState } from 'react';
import dayjs from 'dayjs';
import Joi from 'joi';
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
import utilStyles from '@/styles/utils.module.css';
import animeFormStyles from '@/styles/components/AnimeForm.module.css';

export default function AnimeForm({ dateFormat = 'YYYY-MM-DD' }) {
  //   {
  //   submitForm,
  //   anime
  // }: {
  //   submitForm: (fields: AnimeFields) => void;
  //   anime?: Anime;
  // }
  const [fields, setFields] = useState<AnimeFields>({
    title: '',
    enTitle: '',
    description: '',
    rating: 10,
    startDate: dayjs().format(dateFormat),
    endDate: null,
    subtype: Subtype.TV,
    status: Status.CURRENT,
    posterImage: '',
    coverImage: '',
    episodeCount: null,
    categories: ['']
  });
  const [preStartDate, setPreStartDate] = useState(fields.startDate);
  const [errors, setErrors] = useState({});

  if (
    fields.startDate !== 'Invalid Date' &&
    preStartDate !== fields.startDate
  ) {
    setFields({ ...fields, endDate: fields.startDate });
    setPreStartDate(fields.startDate);
  }

  const schema = Joi.object({
    title: Joi.string().max(256).required(),
    enTitle: Joi.string().max(256),
    description: Joi.string().max(2000).required(),
    rating: Joi.number().min(0).max(100).required().prefs({ convert: false }),
    startDate: Joi.date().iso().min('1-1-1900').required(),
    endDate: Joi.date().iso().min('1-1-1900'),
    subtype: Joi.string().required(),
    status: Joi.string().required(),
    posterImage: Joi.string().uri().required(),
    coverImage: Joi.string().uri(),
    episodeCount: Joi.number()
      .integer()
      .min(1)
      .required()
      .prefs({ convert: false }),
    categories: Joi.array().unique().items(Joi.string())
  });

  const isDisabled = (): boolean => {
    return false;
  };

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
    <form className={animeFormStyles.form} onSubmit={handleSubmit}>
      <div className={animeFormStyles.fieldsContainer}>
        <TextField
          className={animeFormStyles.titleInput}
          required
          id="title-input"
          label="Title"
          name="title"
          value={fields.title}
          onChange={handleChange}
          // helperText="Incorrect entry."
        />
        <TextField
          className={animeFormStyles.titleInput}
          id="en-title-input"
          label="English Title"
          name="enTitle"
          value={fields.enTitle}
          onChange={handleChange}
        />
      </div>
      <div className={animeFormStyles.fieldsContainer}>
        <span className={animeFormStyles.inputLabel}>Rating: </span>
        <span className={animeFormStyles.ratingNumber}>{fields.rating}</span>
        <Rating
          name="rating"
          value={fields.rating}
          onChange={handleChange}
          size="large"
          max={10}
          precision={0.5}
        />
      </div>
      <div className={animeFormStyles.fieldsContainer}>
        <DatePicker
          label="Start Date *"
          value={fields.startDate ? dayjs(fields.startDate, dateFormat) : null}
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
      <div className={animeFormStyles.fieldsContainer}>
        <FormControl className={animeFormStyles.selectContainer}>
          <InputLabel id="subtype-label">Type *</InputLabel>
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
        <FormControl className={animeFormStyles.selectContainer}>
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
          className={animeFormStyles.episodeCountInput}
          value={fields.episodeCount ?? ''}
          onChange={handleChange}
        />
      </div>
      <div className={animeFormStyles.fieldsContainer}>
        <TextField
          required
          className={animeFormStyles.urlInput}
          id="poster-image-url-input"
          label="Poster Image URL"
          name="posterImage"
          type="url"
          value={fields.posterImage}
          onChange={handleChange}
        />
        <TextField
          className={animeFormStyles.urlInput}
          id="cover-image-url-input"
          label="Cover Image URL"
          name="coverImage"
          type="url"
          value={fields.coverImage}
          onChange={handleChange}
        />
      </div>
      <div className={animeFormStyles.categoriesContainer}>
        <label
          htmlFor="categories-container"
          className={animeFormStyles.inputLabel}
        >
          Categories:{' '}
        </label>
        {fields.categories.length > 0 && (
          <div className={animeFormStyles.categories}>
            {fields.categories.map((category, index) => {
              return (
                <div
                  id="category-container"
                  key={index}
                  className={animeFormStyles.category}
                >
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
          </div>
        )}
        <IconButton
          aria-label="add a new category"
          color="success"
          size="small"
          onClick={(event) => {
            addEmptyCategory();
          }}
        >
          <AddCircleOutlineIcon fontSize="medium" />
        </IconButton>
      </div>
      <div className={animeFormStyles.fieldsContainer}>
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
      <div className={animeFormStyles.submitBtnContainer}>
        <Button
          type="submit"
          disabled={isDisabled()}
          variant="outlined"
          size="large"
        >
          Submit
        </Button>
      </div>
    </form>
  );
}
