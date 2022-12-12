import * as Yup from 'yup';
import { formErrors } from '../../../helpers';

const validationSchema = Yup.object().shape({
  name: Yup.string().required(formErrors.errorMessages.required),
  bio: Yup.string(),
  instagram: Yup.string(),
  twitter: Yup.string(),
  website: Yup.string(),
  discord: Yup.string(),
});

export default {
  // validate,
  validationSchema,
  validateOnBlur: false,
  validateOnChange: false,
};
