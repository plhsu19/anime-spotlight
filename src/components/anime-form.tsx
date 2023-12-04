import React, { useState, FormEvent, useMemo } from 'react';
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
import { ErrorsState } from '@/types/components/anime-form-types';
import utilStyles from '@/styles/utils.module.css';
import animeFormStyles from '@/styles/components/AnimeForm.module.css';

export default function AnimeForm({
  submitForm,
  dateFormat = 'YYYY-MM-DD'
}: {
  submitForm: (fields: AnimeFields) => Promise<void>;
  dateFormat?: string;
}) {
  const [fields, setFields] = useState<AnimeFields>({
    title: '',
    enTitle: '',
    description: '',
    rating: 10,
    startDate: dayjs().format(dateFormat),
    endDate: null,
    subtype: Subtype.TV,
    status: Status.FINISHED,
    posterImage: '',
    coverImage: '',
    episodeCount: null,
    categories: ['']
  });
  const [preStartDate, setPreStartDate] = useState(fields.startDate);
  const [errors, setErrors] = useState<ErrorsState>({});
  const [joiSchema, setJoiSchema] = useState();

  if (
    fields.startDate !== 'Invalid Date' &&
    preStartDate !== fields.startDate
  ) {
    setFields({ ...fields, endDate: fields.startDate });
    setPreStartDate(fields.startDate);
  }

  const schema = Joi.object({
    title: Joi.string().trim().max(256).required(),
    enTitle: Joi.string().trim().max(256).allow(null).allow('').required(),
    description: Joi.string().trim().max(2000).required(),
    rating: Joi.number().min(0).max(10).required().prefs({ convert: false }),
    startDate: Joi.when('status', {
      is: Status.UPCOMING,
      then: Joi.date().iso().greater('now').required(),
      otherwise: Joi.date().iso().min('1900-1-1').max('now').required()
    }),
    endDate: Joi.when('status', {
      is: Status.FINISHED,
      then: Joi.date().iso().min(Joi.ref('startDate')).max('now').required(),
      otherwise: Joi.valid(null).required()
    }),
    subtype: Joi.string()
      .valid(...Object.values(Subtype))
      .required(),
    status: Joi.string()
      .valid(...Object.values(Status))
      .required(),
    posterImage: Joi.string().uri().required(),
    coverImage: Joi.string().uri().allow(null).allow('').required(),
    episodeCount: Joi.number()
      .integer()
      .min(1)
      .allow(null)
      .required()
      .prefs({ convert: false }),
    categories: Joi.array()
      .unique()
      .items(Joi.string().trim().min(1).max(256).required())
      .min(1)
      .required()
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

  const handleTextFieldBlur = (
    event: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>
  ): void => {
    const { name, value } = event.target;
    setFields({
      ...fields,
      [name]: value.trim()
    });
    validateField(name);
  };

  const validateField = (name: string): void => {
    const fieldSchema = Joi.object({ [name]: schema.extract(name) });
    const { error } = fieldSchema.validate({ [name]: fields[name] });
    if (error) {
      console.log(error.details[0]);
      setErrors({
        ...errors,
        [name]: error.details[0].message
      });
    } else {
      const copiedErrors = { ...errors };
      delete copiedErrors[name];
      setErrors(copiedErrors);
    }
  };

  const handleDateChange = (name: string, value: dayjs.Dayjs | null): void => {
    setFields({
      ...fields,
      [name]: !!value ? value.format(dateFormat) : null
    });
  };

  const clearDate = (name: string): void => {
    setFields({
      ...fields,
      [name]: null
    });
  };

  const endDateValue = (): dayjs.Dayjs | null => {
    if (fields.status !== Status.FINISHED) return null;
    return fields.endDate ? dayjs(fields.endDate, dateFormat) : null;
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
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    submitForm({
      ...fields,
      title: fields.title.trim(),
      enTitle: !fields.enTitle ? fields.enTitle : fields.enTitle.trim(),
      posterImage: fields.posterImage.trim(),
      coverImage: !fields.coverImage
        ? fields.coverImage
        : fields.coverImage.trim(),
      description: fields.description.trim()
    });
  };

  // TODO: validate function

  return (
    <form className={animeFormStyles.form} onSubmit={handleSubmit}>
      <div className={animeFormStyles.fieldsContainer}>
        <TextField
          className={animeFormStyles.titleInput}
          required
          error={!!errors.title}
          id="title-input"
          label="Title"
          name="title"
          value={fields.title}
          onChange={handleChange}
          onBlur={handleTextFieldBlur}
          helperText={errors.title}
        />
        <TextField
          className={animeFormStyles.titleInput}
          error={!!errors.enTitle}
          id="en-title-input"
          label="English Title"
          name="enTitle"
          value={fields.enTitle ?? ''}
          onChange={handleChange}
          onBlur={handleTextFieldBlur}
          helperText={errors.enTitle}
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
          value={endDateValue()}
          minDate={dayjs(fields.startDate, dateFormat)}
          disabled={fields.status !== Status.FINISHED}
          onChange={(value, context) => {
            handleDateChange('endDate', value);
          }}
          slotProps={{
            field: {
              clearable: true,
              onClear: () => {
                clearDate('endDate');
              }
            },
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
          onBlur={handleTextFieldBlur}
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
          onBlur={handleTextFieldBlur}
          error={!!errors.posterImage}
          helperText={errors.posterImage}
        />
        <TextField
          className={animeFormStyles.urlInput}
          id="cover-image-url-input"
          label="Cover Image URL"
          name="coverImage"
          type="url"
          value={fields.coverImage ?? ''}
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
                    onBlur={handleTextFieldBlur}
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
          onBlur={handleTextFieldBlur}
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
