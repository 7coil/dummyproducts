# Dummy Products

"Example Company XYZ's" new frontend website, written in TypeScript/ReactJS.

## Development Instructions

### Baremetal

Please use NodeJS 16 (LTS) to run this project.
You can install this by running `pacman -S nodejs-lts-gallium` on Arch Linux,
or visit https://nodejs.org/ for more information.

You will also need the Yarn package manager to run this project.
You can install this with `sudo` or Windows Administrator permissions with
the `npm i -g yarn` command.

Within the project directory...

1. Install dependencies with `yarn`
2. Run `yarn dev` to start a development server at http://127.0.0.1:8080/
3. Run tests with `yarn test`
4. Build your production copy with `yarn build`
5. Self-test your production copy with `yarn start`

### Docker

This Dockerfile is for development purposes only, and not for production use.
Deployment of this website should be done by serving the `dist` folder on a static webserver,
such as CI/CD providers like Cloudflare Pages, GitHub Pages or Netlify.

1. `docker compose up`
2. View the development server at http://127.0.0.1:8080/

## Progress

```ts
// Progress would usually be in a Kanban style board; this is just a simple tracker for myself.
```

- [x] Homepage
- [x] Products
  - [x] Viewing a list
  - [x] Sorting Products
  - [x] Search for Products
  - [x] Filter products by category
  - [x] Deleting Products

## Additional Notes

In a real scenario, the weirdness of the product name and descriptions, such as potential encoding issues,
incorrect use of casing and spelling mistakes would be brought up to a supervisor.

## Licencing

Copyright (c) "Example Company XYZ" 2022.  
All rights reserved.
