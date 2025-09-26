# Github Explorer

<p align="center">
  <img src="https://github.com/user-attachments/assets/829aec44-738b-401b-ad14-fca2b01bf495" alt="Descrição" width="240"/>
</p>




A **React front-end application** that allows you to explore GitHub repositories and list their issues. This project was developed during the **GoStack Bootcamp** by **Rocketseat**.

## Features

- Search for any GitHub repository.
- Display a list of issues for the selected repository.
- Styled using **Styled Components**.
- Fetch data from the **GitHub API**.

## Technologies

- React
- Styled Components
- GitHub REST API

## Preview

<table>
  <tr>
    <td align="center">
              <img width="1280" height="922" alt="dashboard" src="https://github.com/user-attachments/assets/13e2fb6e-06fc-4d47-a774-9b4c10469a5c" />
    </td>
    <td align="center">
<img width="1280" height="922" alt="repository" src="https://github.com/user-attachments/assets/b6b92e3a-d27b-4184-b082-24128fcecef8" />
    </td>
      <tr>
      <tr >
    <td align="center">
<img width="1059" height="642" alt="search" src="https://github.com/user-attachments/assets/d7cf4946-17f5-43bc-803a-dc5af350487d" />
    </td>
  </tr>
</table>

## ToDo:

- [ ] Put starglazers in the sort script of the preview list
- [ ] Update 'li's on the preview list to have the 'added' class instead of their buttons
- [ ] Organize components

### Done:

- [x] Add the 'added' class to already added repositories in the preview list
- [x] Fix multiple additions of the same repository
- [x] Add button animation styling

## Usage

1. Type the name of a repository in the search bar.
2. Press Enter or click the search button.
3. Browse the list of issues for the selected repository.

## Installation

1. Clone this repository:
```bash
    git clone https://github.com/brit0dev/github-explorer.git
```

2. Install dependencies:
```bash
    pnpm
```

3. Start the development server:
```bash
    pnpm start
```

4. Open http://localhost:3000 to view the application in your browser.
