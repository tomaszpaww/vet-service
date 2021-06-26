import {inject, lifeCycleObserver, LifeCycleObserver} from '@loopback/core';
import {juggler} from '@loopback/repository';

const config = {
  name: 'postgres_db',
  connector: 'postgresql',
  url: '',
  host: 'localhost',
  port: 5432,
  user: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: 'vet_service'
};

// Observe application's life cycle to disconnect the datasource when
// application is stopped. This allows the application to be shut down
// gracefully. The `stop()` method is inherited from `juggler.DataSource`.
// Learn more at https://loopback.io/doc/en/lb4/Life-cycle.html
@lifeCycleObserver('datasource')
export class PostgresDbDataSource extends juggler.DataSource
  implements LifeCycleObserver {
  static dataSourceName = 'postgres_db';
  static readonly defaultConfig = config;

  constructor(
    @inject('datasources.config.postgres_db', {optional: true})
    dsConfig: object = config,
  ) {
    super(dsConfig);
  }
}
