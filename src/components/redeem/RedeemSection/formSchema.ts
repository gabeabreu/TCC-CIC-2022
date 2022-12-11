import * as Yup from 'yup';
import { formErrors } from '../../../helpers';

const validationSchema = Yup.object().shape({
  tokenHash: Yup.string().required(formErrors.errorMessages.required),
});

export default {
  validationSchema,
  validateOnBlur: false,
  validateOnChange: false,
};
