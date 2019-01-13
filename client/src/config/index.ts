import * as yup from 'yup';

export type EnvVars = 'NODE_ENV' | 'API_ROOT' | 'PICTURE_ENDPOINT';

export const envDefaults = {
  API_ROOT: 'http://localhost:3001',
  PICTURE_ENDPOINT: 'http://localhost:8080'
};

const schema = yup.object({
  API_ROOT: yup
    .string()
    .required()
    .default(envDefaults.API_ROOT),
  NODE_ENV: yup.string().required(),
  PICTURE_ENDPOINT: yup
    .string()
    .required()
    .default(envDefaults.PICTURE_ENDPOINT)
});

export const { API_ROOT, NODE_ENV, PICTURE_ENDPOINT } = schema.validateSync(
  schema.cast(process.env)
);
