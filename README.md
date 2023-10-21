# Simple Feedback Application

This project is a simple feedback application that was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) for a case study. With this application, user can give a feedback and show the latest feedbacks.

### Routing

This application has two pages:

1. `give-feedback`: The initial/default page of the application. Every other route other than the given two routes are redirected back to this page. In this page, users can give feedbacks using a form.
2. `show-feedbacks`: Page that users can show feedback results and can see a chart for the submitted ratings.

### API

Since this project is a case study, a mocked endpoint created via `https://mockapi.io/` is used. Both `Post` and `Get` requests can be made to `/feedback`.

Feedback object simply looks like:

```
{
    id: Object ID,
    createdAt: TimeStamp,
    name: string,
    email: string,
    rating: number,
    comment: string
}
```

In other to post and get feedbacks on the front end `Fetch API` is used.

### Localization

Even though the only available language is `en` currently, this web application supports localization. [react-i18next](https://react.i18next.com/) is used to extract locale values from the json file `src/locale/translations.json`.

### Ratings

There are five ratings that a user can give in this application: `terrible`, `bad`, `normal`, `good` and `wonderful`.

In the `show-feedbacks` page, there is a chart to visualize these ratings. For this purpose, a basic calculation is made to find out the counts for each rating and used `BarChart` component from `MaterialUI` to build the chart. Please [see](https://mui.com/x/react-charts/bars/) for more details on this component.

### Design System

[Ant Design](https://ant.design/) is the main component library of this application. Inputs, ratings, texts, cards and buttons in this application are all from this beautiful design system as well as the validation rules of the form.

### Testing

This application is unit tested by [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/), with a coverage of >70% for statements, functions and lines, and >64% for branches.

### Available Scripts

In the project directory, you can run:

`npm start`: Runs the app in the development mode on [http://localhost:3000](http://localhost:3000)

`npm test`: Launches the test runner in the interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started). To learn React, check out the [React documentation](https://reactjs.org/).
