import * as Yup from 'yup';
import { formErrors } from '../../../helpers';

const validationSchema = Yup.object().shape({
  collectionImage: Yup.string().required(formErrors.errorMessages.required),
  name: Yup.string().required(formErrors.errorMessages.required),
  royaltyAmount: Yup.string(),
  royaltyAddressReceiver: Yup.string(),
  description: Yup.string(),
  itemName: Yup.string().required(formErrors.errorMessages.required),
  itemSupply: Yup.string().required(formErrors.errorMessages.required),
  itemLink: Yup.string(),
  itemDescription: Yup.string(),
  // item: Yup.array().required(formErrors.errorMessages.required),

  // cnpj: Yup.string()
  //   .required(formErrors.errorMessages.required)
  //   .max(14, formErrors.errorMessages.cnpjMustBeLess),
  // razao_social: Yup.string().required(formErrors.errorMessages.required),
  // fantasia: Yup.string().required(formErrors.errorMessages.required),
  // num_empregados: Yup.number()
  //   .required(formErrors.errorMessages.required)
  //   .min(1, formErrors.errorMessages.mustBeGreater)
  //   .max(9999, formErrors.errorMessages.mustBeLess),
  // dt_ano_inicio: Yup.string().required(formErrors.errorMessages.required),
  // master: Yup.string(),
  // bool_master: Yup.boolean(),
  // inscricao_estadual: Yup.number(),
  // segmento: Yup.number().required(formErrors.errorMessages.required),
  // setor: Yup.number().required(formErrors.errorMessages.required),
  // tipo_industria: Yup.number().required(formErrors.errorMessages.required),
  // grupo: Yup.string().required(formErrors.errorMessages.required),
  // projeto: Yup.string().required(formErrors.errorMessages.required),
});

// async function validate({ bool_master, master }) {
//   if (!master && !bool_master) {
//     return { master: formErrors.errorMessages.required };
//   }
// }

export default {
  // validate,
  validationSchema,
  validateOnBlur: false,
  validateOnChange: false,
};
