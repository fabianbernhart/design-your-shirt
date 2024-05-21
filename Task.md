# Job Application Task Mini-Designer

Your goal is to create a single-page-appication which represent a "Mini-Designer" for t-shirts.

## Starting point

- This project provides a small boilerplate from which you will start your development.
- It is a standard Nuxt 3 installation with the following extensions
  - A small fake api has been provided for you to interact with.
    - This should simulate the communication with an external API.
    - (Therefore the endpoints are intentionally not typed. Assume that all fields are always filled with the given data types).
  - Pinia was preinstalled
  - Tailwind was preinstalled
  - An SVG t-shirt which is to be used. It has been inserted into the App.vue as an example. This does not mean that it has to stay there :).
  - As package manger we use `npm`

## API Endpoints

| HTTP Method | Endpoint       | File for response definition |
|-------------|----------------|------------------------------|
| GET         | `/api/colors`  | `server/api/colors.get.ts`   |   
| GET         | `/api/motives` | `server/api/motives.get.ts`  |    
| POST        | `/api/order`   | `server/api/order.post.ts`   |


## Task

The `Mockup.png` shows the different views of the Mini Designer. In general, the aim here is to show the structure.
It is not a 1:1 pixel perfect mock-up. It's not even beautiful to look at.
Make sure to align the content properly.
When implementing the views, take care to support devices with mobile phone viewports
How this is achieved is up to you. It should only be possible to use it intuitively.
Feel free to optimize the look and feel.

### Requirements

- Using Typescript + Composition API + Script Setup
  - https://vuejs.org/guide/typescript/overview.html#usage-in-single-file-components
- Use Tailwind Css for styling
  - https://tailwindcss.com/docs/utility-first
  - For computed styles, you may of course also use the style attribute
- Do your state management with pinia
  - https://pinia.vuejs.org/introduction.html

### Instructions

The following are detailed descriptions for the individual views

### Switching between views

- Design Page -> About this Project Page
  - Simple change
  - `Back` Button -> Displays the`Designer Page` in the state in which it was left
- Design Page -> Checkout Page
  - The displayed data in the checkout represents the current design state
  - `Back` Button -> Displays the`Designer Page` in the state in which it was left
- Checkout Page -> About this Project Page
  - Simple change
  - `Back` Button -> Displays the `Checkout Page` in the state in which it was left.
- Checkout Page -> Order Success Page
  - Simple Change
  - `Design another product` Button -> Shows the design page in its initial state. Nothing is fetched from the API.

### Design Page

- The Design Page is the initial route of the Mini-Designer
- When loading the Designer (or page refresh), the data from the Designer API should be fetched once. From this point on the fetched data should be used.
  - Get the colors
    - `/api/colors`
  - Get the motives
    - `/api/motives`
- The two "switchers" for color and motive should initialy select the first entry of each.
  - The shirt.svg should be reactively coloured in the currently selected color.
  - The currently selected motive should be placed on the shirt and also change reactively after selection.
- The sum of the costs of the current motive + color should be displayed reactively.

### About this Project Page

- Simply display the text
- `Back` button goes to the previously active page and keeps its state

### Checkout Page

- Displays the currently selected design representation
- When clicked on *`Buy`
  - a request is send to `/api/orders`.
  - The validation is done on the server-side.
    - Error case
      - Invalid form fields get a red border and each field shows its errors underneath.
      - The general message is displayed above the form 
    - Success case
      - The order success page is displayed
  - The `Back` button always returns to the Designer Page. The state is maintained

### Order Success Page

- Simply display the text
- Design another product` Button -> Shows the design page in its initial state.
  - This means the first color & motive get selected.
  - Nothing get's fetched from the api

## Rating criteria

* Focus on code quality and a consistent style
  * Feel free to install tools like linters
* Write simple, readable and maintainable code
  * We attach particular importance to typing
* Please do not do more than is required in the assignment. This only makes the assessment of the task unnecessarily difficult and quality is more important to us than quantity ;)
* Use common Vue 3 elements
  * Composition API with TS and script Setup
  * components
  * refs
  * computed
  * etc
* If you have a problem following any of the instructions, and it blocks your progress, please try an alternative and briefly explain why you had to choose a different solution.
  * In general, the linked documentaries should be sufficient to solve the tasks, from our point of view.
    * Even if you have only used similar techniques before, we want you to show us how well you can learn from a documetation
  * Reasonable argumentation is at the core of our way of working, so there is no need to panic :)

The aim of this task is rather to evaluate the mindset, design and quality of the code. As well as your general understanding of reactive programming.

## Submission

Please create a public repository on Github containing your code.
- Alternatively, another provider such as GitLab, Bitbucket, etc. is also possible.

## Links / Resourcen
- Vue 3
  - general https://vuejs.org/
  - https://vuejs.org/guide/essentials/reactivity-fundamentals.html
  - https://vuejs.org/guide/essentials/computed.html
  - https://vuejs.org/guide/reusability/composables.html
  - https://vuejs.org/guide/components/v-model.html
  - https://vuejs.org/guide/components/slots.html
  - https://vuejs.org/guide/typescript/overview.html
- Nuxt 3
  - general https://nuxt.com/docs
  - Interesting for your task
    - If you want to understand more about the Fake Api and interaction https://nuxt.com/docs/guide/directory-structure/server
    - https://nuxt.com/docs/guide/directory-structure/plugins
    - https://nuxt.com/docs/guide/directory-structure/layouts
    - https://nuxt.com/docs/guide/directory-structure/pages
    - https://nuxt.com/docs/guide/directory-structure/components
    - https://nuxt.com/docs/guide/directory-structure/composables
- Tailwind CSS
  - general https://tailwindcss.com/docs/utility-first
- Pinia
  - https://pinia.vuejs.org/introduction.html
  - https://pinia.vuejs.org/core-concepts/#Setup-Stores
