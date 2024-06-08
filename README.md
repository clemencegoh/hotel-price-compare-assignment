# Hotel Currencies & Price Competitiveness task
Hotel Compare is a simplified app that compares prices for booking hotels between various booking sites, in your currency of choice.
The aim is to be as transparent as possible, with taxes and fees being shown where applicable. This isn't always possible as some only add the taxes and fees after booking, resulting in a discrepency of hotel rates.


## How to start
- either use `bun` or `yarn`, depending on choice of package manager
- if using `bun` and not installed, install it first:
  - curl https://bun.sh/install | bash
  - `bun install`
  - `bun dev`
- if using `yarn`
  - `yarn install`
  - `yarn dev`
- open `http://localhost:3000` to use the app


## Design & choice of technology
- Storing/persistence of Currency
  - Options here are to either put it in the URL (which makes sense for customers who come in via google search results)
  - Or to put it in a datastore with persistent storage in the browser like localstorage 
  - In this case I chose to go with the latter, using Zustand with persist middleware
- Routing:
  - With this being a small feature, I've opted to keep routing out of it, so it will be just a single page with dynamic changing parts.
- Design library
  - Tailwindcss + WindUI for copy & paste components, since choice of UI is freely given rather than having to implement from a figma or specific design


## Points of struggle
- Not exactly the best at determining what UI would look nice, so took awhile to settle on something


## Feature list
[x] Store/switch preferred currency, default to USD
[ ] Display list of hotels with details
[ ] Order list according to competitor rates
[ ] popover component for showing disclaimer on tax-inclusive