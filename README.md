README Outline
How to run: npm install then npm start
Storage: localStorage used for user accounts and transactions for simplicity and persistence.
Security: Passwords hashed with SHA-256 (or bcryptjs if allowed). Input validation on forms.
Design decisions: Multiple accounts supported, fees configurable, FX rates fetched once on app load.
Scaling: FX rates and fees stored in config objects, easy to add more currencies or countries.
Mobile: Responsive layout with media queries.
Accessibility: Proper labels, keyboard navigation, and contrast ensured.
