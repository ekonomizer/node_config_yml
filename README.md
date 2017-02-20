# node-config-yml.
## Description.
Simple module for reading yml config in node js. Support inheritance in yml files

###Install module.
```
npm install node-config-yml
```

## Usage.

### Create yml config files
1)~/configs/prod/config.yml with data
```
#include ../dev/config.yml

some_data1: "prod"
some_data2: "some_data2"

```

2)~/configs/dev/config.yml with data

```
some_data1: "dev"
some_data3: "some_data3"
```

### Load config.
```
const cfg = require("node-config-yml");
const path = require("path");
cfg.load(path.join("/Users/someuser/configs", "prod", "config.yml"));
console.log(cfg.data);

return:
{
    some_data1: "prod",
    some_data3: "some_data3",
    some_data2: "some_data2"
}
```

## License MIT