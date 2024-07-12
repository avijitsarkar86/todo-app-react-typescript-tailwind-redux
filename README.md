# Todo Application (React + Typescript + Redux Toolkit)

This is a Todo Application built with React, TypeScript, Redux Toolkit, Tailwind CSS, and integrates with a back-end API. The application allows users to add, edit, delete, and search todos. It also supports user authentication with JWT tokens and features animated modals and UI elements.

## Features

- Add, edit, delete todos
- Search todos by title or description
- Display todos based on status: All, Pending and Complete
- User authentication with JWT tokens
- Animated modals for adding and editing todos
- Tailwind CSS for styling
- Hover effects and animations for UI elements

## Prerequisites

- Node.js (v14 or later)
- npm or yarn

## Installation

1. Clone the repository:

```console
$ git clone https://github.com/your-username/todo-app.git
$ cd todo-app
```

2. Install the dependencies:

```console
$ npm install
```

or

```console
$ yarn install
```

## Configuration

Create a .env file in the root of the project and add your environment variables:

```console
REACT_APP_API_URL=http://your-api-url.com
```

## Running the Application

```console
$ npm install
```

or

```console
$ yarn install
```

The application will be available at http://localhost:3000.

## Project Structure

```java
.env
README.md
package.json
postcss.config.js
[public]
    ├── index.html
    ├── manifest.json.bak
    └── robots.txt
[src]
    ├── App.css
    ├── App.tsx
    ├── [components]
        ├── TodoItem.tsx
        └── [modals]
            └── TodoModal.tsx
    ├── index.css
    ├── index.tsx
    ├── logo.svg
    ├── [pages]
        ├── LoginPage.tsx
        ├── TodoPage.tsx
        └── [css]
            └── react-tabs-custom.css
    ├── react-app-env.d.ts
    ├── [redux]
        ├── [apis]
            ├── loginApi.ts
            └── todoApi.ts
        ├── [slices]
            ├── authSlice.ts
            ├── todoSlice.test.ts
            └── todoSlice.ts
        └── [store]
            └── index.ts
    ├── reportWebVitals.ts
    └── setupTests.ts
tailwind.config.js
tsconfig.json

```

## Components

- `TodoModal.tsx`: ModalComponent for adding/updating a new todo.
- `TodoItem.tsx`: Component for displaying a single todo item.
- `TodoPage.tsx`: Main page component that displays the todo list, search input, and handles modal states.
- `LoginPage.tsx`: Main page component that handles the login and registration of a new user.

## Redux Store

- `store.ts`: Configures the Redux store and combines reducers.
- `todoSlice.ts`: Contains the Redux slice for todos, including actions and reducers for fetching, adding, editing, and deleting todos.
- `authSlice.ts`: Contains the Redux slice for authentication (signup & signin).

## Styling

- Tailwind CSS is used for styling the components.
- Additional custom styles can be added in the react-tabs-custom.css file for overriding default styles.

## API Integration

- The application integrates with a back-end API for fetching, adding, editing, and deleting todos.
- The API URL is configured in the `.env` file.

## Authentication

- The application supports user authentication with JWT tokens.
- The token is stored in localStorage and included in the headers of API requests.

## Search Functionality

- Users can search todos by entering a term in the search input field.
- The todos are filtered based on the search term, checking if the term is included in the todo's title or description.

## Tabs for Todo Status

- The application displays todos in separate tabs based on their status: Pending and Complete.
- Each tab shows the corresponding todos with the ability to add, edit, and delete them.

## License

This project is licensed under the MIT License.
