import { mockEnvs } from "@tests/__mocks__/envs.mock";

process.env.MONGO_HOST = mockEnvs.MONGO_HOST;
process.env.MONGO_PORT = mockEnvs.MONGO_PORT;
process.env.MONGO_USER = mockEnvs.MONGO_USER;
process.env.MONGO_PASS = mockEnvs.MONGO_PASS;
process.env.MONGO_DB_NAME = mockEnvs.MONGO_DB_NAME;
process.env.MONGO_AUTH_SOURCE = mockEnvs.MONGO_AUTH_SOURCE;
process.env.JWT_SECRET = mockEnvs.JWT_SECRET;
process.env.EMAIL = mockEnvs.EMAIL;
process.env.EMAIL_PASS = mockEnvs.EMAIL_PASS;
process.env.CLOUD_PATH = mockEnvs.CLOUD_PATH;
