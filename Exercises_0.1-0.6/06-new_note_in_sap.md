# New note in single page app

Diagram depicting the situation where the user creates a new note using the single page version of the app [SPA new note](https://studies.cs.helsinki.fi/exampleapp/spa).

```mermaid
  sequenceDiagram
    participant browser
    participant server

    browser->>server: POST https://studies.cs.helsinki.fi/exampleapp/new_note_spa
    activate server
    server-->>browser: {"message": "note created"}

    note right of browser: The new note is added to the notes (notes.push, rerenders the list and sends the new note to the server)






```
