<!-- reqt_id: 2025-05-15T01:57:46.707Z-414602e8-reqt -->
# 0: reqt_to_md
**Status:** In Dev

---
Project plan to implement reqt_to_md command

<!-- reqt_id: 2025-05-15T01:57:46.707Z-6de38ab4-reqt -->
# 1: reqtToMD command
**Status:** NEW

---
running reqtToMD command will take the current .reqt file and convert it a markdown file. The markdown file will be named <reqt_name>.md and will be placed in the same directory as the .reqt file.

<!-- reqt_id: 2025-05-15T02:00:13.481Z-84ec2b39-reqt -->
## 1.1: reqt_id in comment meta data
**Status:** NEW

---
The start of each item will have a markdown comment with the reqt_id number in it. This will be clearly visible to the user while editing but not visible when rendering. This is vital for when the mdToReqt command is run to convert the markdown back to a .reqt file. The reqt_id will be used to find the item in the .reqt file and update it.

<!-- reqt_id: 2025-05-15T02:00:28.518Z-45dcea16-reqt -->
## 1.2: Number of #s dependent on hier number
**Status:** NEW

---
Project gets one #, all other hier = 0 gets two #s. All other hier = 1 gets three #s. All other hier values are exluded from the markdown file.

<!-- reqt_id: 2025-05-15T02:00:45.120Z-3a09e540-reqt -->
## 1.3: Outline Number and Title in Header
**Status:** NEW

---
Outline Number then Title in Header

<!-- reqt_id: 2025-05-15T02:01:22.961Z-62b05efe-reqt -->
## 1.4: Status: <Current Status> Bolded
**Status:** NEW

---
Status: <Current Status> Bolded

<!-- reqt_id: 2025-05-15T02:01:37.322Z-9a333d6f-reqt -->
## 1.5: Description
**Status:** NEW

---
The description will entered as text so that it can be anything in the markdown file. Including mermaid diagrams, code blocks, etc.

<!-- reqt_id: 2025-05-15T02:20:36.769Z-f5df13f7-reqt -->
## 1.1: ReqT Demo Item
**Status:** NEW

---
Demo the stored data vs the markdown generated.

