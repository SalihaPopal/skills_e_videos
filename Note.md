theme={darkTheme} -- is used instead of const[theme, setTheme]=useState(darkTheme) inside the themeProvider of page.js to toggle the dark theme and light theme 
The syntax background-color: ${({theme})=>theme.bg}; is not valid in a plain CSS file. This syntax is used in CSS-in-JS libraries like styled-components or Emotion, where JavaScript logic can be embedded in CSS to handle dynamic styling in "menu.module.css. Therefore should install "npm install styled-components" and "npm install @types/styled-components"


Next.js
when we run the dev commend in the terminal, the execution is transferred to layout, the routeLayout component is rendered. when we navigate the localhost 3000, the children prop will always refer to the component defined page.jsx in the app folder that component is the home component which is then rendered in the browser. that is the control flow from the package.json to layout jsx to page.jsx to the browser to run our next.js application.
REC(REACT SERVER COMPONENT)- server components and client components.
in next.js all components are server components by default. they have the ability to run tasks like reading and fetching data from database, however they don't have the ability to use hooks or handle user interaction, so should add "use client" at the top of the client component.
each folder corresponds to a route endpoint.
[somthingId] - is applicable to any route with the url for any elements in the collection
({params}) - is applicable to any route with the url for any elements in the collection by adding {params.somethingId}.
create app->products->[productsId]->reviews->[reviewId] folders with page.js file inside each on of the folders to achieve localhost:3000/products/1/reviews/1 by using "({params}) and <h1>review {params.reviewId} for product {params.productId} </h1>"
(Catch-all-Segments) - docs->[...slug] or [[...slug]]->page.js for localhost:3000/docs/routing/catch-all-segments by adding the ? {params.slug?.length === 1/2/3..../0} "
_lib - we can make a private folder that doesn't display in the browser when use localhost:3000/products/_lib 
(auth) -  is a route group folder. By using auth inside the () it helps ignores to add auth in the endpoint and just write localhost:3000/login 
Added <header></header> and <footer></footer> to layout.js for consistency. we can give them any style and elements that we want
we can have layout file for each of our folders just by copying the main layout code and then add anything we want like <h2>Video details</h2> and so on. it replaces the children prop by the js return prop id
Group layout - is used to selectively apply a layout to certain segments while leaving others unchanged. like adding "with-auth-layout" folder to the (auth)
File based routing with <Link replace> - router.replace("/") / router.back() / router.forward()/ router.push("/")



The term payload is commonly used in the context of JSON Web Tokens (JWTs) to refer to the data contained within the token like 
const payLoad = auth.verifyToken(username);

should add     // "react-router-dom": "^6.24.1" at the end of the package json

The endpoint for searching and getting video GET /api/video?title=example || GET /api/video?url=example.com || GET /api/video?title=example&url=example.com
|| GET /api/video/3 || GET /api/video

The expression `%${searchTitle}%` is used to create a pattern for the SQL ILIKE operator, which allows for case-insensitive pattern matching in PostgreSQL. `${searchTitle}`: This is JavaScript template literal syntax. It inserts the value of the searchTitle variable into the string.
`%`: In SQL, the `%` character is a wildcard that matches zero or more characters.


