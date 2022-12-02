export interface ErrorType {
  response: {
    status: number;
    details: { [key: string]: any };
    data: { [key: string]: any };
  };
}

export const errorMessages = {
  required: 'FORM_ERROR_REQUIRED',
  mustBeGreater: 'FORM_ERROR_MUST_BE_GREATER',
  mustBeLess: 'FORM_ERROR_MUST_BE_LESS',
};

function parseLabel(key: string): string {
  switch (key) {
    case 'cpf':
      return 'CPF';
    case 'password':
      return 'Senha';
    default:
      return key;
  }
}

function translateError(codes: string[], label: string) {
  if (codes.length < 1) return `Erro no ${label}`;

  switch (codes[0]) {
    case 'presence':
      return `Campo ${label} é necessário`;
    case 'absence':
      return `Campo ${label} inválido`;
    case 'format':
      return `Formato inválido do campo ${label}`;
    case 'uniqueness':
      return `${label} já em uso`;
    case 'numericality':
      return `${label} deve ser um número`;
    default:
      return `Erro no campo ${label}`;
  }
}

export function formatError(err: ErrorType) {
  if (!err.response) {
    return 'Falha na operação';
  }
  const error = err.response;

  // if (error.status === 400) {
  //   return "Requisição invalida";
  // }
  if (error.status === 401) {
    if (error.data.detail === 'No active account found with the given credentials') {
      return 'Credenciais incorretas';
    } else {
      return 'Não autorizado';
    }
  }
  if (error.status === 403) {
    return 'Não autorizado';
  }
  if (error.status === 404) {
    return 'Não encontrado';
  }
  if (error.status === 404) {
    return 'Erro na aplicação';
  }
  if (error.status === 429) {
    return 'Número de requisições excedidas';
  }

  if (error.status === 400) {
    if (error.data?.username[0] === 'usuario with this username already exists.')
      return 'Email já cadastrado';
    const details = error.data;
    const keys = Object.keys(details);

    if (keys.length > 0) {
      const [key] = keys;
      const label = parseLabel(key);

      return translateError(details[key], label);
    }
  }
  return 'Falha na operação';
}
