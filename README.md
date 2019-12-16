# dndtome

MERN Stack dnd tool following Travery Media's tutorial: https://www.youtube.com/watch?v=PBTYxXADG_k

SETUP:
1. Clone repo
2. Create config folder in root folder (outside of client) and move default.json there
  2a. alternatively create default.json containing {"mongouri": ... , "jwtsecret": ...}
3. run: npm install
4. run: npm client-install
5. run: npm run dev

Features:
- User authentication
- Character ownership

To Do:
- Encounters:
  - Add monsters from 5e SRD
  - Add characters 
  - Keep track of turn order
- Character Builder:
  - Add spells from 5e SRD
  - Add races/classes from 5e SRD
  
