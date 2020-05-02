"use strict";

require('dotenv').config();

module.exports = {
  development: {
    database: 'team-239_dev',
    use_env_variable: 'DATABASE_URL_DEV',
    dialect: 'postgres'
  },
  test: {
    database: 'team-239_test',
    use_env_variable: 'DATABASE_URL_TEST',
    dialect: 'postgres',
    logging: false
  },
  production: {
    database: 'team-239_prod',
    use_env_variable: 'DATABASE_URL_PROD',
    dialect: 'postgres',
    dialectOptions: {
      ssl: true
    }
  }
};