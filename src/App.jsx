import Layout from './components/Layout/Layout';
import PromptGenerator from './components/PromptGenerator/PromptGenerator';

function App() {
  return (
    <Layout title="Lazy Prompter">
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <PromptGenerator />
      </div>
    </Layout>
  );
}

export default App;
