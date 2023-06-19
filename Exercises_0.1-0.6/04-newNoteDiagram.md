# Adding a new note

Diagram in which I'm trayting to explain the creation of a new note, extracted by [forms and http post](https://fullstackopen.com/en/part0/fundamentals_of_web_apps#forms-and-http-post).

```mermaid
  sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note
    activate server
    note left of server: the new note is added to the server notes
    server-->>browser: HTTP 302 (URL redirect) to https://studies.cs.helsinki.fi/exampleapp/notes
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/notes
    activate server
    server->>browser: HTML document
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.css
    activate server
    server-->>browser: The CSS file
    deactivate server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/main.js
    activate server
    server-->>browser: The JavaScript file
    deactivate server

    note right of browser: the browser starts executing the Javascript code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{"content": "Hello", "date": "2023-06-19"}, ...]
    deactivate server

    note right of browser: The browser executes the callback function that renders the notes

```
