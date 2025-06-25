import Layout from './components/Layout/Layout';
import PromptGenerator from './components/PromptGenerator/PromptGenerator';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { Analytics } from '@vercel/analytics/react';

function App() {
  return (
    <Layout title="Lazy Prompter">
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <PromptGenerator />
      </div>
      <Analytics />
      <SpeedInsights />
    </Layout>
  );
}

export default App;
