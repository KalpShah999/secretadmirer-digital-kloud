This is the new website that is going to include the authentication system for the users, using shadcn (shadow). This website is going to be just the basic codesignal style setup, where the user gets a unique URL that they can do a test on, and the recruiters can see their in depth feedback. 

The important thing about this version of the program is that there is no communication from the backend to the front DURING the interview itself. There is just an analysis that's done on the users response afterwards. That's about it. This is the MVP of this project.


Commands to run for local development: 
- Website 
	- Directory: root
	- `npm run dev`
- Backend
	- Directory: /backend/
	- `python3 app.py`
- Studio (Storage Server)
	- Directory: root
	- `npm run studio`
- Tunnel (for comms between studio and website)
	- Directory: root
	- `npx localtunnel --port 3000`
	- Update the studio webhook to use the newly generated url here
