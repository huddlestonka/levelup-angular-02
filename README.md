# Artist Dashboard

This project was generated using [Nx](https://nx.dev).

![AppScreenShot](./apps/dashboard/src/assets/screenshots/artist-screenshot.png)

## App Description

This is the 2nd of 8 Accelerated Angular LevelUp Applications.
It aims to show a more complex feature set/data model for a fully reactive, well architected Angular application.

Specifically, this dashboard app features CRUD functionality on an Artist entity -

```json
  "artists": [
    {
      "id": "56789f40-b0fb-4aa6-8e88-376b4edfm8he",
      "title": "Twenty One Pilots",
      "genre": "Alternative hip hop",
      "yearsActive": "2009-present",
      "albums": [
        {
          "id": "56789f40-b0fb-4aa6-4e88-376b4edfm8he",
          "title": "Twenty One Pilots",
          "year": "2009",
          "awards": [
            "Not yet"
          ],
          "songs": [
            "Fall Away",
            "Taxi Cab",
            "Implicit Demand for Proof"
          ]
        },
      ]
    }
```

There is an additional feature involving the albums that allows users to dynamically create/delete album titles for any given artist that has albums.

## See It Live

[Visit Artist Dashboard](https://levelup-angular-02-artists.surge.sh/)

## Getting Started

Run `npm install`.

## Development server

Run `npm run serve:all` for a dev server and to run the json-server api. Navigate to http://localhost:4200/. The app will automatically reload if you change any of the source files.

## Build

Run `ng build dashboard` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Understand your workspace

Run `nx dep-graph` to see a diagram of the dependencies of your projects.
