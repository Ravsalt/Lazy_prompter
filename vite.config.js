import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import fs from 'fs';

export default defineConfig(({ command, mode }) => {
  // Load environment variables based on the current mode
  const env = loadEnv(mode, process.cwd(), '');
  
  // Read prompt files from config/prompts directory
  const promptFiles = fs.readdirSync(resolve(__dirname, 'config/prompts'));
  const prompts = {};
  
  // Load all prompt files into an object
  promptFiles.forEach(file => {
    if (file.endsWith('.js')) {
      const promptName = file.replace(/\.js$/, '');
      prompts[`PROMPT_${promptName.toUpperCase()}`] = JSON.stringify(
        fs.readFileSync(resolve(__dirname, `config/prompts/${file}`), 'utf-8')
      );
    }
  });

  return {
    plugins: [react()],
    define: {
      // Make prompts available as environment variables
      'import.meta.env.PROMPTS': JSON.stringify(prompts),
    },
    build: {
      assetsDir: 'assets',
      sourcemap: false,
      // Ensure the config directory is not included in the build
      rollupOptions: {
        external: ['../config/**'],
      },
    },
    // Exclude config directory from being served
    server: {
      fs: {
        strict: true,
        allow: ['..'],
        deny: ['.env', '.env.*', '*.{pem,crt}'],
      },
    },
  };
});
