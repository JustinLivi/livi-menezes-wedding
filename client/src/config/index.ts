import * as yup from 'yup';

export type EnvVars = 'NODE_ENV' | 'API_ROOT' | 'PICTURE_ENDPOINT';

export const envDefaults = {
  REACT_APP_API_ROOT: 'http://localhost:3001',
  REACT_APP_PICTURE_ENDPOINT: 'http://localhost:8080'
};

const schema = yup.object({
  NODE_ENV: yup.string().required(),
  REACT_APP_API_ROOT: yup
    .string()
    .required()
    .default(envDefaults.REACT_APP_API_ROOT),
  REACT_APP_PICTURE_ENDPOINT: yup
    .string()
    .required()
    .default(envDefaults.REACT_APP_PICTURE_ENDPOINT)
});

export const {
  REACT_APP_API_ROOT,
  NODE_ENV,
  REACT_APP_PICTURE_ENDPOINT
} = schema.validateSync(schema.cast(process.env));
