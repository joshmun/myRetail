# Mun's myRetail

This is an end-to-end Proof-of-Concept RESTful Products Data Service API that aggregates product data from a local datastore and an external RedSky API, then returns it as JSON to the caller.

https://mun-myretail.herokuapp.com/

## Getting Started
```
git clone https://github.com/joshmun/myRetail.git
cd myRetail
npm install
```

### Connecting to the Database
Before you can:
```
npm run dev
```
This app requires a secret mongoURI to connect with the cloud-hosted database. Create an env.json file in the config folder and add in the mongoURI following this convention:
```
{
  "development": {
    "mongoURI": "your mongoURI login, password and link here"
  }
}

```

### Development
Then:
```
npm run dev
```

### Testing
Kill all node processes, then:
```
npm test
```

## PUT Request Example
```
http://localhost:5000/products/13860428?value=42.42&currency_code=USD
```
