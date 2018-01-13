## Cloud Functions Config from GCS

Configure your cloud functions with a per-project (per-env) secret JSON file hosted on GCS

### Background
In the [GCP docs] it is implied that you should set up one project per environment: 

>We recommend that you spend some time planning your project IDs for manageability. A typical project ID naming convention might use the following pattern:
>
>[company tag]-[group tag]-[system name]-[environment (dev, test, uat, stage, prod)]

### Method
1. `cloud-functions-config` uses `process.env.GCP_PROJECT` to find out which bucket to fetch the config from.
2. once the `config.json` file has been fetched the JSON key-values are added to `process.env` under keys prefixed with `cfc__`).
### Prerequisites

- a GCS bucket named `[project-ID]-config-private` that your cloud functions has permission to read from (this should be enabled by default)
- a file `config.json` stored within the above bucket

### Usage

```bash
npm i cloud-functions-config
```

```javascript
const { initConfig, getConfig } = require('cloud-functions-config')

// initConfig will only requests config from GCS if none has been set yet
initConfig()
  .then(config => {
      // app logic
      console.log(config)
      // { token: 'xxxxxx', ... } 
    })
```


[GCP docs]: https://cloud.google.com/docs/enterprise/best-practices-for-enterprise-organizations




