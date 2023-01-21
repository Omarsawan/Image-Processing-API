# Image Processing API
 Application to process images and resize them

## Scripts
 - To build the project and convert typescript into javascript: 
 
 ```bash
npm run build
```

 - To run test cases: 
 
 ```bash
npm run test
```



 - To run the server: 
 
 ```bash
npm run start
```



 - To run linter to fix errors: 
 
 ```bash
npm run lint
```



 - To run prettier and format javascript files: 
 
 ```bash
npm run prettierjs
```





 - To run prettier and format typescript files: 
 
 ```bash
npm run prettierts
```

## API

#### GET /resize?filename=fjord&width=50&height=300
- width is optional number (integer)
- height is optional number (integer)
- filename is required string for a file that should exists in the project
- The API just returns the image if width and height are not given
- The API returns the image resized with width and height if they are given


