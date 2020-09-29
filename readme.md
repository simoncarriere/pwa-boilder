# Introduction

Progessive web apps enable powerful ways of integrating native like features into our websites. As these will become more common practice, this project is meant to accelerate the process of creating your first service worker and initializing dynamic and static cache stores.

# Setup - Open using http
// Manifest.json and sw.js should always be in project root

1. Update assets in Manifest.json
- Update Name and theme colours
- Populate the img/icons folder with icons and link in array

2. sw.js
- Update assets array (line3) with main files and assets for func staticCacheName
- Dynamic cache will save a maximum of 15 files

3. Audit
- Chrome → Inspect → Lighthouse -> Generate Report


# Testing PWA
Install the app in home screen:

In Chrome for desktop
- right upper menu → "More tools" → "Add to desktop"


In Chrome for mobile
- right upper menu → "Add to home screen"
- If Audit passes, mobile users will be prompted with "Add to homescreen" invite


# Todo
- Fix cache versionning 
- Push Notification Barebones
