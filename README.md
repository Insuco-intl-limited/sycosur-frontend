# Sycosur Frontend - Getting Started & Internationalization

## How to Start the Frontend

1. **Install dependencies**  
   Run the following command in the project root:
   ```bash
   pnpm install
   ```

2. **Start the development server**  
   Launch the frontend locally:
   ```bash
   pnpm dev
   ```
   The app will be available at [http://localhost:3000](http://localhost:3000).

## How to Manage Translations

1. **Extract translatable strings**  
   Scan your codebase for new or updated strings:
   ```bash
   pnpm run scan
   ```

2. **Translate missing strings automatically**  
   Use MyMemory to fill in missing translations:
   ```bash
   pnpm run translate
   ```

3. **Edit translations manually**  
   Translation files are located in the `messages` directory. You can edit them directly if needed.

4. **Change language in the app**  
   The language can be switched via the UI or by changing the locale in the URL (depending on your routing setup).

