# Single App diagram

Diagram in which I'm trayting to explain the situation where the user goes into a single page app version of the notes app. Extracted from [forms and http post](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#single-page-app).

```mermaid
  sequenceDiagram

    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: the CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa.js
    activate server
    server-->>browser: SPA JavaScript file
    deactivate server

    note right of browser: The browser starts executing the JS code that fetches the JSON from the server

    browser->>server: https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content": "Hello", "date": "2023-06-19"}, ...]
    deactivate server

```
