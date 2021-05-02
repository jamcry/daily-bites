# 🍕 Daily Bites

Progressive Web App for tracking diet and daily food nutrition consumption data. It can be also used as calorie counter. It logs macronutrients and calories data.

## 🌐 Live Version

- https://confident-kirch-1caa58.netlify.app/

## Features

- 📱 Progressive Web App (can be downloaded as an app)
- 🌙 Dark Mode
- 🔓 No authentication (uses localStorage for storing data)
- ⬇️ Ability to export/import user data as `.json`

### ☑️ Todo

- [ ] Improve state manamagement by refactoring related code using `Context` and reducer
- [ ] In entry logs, keep pointers (probably id) to related entries, instead of keeping a copy of the entry inside every log instance (see `EntryLog` interface definition)
- [ ] Make daily entry log list max height dynamic
- [ ] Implement a system to show alerts when there are app version updates
- [ ] Fix accesibility issues (can be seen using Lighthouse)
