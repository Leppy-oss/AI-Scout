# next-mantine-template
A simple, barebones template for using MantineUI with Next.js

## Overview
### Tech Stack
`next-mantine-template` is built with:
<ul>
<li><a target="_blank" href="https://nextjs.org/">Next.js</a></li>
<li><a target="_blank" href="https://mantine.dev/">MantineUI</a></li>
<li><a target="_blank" href="https://tablericons.com/">Tabler Icons</a></li>
<li><a target="_blank" href="https://jestjs.io/">Jest</a> with <a href="https://testing-library.com/">Testing Library</a></li>
</ul>

With stock components from https://ui.mantine.dev/.

### Details
This template uses the `pages` router with Next.js. More information can be found [here](https://nextjs.org/docs/pages).

## Usage
### Requirements
- npm >= 9.x.x
- node.js >= 18.x.x

### Installation

Use the repository as a template on GitHub or clone it with:
```sh
git clone https://github.com/Leppy-oss/next-mantine-template.git
```
Then run:
```sh
npm install
```
To install the required dependencies.

### Customization
`next-mantine-template` comes with a pre-built layout, header, and footer located in `/components`. Feel free to edit or remove them as you wish.

If you choose to use the default header and footer, the following code must be edited:

(`/components/header.jsx`)
```js
const tabs = [
    { name: 'Tab 1', href: '#' },
    { name: 'Tab 2', href: '#' },
    {
        name: 'Tab 3',
        href: '#',
        type: 'dropdown',
        dropdownItems: [{ name: 'Item 1', href: '#', description: '...' },
            { name: 'Item 2', href: '#', description: '...' },
            { name: 'Item 3', href: '#', description: '...' },
            { name: 'Item 4', href: '#', description: '...' },
            { name: 'Item 5', href: '#', description: '...' },
            { name: 'Item 6', href: '#', description: '...' },
        ]
    }
];
```

(`/components/footer.jsx`)
```jsx
<>
<ActionIcon {...} href='X_LINK_HERE' >
    <IconBrandX {...} />
</ActionIcon>
<ActionIcon {...} href='YT_LINK_HERE' >
    <IconBrandYoutube {...} />
</ActionIcon>
<ActionIcon {...} href='INSTA_LINK_HERE' >
    <IconBrandInstagram {...} />
</ActionIcon>
</>
```

(`/components/footer.jsx`)
```jsx
<Text c="dimmed" size="sm">
    © 2024 YOUR_NAME_HERE. All rights reserved.
</Text>
```

**The following files must be modified regardless:**

(`/lib/constants.js`)
```js
export default {
    SITE_NAME: 'SITE_NAME_HERE',
    SITE_DESCRIPTION: 'SITE_DESCRIPTION_HERE'
}
```

(`/package.json`)
```JSON
{
	"name": "your-name-here",
	"version": "0.1.0",
	"private": true
}
```
*Note: You must rerun `npm i` to update `package-lock.json` with the new project name and version.*

(`/public`)

*Update the logo from the current placeholder.*